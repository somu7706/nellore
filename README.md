# MediCureModel

A comprehensive healthcare platform with an AI assistant, hospital/pharmacy locator, and medical report analysis.

## Project Structure
- `backend/`: FastAPI Python server with Gemini AI integration.
- `frontend/`: React-based web application.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+
- **Python**: v3.10+
- **MongoDB**: Ensure a MongoDB instance is running (local or Atlas).

---

### 🛠️ Backend Setup (FastAPI)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Set up Virtual Environment (Recommended):**
   ```bash
   python -m venv venv
   .\venv\Scripts\activate   # Windows
   source venv/bin/activate  # macOS/Linux
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017
   GEMINI_API_KEY=your_api_key_here
   JWT_SECRET=your_secret_key
   ```

5. **Run the Server:**
   ```bash
   python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
   ```
   The API will be available at [http://localhost:8000](http://localhost:8000).

---

### 💻 Frontend Setup (React)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `frontend/` directory:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id
   ```

4. **Run the Application:**
   ```bash
   npm start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000) (or the next available port).

---

### ☁️ Netlify Backend (Dev Server)

To run the frontend with Netlify features (functions, redirects, etc.) locally:

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Run Netlify Dev:**
   ```bash
   npx netlify dev
   ```
   This will typically start the server at [http://localhost:8888](http://localhost:8888).

---

## 🛠️ Troubleshooting

### Gemini AI "unexpected keyword argument 'system_instruction'"
This occurs due to an outdated `google-generativeai` library.
**Fix:** Ensure you are using version `0.8.6` or higher within your virtual environment:
```bash
pip install google-generativeai==0.8.6
```

### Port Conflicts
If port `8000` or `3000` is busy, you can change them in the respective `.env` files or allow the systems to auto-select an available port.
