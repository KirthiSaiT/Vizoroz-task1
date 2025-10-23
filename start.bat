@echo off
echo Starting CRUD Application...

echo Starting Backend...
cd backend
start "Backend" cmd /k "venv\Scripts\activate.bat && uvicorn main:app --reload"

timeout /t 5

echo Starting Frontend...
cd ..\frontend
start "Frontend" cmd /k "npm start"

echo Application startup commands initiated.
echo Backend will be available at http://localhost:8000
echo Frontend will be available at http://localhost:3000
pause