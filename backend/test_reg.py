import requests
import json

def test_registration():
    url = "http://localhost:8000/api/auth/register"
    payload = {
        "name": "Somu",
        "email": "somu7075267357@gmail.com",
        "password": "password123",
        "preferred_language": "en",
        "location_mode": "manual",
        "location_label": "Nandyal"
    }
    headers = {"Content-Type": "application/json"}
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_registration()
