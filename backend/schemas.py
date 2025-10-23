from pydantic import BaseModel
from typing import Optional

# Pydantic model for item creation
class ItemCreate(BaseModel):
    name: str
    description: str
    price: int

# Pydantic model for item update
class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None

# Pydantic model for item response
class Item(ItemCreate):
    id: int

    class Config:
        orm_mode = True