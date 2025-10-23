from sqlalchemy import Table, Column, Integer, String, MetaData
from database import metadata

# Define the items table
items = Table(
    "items",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(50)),
    Column("description", String(100)),
    Column("price", Integer)
)