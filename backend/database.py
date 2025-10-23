from databases import Database
from sqlalchemy import create_engine, MetaData

# Database connection string for PostgreSQL on port 4260
DATABASE_URL = "postgresql://user:password@localhost:4260/crudapp"

# Database instance for async operations
database = Database(DATABASE_URL)

# Engine for sync operations (like creating tables)
engine = create_engine(DATABASE_URL)

# Metadata instance for table definitions
metadata = MetaData()