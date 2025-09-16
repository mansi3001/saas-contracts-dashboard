#!/usr/bin/env python3
"""
Database initialization script for Contracts SaaS
Creates tables and enables pgvector extension
"""

import os
import sys
from sqlalchemy import create_engine, text
from database import Base, create_tables
from dotenv import load_dotenv

def init_database():
    """Initialize database with tables and pgvector extension"""
    load_dotenv()
    
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("ERROR: DATABASE_URL environment variable not set")
        sys.exit(1)
    
    try:
        engine = create_engine(database_url)
        
        # Test connection
        with engine.connect() as conn:
            print("✓ Database connection successful")
            
            # Enable pgvector extension
            try:
                conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
                conn.commit()
                print("✓ pgvector extension enabled")
            except Exception as e:
                print(f"⚠ Warning: Could not enable pgvector extension: {e}")
                print("  Make sure you have pgvector installed on your PostgreSQL instance")
        
        # Create tables
        create_tables()
        print("✓ Database tables created successfully")
        
        print("\n🎉 Database initialization complete!")
        print("You can now start the FastAPI server with: uvicorn main:app --reload")
        
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    init_database()