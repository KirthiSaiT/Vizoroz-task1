from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import database, engine, metadata
from models import items
from schemas import ItemCreate, ItemUpdate, Item
from crud import create_item, get_items, get_item, update_item, delete_item

# Create the FastAPI app
app = FastAPI(title="CRUD App", description="A simple CRUD application with FastAPI and PostgreSQL")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables in the database
metadata.create_all(bind=engine)

# Connect to the database when the app starts
@app.on_event("startup")
async def startup():
    await database.connect()

# Disconnect from the database when the app stops
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the CRUD App!"}

# Create a new item
@app.post("/items/", response_model=Item)
async def create_new_item(item: ItemCreate):
    return await create_item(item)

# Get all items
@app.get("/items/", response_model=list[Item])
async def read_items():
    return await get_items()

# Get a single item by ID
@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    item = await get_item(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Update an item
@app.put("/items/{item_id}", response_model=Item)
async def update_existing_item(item_id: int, item: ItemUpdate):
    updated_item = await update_item(item_id, item)
    if updated_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return updated_item

# Delete an item
@app.delete("/items/{item_id}")
async def delete_existing_item(item_id: int):
    item = await get_item(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return await delete_item(item_id)