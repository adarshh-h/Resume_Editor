# Resume Editor

## Features

- 📄 Upload PDF/DOCX resumes (mock parsing)
- ✏️ Edit resume sections (name, experience, education, skills)
- 🧠 AI-enhanced section improvements
- 💾 Save resumes to backend
- ⬇️ Download resume as JSON

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- react-dropzone (for file uploads)

**Backend:**
- Python FastAPI
- Uvicorn (ASGI server)

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend

2. Create virtual environment (recommended):
   ```bash
    python -m venv venv
    venv\Scripts\activate    # Windows

4. Install dependencies:
   ```bash
    pip install -r requirements.txt

6. Run the backend server:
   ```bash
   python main.py


# Frontend Setup
1. Navigate to frontend directory:
   ```bash
    cd frontend

3. Install dependencies:
   ```bash
    npm install

5. Run the development server:
   ```bash
    npm run dev
