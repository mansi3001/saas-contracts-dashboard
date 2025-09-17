#!/usr/bin/env python3
import os
import sys
import subprocess
from pathlib import Path

def main():
    # Set environment variables for Windows encoding
    os.environ['PYTHONIOENCODING'] = 'utf-8'
    os.environ['PYTHONLEGACYWINDOWSSTDIO'] = '1'
    
    # Get the current directory
    backend_dir = Path(__file__).parent
    os.chdir(backend_dir)
    
    print("Starting FastAPI server...")
    print("Server will be available at: http://127.0.0.1:8000")
    print("API docs will be available at: http://127.0.0.1:8000/docs")
    print("Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        # Start the server
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "127.0.0.1", 
            "--port", "8000", 
            "--reload"
        ], check=True)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()