import requests
import sys
import json
from datetime import datetime
import time

class VitalWaveAPITester:
    def __init__(self, base_url="https://vitawave-health.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.refresh_token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.test_results = []

    def log_test(self, name, success, details="", endpoint=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": details
            })
        
        self.test_results.append({
            "name": name,
            "success": success,
            "details": details,
            "endpoint": endpoint
        })

    def make_request(self, method, endpoint, data=None, files=None, headers=None):
        """Make HTTP request with error handling"""
        url = f"{self.base_url}/api/{endpoint}"
        
        request_headers = {'Content-Type': 'application/json'}
        if self.token:
            request_headers['Authorization'] = f'Bearer {self.token}'
        if headers:
            request_headers.update(headers)
        
        # Remove Content-Type for file uploads
        if files:
            request_headers.pop('Content-Type', None)

        try:
            if method == 'GET':
                response = requests.get(url, headers=request_headers, timeout=30)
            elif method == 'POST':
                if files:
                    response = requests.post(url, files=files, data=data, headers=request_headers, timeout=30)
                else:
                    response = requests.post(url, json=data, headers=request_headers, timeout=30)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=request_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=request_headers, timeout=30)
            else:
                return None, f"Unsupported method: {method}"

            return response, None
        except requests.exceptions.RequestException as e:
            return None, str(e)

    def test_seed_data(self):
        """Test seeding initial data"""
        print("\n🌱 Testing Data Seeding...")
        response, error = self.make_request('POST', 'seed')
        
        if error:
            self.log_test("Seed Data", False, f"Request failed: {error}", "/api/seed")
            return False
        
        if response.status_code in [200, 201]:
            self.log_test("Seed Data", True, "Doctors seeded successfully", "/api/seed")
            return True
        else:
            self.log_test("Seed Data", False, f"Status {response.status_code}: {response.text}", "/api/seed")
            return False

    def test_user_registration(self):
        """Test user registration"""
        print("\n👤 Testing User Registration...")
        
        # Generate unique email for testing
        timestamp = int(time.time())
        test_email = f"test_{timestamp}@vitalwave.com"
        
        user_data = {
            "name": "Test User",
            "email": test_email,
            "password": "Test@123",
            "preferred_language": "en",
            "location_mode": "manual",
            "location_label": "Test City"
        }
        
        response, error = self.make_request('POST', 'auth/register', user_data)
        
        if error:
            self.log_test("User Registration", False, f"Request failed: {error}", "/api/auth/register")
            return False
        
        if response.status_code == 200:
            data = response.json()
            if 'access_token' in data and 'user' in data:
                self.token = data['access_token']
                self.refresh_token = data['refresh_token']
                self.user_id = data['user']['id']
                self.test_email = test_email
                self.log_test("User Registration", True, "User registered successfully", "/api/auth/register")
                return True
            else:
                self.log_test("User Registration", False, "Missing token or user data in response", "/api/auth/register")
                return False
        else:
            self.log_test("User Registration", False, f"Status {response.status_code}: {response.text}", "/api/auth/register")
            return False

    def test_user_login(self):
        """Test user login with existing credentials"""
        print("\n🔐 Testing User Login...")
        
        login_data = {
            "email": "test@vitalwave.com",
            "password": "Test@123"
        }
        
        response, error = self.make_request('POST', 'auth/login', login_data)
        
        if error:
            self.log_test("User Login", False, f"Request failed: {error}", "/api/auth/login")
            return False
        
        if response.status_code == 200:
            data = response.json()
            if 'access_token' in data:
                self.token = data['access_token']
                self.refresh_token = data['refresh_token']
                self.log_test("User Login", True, "Login successful", "/api/auth/login")
                return True
            else:
                self.log_test("User Login", False, "Missing access token", "/api/auth/login")
                return False
        else:
            self.log_test("User Login", False, f"Status {response.status_code}: {response.text}", "/api/auth/login")
            return False

    def test_get_user_profile(self):
        """Test getting user profile"""
        print("\n👤 Testing Get User Profile...")
        
        response, error = self.make_request('GET', 'me')
        
        if error:
            self.log_test("Get User Profile", False, f"Request failed: {error}", "/api/me")
            return False
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'id' in data['data']:
                self.log_test("Get User Profile", True, "Profile retrieved successfully", "/api/me")
                return True
            else:
                self.log_test("Get User Profile", False, "Invalid profile data", "/api/me")
                return False
        else:
            self.log_test("Get User Profile", False, f"Status {response.status_code}: {response.text}", "/api/me")
            return False

    def test_doctors_api(self):
        """Test doctors listing and search"""
        print("\n👨‍⚕️ Testing Doctors API...")
        
        # Test get all doctors
        response, error = self.make_request('GET', 'doctors')
        
        if error:
            self.log_test("Get Doctors", False, f"Request failed: {error}", "/api/doctors")
            return False
        
        if response.status_code == 200:
            data = response.json()
            if 'items' in data and len(data['items']) > 0:
                self.log_test("Get Doctors", True, f"Found {len(data['items'])} doctors", "/api/doctors")
                
                # Test get specific doctor
                doctor_id = data['items'][0]['id']
                response, error = self.make_request('GET', f'doctors/{doctor_id}')
                
                if error:
                    self.log_test("Get Doctor Details", False, f"Request failed: {error}", f"/api/doctors/{doctor_id}")
                elif response.status_code == 200:
                    self.log_test("Get Doctor Details", True, "Doctor details retrieved", f"/api/doctors/{doctor_id}")
                else:
                    self.log_test("Get Doctor Details", False, f"Status {response.status_code}", f"/api/doctors/{doctor_id}")
                
                return True
            else:
                self.log_test("Get Doctors", False, "No doctors found", "/api/doctors")
                return False
        else:
            self.log_test("Get Doctors", False, f"Status {response.status_code}: {response.text}", "/api/doctors")
            return False

    def test_nearby_api(self):
        """Test nearby places API"""
        print("\n📍 Testing Nearby API...")
        
        # First set a location
        location_data = {"query": "Mumbai, India"}
        response, error = self.make_request('POST', 'location/set-manual', location_data)
        
        if error or response.status_code != 200:
            self.log_test("Set Location", False, "Failed to set location", "/api/location/set-manual")
            return False
        
        self.log_test("Set Location", True, "Location set successfully", "/api/location/set-manual")
        
        # Test nearby hospitals
        response, error = self.make_request('GET', 'nearby?type=hospital&limit=5')
        
        if error:
            self.log_test("Get Nearby Places", False, f"Request failed: {error}", "/api/nearby")
            return False
        
        if response.status_code == 200:
            data = response.json()
            if 'items' in data:
                self.log_test("Get Nearby Places", True, f"Found {len(data['items'])} places", "/api/nearby")
                return True
            else:
                self.log_test("Get Nearby Places", False, "No items in response", "/api/nearby")
                return False
        else:
            self.log_test("Get Nearby Places", False, f"Status {response.status_code}: {response.text}", "/api/nearby")
            return False

    def test_chat_api(self):
        """Test AI chat functionality"""
        print("\n💬 Testing AI Chat...")
        
        # Test medical query
        medical_query = {
            "message": "What are the symptoms of diabetes?"
        }
        
        response, error = self.make_request('POST', 'chat', medical_query)
        
        if error:
            self.log_test("AI Chat - Medical Query", False, f"Request failed: {error}", "/api/chat")
            return False
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'response' in data['data']:
                self.log_test("AI Chat - Medical Query", True, "Medical query answered", "/api/chat")
                
                # Test non-medical query (should be refused)
                non_medical_query = {
                    "message": "What's the weather like today?"
                }
                
                response, error = self.make_request('POST', 'chat', non_medical_query)
                
                if error:
                    self.log_test("AI Chat - Non-Medical Query", False, f"Request failed: {error}", "/api/chat")
                elif response.status_code == 200:
                    data = response.json()
                    if 'data' in data and data['data'].get('is_medical') == False:
                        self.log_test("AI Chat - Non-Medical Query", True, "Non-medical query refused correctly", "/api/chat")
                    else:
                        self.log_test("AI Chat - Non-Medical Query", False, "Should refuse non-medical queries", "/api/chat")
                else:
                    self.log_test("AI Chat - Non-Medical Query", False, f"Status {response.status_code}", "/api/chat")
                
                return True
            else:
                self.log_test("AI Chat - Medical Query", False, "Invalid response format", "/api/chat")
                return False
        else:
            self.log_test("AI Chat - Medical Query", False, f"Status {response.status_code}: {response.text}", "/api/chat")
            return False

    def test_upload_text(self):
        """Test text upload functionality"""
        print("\n📄 Testing Text Upload...")
        
        text_data = {
            "text": "Patient: John Doe\nHemoglobin: 12.5 g/dL\nGlucose: 95 mg/dL\nBlood Pressure: 120/80 mmHg"
        }
        
        response, error = self.make_request('POST', 'uploads/text', text_data)
        
        if error:
            self.log_test("Text Upload", False, f"Request failed: {error}", "/api/uploads/text")
            return False
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'id' in data['data']:
                self.upload_id = data['data']['id']
                self.log_test("Text Upload", True, "Text uploaded and analyzed", "/api/uploads/text")
                return True
            else:
                self.log_test("Text Upload", False, "Invalid response format", "/api/uploads/text")
                return False
        else:
            self.log_test("Text Upload", False, f"Status {response.status_code}: {response.text}", "/api/uploads/text")
            return False

    def test_my_health_apis(self):
        """Test My Health section APIs"""
        print("\n🏥 Testing My Health APIs...")
        
        # Test health stage
        response, error = self.make_request('GET', 'myhealth/stage')
        
        if error:
            self.log_test("Health Stage", False, f"Request failed: {error}", "/api/myhealth/stage")
        elif response.status_code == 200:
            self.log_test("Health Stage", True, "Health stage retrieved", "/api/myhealth/stage")
        elif response.status_code == 404:
            self.log_test("Health Stage", True, "No health data (expected for new user)", "/api/myhealth/stage")
        else:
            self.log_test("Health Stage", False, f"Status {response.status_code}", "/api/myhealth/stage")
        
        # Test care plan
        response, error = self.make_request('GET', 'myhealth/care-plan')
        
        if error:
            self.log_test("Care Plan", False, f"Request failed: {error}", "/api/myhealth/care-plan")
        elif response.status_code == 200:
            self.log_test("Care Plan", True, "Care plan retrieved", "/api/myhealth/care-plan")
        elif response.status_code == 404:
            self.log_test("Care Plan", True, "No health data (expected for new user)", "/api/myhealth/care-plan")
        else:
            self.log_test("Care Plan", False, f"Status {response.status_code}", "/api/myhealth/care-plan")

    def test_doctor_feedback(self):
        """Test doctor feedback functionality"""
        print("\n⭐ Testing Doctor Feedback...")
        
        # First get a doctor
        response, error = self.make_request('GET', 'doctors?limit=1')
        
        if error or response.status_code != 200:
            self.log_test("Doctor Feedback", False, "Could not get doctor for feedback test", "/api/doctors")
            return False
        
        data = response.json()
        if not data.get('items'):
            self.log_test("Doctor Feedback", False, "No doctors available for feedback", "/api/doctors")
            return False
        
        doctor_id = data['items'][0]['id']
        
        # Submit feedback
        feedback_data = {
            "stars": 5,
            "was_helpful": True,
            "accuracy": 9,
            "comment": "Great doctor, very helpful!",
            "condition_tag": "general"
        }
        
        response, error = self.make_request('POST', f'doctors/{doctor_id}/feedback', feedback_data)
        
        if error:
            self.log_test("Doctor Feedback", False, f"Request failed: {error}", f"/api/doctors/{doctor_id}/feedback")
            return False
        
        if response.status_code == 200:
            self.log_test("Doctor Feedback", True, "Feedback submitted successfully", f"/api/doctors/{doctor_id}/feedback")
            return True
        else:
            self.log_test("Doctor Feedback", False, f"Status {response.status_code}: {response.text}", f"/api/doctors/{doctor_id}/feedback")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting VitalWave API Tests...")
        print(f"Base URL: {self.base_url}")
        print("=" * 50)
        
        # Test sequence
        self.test_seed_data()
        
        # Try to register new user first, then fallback to login
        if not self.test_user_registration():
            print("\n⚠️  Registration failed, trying login with existing credentials...")
            if not self.test_user_login():
                print("❌ Both registration and login failed. Cannot continue with authenticated tests.")
                return self.generate_report()
        
        # Authenticated tests
        self.test_get_user_profile()
        self.test_doctors_api()
        self.test_nearby_api()
        self.test_chat_api()
        self.test_upload_text()
        self.test_my_health_apis()
        self.test_doctor_feedback()
        
        return self.generate_report()

    def generate_report(self):
        """Generate test report"""
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "0%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  • {test['test']}: {test['error']}")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.failed_tests,
            "success_rate": (self.tests_passed/self.tests_run*100) if self.tests_run > 0 else 0,
            "test_results": self.test_results
        }

def main():
    tester = VitalWaveAPITester()
    results = tester.run_all_tests()
    
    # Return appropriate exit code
    return 0 if len(results["failed_tests"]) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())