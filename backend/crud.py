from sqlalchemy import select, update, delete
from models import items
from schemas import ItemCreate, ItemUpdate
from database import database

# Create a new item
async def create_item(item: ItemCreate):
    query = items.insert().values(
        name=item.name,
        description=item.description,
        price=item.price
    )
    last_record_id = await database.execute(query)
    return {**item.dict(), "id": last_record_id}

# Get all items
async def get_items():
    query = select(items)
    return await database.fetch_all(query)

# Get a single item by ID
async def get_item(item_id: int):
    query = select(items).where(items.c.id == item_id)
    return await database.fetch_one(query)

# Update an item
async def update_item(item_id: int, item: ItemUpdate):
    query = (
        update(items)
        .where(items.c.id == item_id)
        .values(
            name=item.name,
            description=item.description,
            price=item.price
        )
    )
    await database.execute(query)
    return await get_item(item_id)

# Delete an item
async def delete_item(item_id: int):
    query = delete(items).where(items.c.id == item_id)
    await database.execute(query)
    return {"message": "Item deleted successfully"}