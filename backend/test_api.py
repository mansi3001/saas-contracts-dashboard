#!/usr/bin/env python3
"""
Simple API test script for Contracts SaaS backend
Tests basic functionality without requiring a full test suite
"""

import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

def test_api():
    """Test basic API functionality"""
    print(f"Testing API at {BASE_URL}")
    
    # Test health check (if we had one)
    try:
        response = requests.get(f"{BASE_URL}/docs")
        if response.status_code == 200:
            print("✓ API is running (docs accessible)")
        else:
            print("⚠ API might not be running properly")
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure the server is running.")
        return False
    
    # Test signup
    test_user = {
        "username": f"testuser_{os.urandom(4).hex()}",
        "password": "testpass123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/signup", json=test_user)
        if response.status_code == 200:
            data = response.json()
            token = data.get("access_token")
            print("✓ Signup successful")
            
            # Test login
            response = requests.post(f"{BASE_URL}/login", json=test_user)
            if response.status_code == 200:
                print("✓ Login successful")
                
                # Test protected endpoint
                headers = {"Authorization": f"Bearer {token}"}
                response = requests.get(f"{BASE_URL}/contracts", headers=headers)
                if response.status_code == 200:
                    print("✓ Protected endpoint accessible")
                    print("✓ All basic tests passed!")
                    return True
                else:
                    print(f"❌ Protected endpoint failed: {response.status_code}")
            else:
                print(f"❌ Login failed: {response.status_code}")
        else:
            print(f"❌ Signup failed: {response.status_code}")
            if response.status_code == 400:
                print("  (This might be expected if user already exists)")
    
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
    
    return False

if __name__ == "__main__":
    success = test_api()
    exit(0 if success else 1)