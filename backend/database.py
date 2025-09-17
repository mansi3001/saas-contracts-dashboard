from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text
# from pgvector.sqlalchemy import Vector
# Using TEXT for embeddings instead of Vector for deployment compatibility
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    documents = relationship("Document", back_populates="user")
    chunks = relationship("Chunk", back_populates="user")

class Document(Base):
    __tablename__ = "documents"
    
    doc_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    filename = Column(String, nullable=False)
    uploaded_on = Column(DateTime, default=datetime.utcnow)
    expiry_date = Column(DateTime)
    status = Column(String, default="Active")
    risk_score = Column(String, default="Low")
    contract_name = Column(String)
    parties = Column(String)
    
    user = relationship("User", back_populates="documents")
    chunks = relationship("Chunk", back_populates="document")

class Chunk(Base):
    __tablename__ = "chunks"
    
    chunk_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    doc_id = Column(UUID(as_uuid=True), ForeignKey("documents.doc_id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    text_chunk = Column(Text, nullable=False)
    embedding = Column(Text)  # Store embeddings as JSON string for compatibility
    chunk_metadata = Column(Text)  # JSON string
    
    user = relationship("User", back_populates="chunks")
    document = relationship("Document", back_populates="chunks")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    # Enable pgvector extension
    try:
        with engine.connect() as conn:
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
            conn.commit()
    except Exception as e:
        print(f"pgvector extension error (may already exist): {e}")
    
    Base.metadata.create_all(bind=engine)