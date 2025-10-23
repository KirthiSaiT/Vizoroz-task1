from database import engine, metadata
from models import items

# Create all tables in the database
metadata.create_all(bind=engine)

print("Database tables created successfully!")