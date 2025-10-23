# Development Guide

## Prerequisites
1. Python 3.8+
2. Node.js 14+
3. PostgreSQL installed and running on port 4260

## Initial Setup

### Database Setup
1. Install PostgreSQL on your system
2. Create a database named `crudapp`
3. Ensure the database is accessible with:
   - Host: localhost
   - Port: 4260
   - Username: user
   - Password: password
   - Database: crudapp

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   ```bash
   # Windows
   .\venv\Scripts\Activate.ps1
   
   # macOS/Linux
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Initialize the database:
   ```bash
   python init_db.py
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Method 1: Manual Start
1. Start the backend server:
   ```bash
   # From backend directory
   uvicorn main:app --reload
   ```
   The backend will be available at http://localhost:8000

2. Start the frontend:
   ```bash
   # From frontend directory
   npm start
   ```
   The frontend will be available at http://localhost:3000

### Method 2: Using Startup Script
On Windows, you can use the provided `start.bat` script:
```bash
start.bat
```

## Development Workflow
1. Make changes to the backend (Python files in `backend/`)
2. Make changes to the frontend (React components in `frontend/src/`)
3. The backend will auto-reload with `--reload` flag
4. The frontend will auto-reload with `npm start`

## API Documentation
Once the backend is running, you can access the API documentation at:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc)

## Project Structure
- `backend/` - FastAPI application
  - `main.py` - Entry point and route definitions
  - `database.py` - Database configuration
  - `models.py` - SQLAlchemy table definitions
  - `schemas.py` - Pydantic models for validation
  - `crud.py` - Database operations
- `frontend/` - React application
  - `src/components/` - React components
  - `src/features/` - Redux slices
  - `src/store.js` - Redux store configuration

## Troubleshooting
1. If you get connection errors, ensure PostgreSQL is running on port 4260
2. If you get module not found errors, ensure virtual environment is activated
3. If the frontend fails to compile, check for syntax errors in React components