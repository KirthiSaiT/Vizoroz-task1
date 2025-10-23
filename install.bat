@echo off
echo Installing CRUD Application Dependencies...

echo Installing Backend Dependencies...
cd backend
pip install -r requirements.txt
python init_db.py

timeout /t 2

echo Installing Frontend Dependencies...
cd ..\frontend
npm install

echo All dependencies installed successfully!
pause