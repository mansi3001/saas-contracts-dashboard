#!/usr/bin/env python3
import requests
import json
import sys

def test_api():
    base_url = "http://127.0.0.1:8000"
    
    try:
        # Test health endpoint
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            print("✓ Health check passed")
            print(f"Response: {response.json()}")
        else:
            print(f"✗ Health check failed: {response.status_code}")
            return False
            
        # Test root endpoint
        response = requests.get(f"{base_url}/", timeout=5)
        if response.status_code == 200:
            print("✓ Root endpoint working")
            print(f"Response: {response.json()}")
        else:
            print(f"✗ Root endpoint failed: {response.status_code}")
            return False
            
        # Test docs endpoint
        response = requests.get(f"{base_url}/docs", timeout=5)
        if response.status_code == 200:
            print("✓ Docs endpoint accessible")
        else:
            print(f"✗ Docs endpoint failed: {response.status_code}")
            
        return True
        
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to server. Make sure it's running on port 8000")
        return False
    except Exception as e:
        print(f"✗ Error testing API: {e}")
        return False

if __name__ == "__main__":
    print("Testing FastAPI server...")
    success = test_api()
    sys.exit(0 if success else 1)