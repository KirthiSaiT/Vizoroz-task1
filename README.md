# CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with:
- Frontend: React, Material UI, Redux Toolkit, React Hook Form
- Backend: Python FastAPI
- Database: PostgreSQL

## Project Structure
```
crud-app/
├── backend/
│   ├── main.py          # FastAPI application
│   ├── database.py      # Database configuration
│   ├── models.py        # Database models
│   ├── schemas.py       # Pydantic schemas
│   ├── crud.py          # CRUD operations
│   ├── requirements.txt # Python dependencies
│   └── venv/            # Python virtual environment
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── features/    # Redux slices
    │   ├── store.js     # Redux store
    │   └── App.js       # Main App component
    └── package.json     # Node.js dependencies
```

## Setup Instructions

### PostgreSQL Database
1. Install PostgreSQL locally
2. Create a database named `crudapp`
3. Ensure PostgreSQL is running on port 4260

### Backend Setup
1. Navigate to the `backend` directory
2. Activate the virtual environment:
   ```bash
   .\venv\Scripts\Activate.ps1  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the `frontend` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend:
   ```bash
   npm start
   ```

## Usage
1. Start PostgreSQL database
2. Run the backend server
3. Run the frontend application
4. Access the application at http://localhost:3000

## API Endpoints
- GET /items/ - Get all items
- GET /items/{id} - Get a specific item
- POST /items/ - Create a new item
- PUT /items/{id} - Update an existing item
- DELETE /items/{id} - Delete an item