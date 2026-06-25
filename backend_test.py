#!/usr/bin/env python3
"""
Backend API Tests for Rayaru Gold Buying Company
Tests all endpoints documented in test_result.md
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from .env NEXT_PUBLIC_BASE_URL
BASE_URL = "https://rayaru-gold.preview.emergentagent.com/api"

def print_test(name, passed, details=""):
    """Print test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"\n{status}: {name}")
    if details:
        print(f"  Details: {details}")

def test_gold_price_get():
    """Test GET /api/gold-price"""
    print("\n" + "="*80)
    print("TEST 1: GET /api/gold-price")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/gold-price", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test("GET /api/gold-price returns 200", False, f"Got {response.status_code}")
            return False
        
        data = response.json()
        
        # Check required fields
        if 'price_24k' not in data:
            print_test("GET /api/gold-price has price_24k", False, "Missing price_24k")
            return False
        
        if 'price_22k' not in data:
            print_test("GET /api/gold-price has price_22k", False, "Missing price_22k")
            return False
        
        if 'updated_at' not in data:
            print_test("GET /api/gold-price has updated_at", False, "Missing updated_at")
            return False
        
        # Check values are positive numbers
        if not isinstance(data['price_24k'], (int, float)) or data['price_24k'] <= 0:
            print_test("GET /api/gold-price price_24k > 0", False, f"Got {data['price_24k']}")
            return False
        
        if not isinstance(data['price_22k'], (int, float)) or data['price_22k'] <= 0:
            print_test("GET /api/gold-price price_22k > 0", False, f"Got {data['price_22k']}")
            return False
        
        # Check updated_at is ISO string
        try:
            datetime.fromisoformat(data['updated_at'].replace('Z', '+00:00'))
        except:
            print_test("GET /api/gold-price updated_at is ISO string", False, f"Got {data['updated_at']}")
            return False
        
        print_test("GET /api/gold-price", True, f"24K={data['price_24k']}, 22K={data['price_22k']}")
        return True
        
    except Exception as e:
        print_test("GET /api/gold-price", False, f"Exception: {str(e)}")
        return False

def test_admin_login():
    """Test POST /api/admin/login"""
    print("\n" + "="*80)
    print("TEST 2: POST /api/admin/login")
    print("="*80)
    
    # Test with correct credentials
    try:
        payload = {"username": "admin", "password": "rayaru@2025"}
        response = requests.post(
            f"{BASE_URL}/admin/login",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code (correct creds): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test("POST /api/admin/login with correct credentials", False, f"Got {response.status_code}")
            return None
        
        data = response.json()
        
        if 'token' not in data:
            print_test("POST /api/admin/login returns token", False, "Missing token")
            return None
        
        if 'username' not in data or data['username'] != 'admin':
            print_test("POST /api/admin/login returns username", False, f"Got {data.get('username')}")
            return None
        
        token = data['token']
        print_test("POST /api/admin/login with correct credentials", True, f"Token: {token[:20]}...")
        
    except Exception as e:
        print_test("POST /api/admin/login with correct credentials", False, f"Exception: {str(e)}")
        return None
    
    # Test with wrong password
    try:
        payload = {"username": "admin", "password": "wrongpassword"}
        response = requests.post(
            f"{BASE_URL}/admin/login",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"\nStatus Code (wrong password): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 401:
            print_test("POST /api/admin/login with wrong password returns 401", False, f"Got {response.status_code}")
            return None
        
        data = response.json()
        if 'error' not in data:
            print_test("POST /api/admin/login with wrong password returns error", False, "Missing error field")
            return None
        
        print_test("POST /api/admin/login with wrong password returns 401", True, f"Error: {data['error']}")
        
    except Exception as e:
        print_test("POST /api/admin/login with wrong password", False, f"Exception: {str(e)}")
        return None
    
    return token

def test_admin_verify(token):
    """Test GET /api/admin/verify"""
    print("\n" + "="*80)
    print("TEST 3: GET /api/admin/verify")
    print("="*80)
    
    # Test with valid token
    try:
        response = requests.get(
            f"{BASE_URL}/admin/verify",
            headers={"x-admin-token": token},
            timeout=10
        )
        print(f"Status Code (valid token): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test("GET /api/admin/verify with valid token", False, f"Got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get('ok'):
            print_test("GET /api/admin/verify returns ok:true", False, f"Got {data.get('ok')}")
            return False
        
        if data.get('username') != 'admin':
            print_test("GET /api/admin/verify returns username", False, f"Got {data.get('username')}")
            return False
        
        print_test("GET /api/admin/verify with valid token", True, f"Username: {data['username']}")
        
    except Exception as e:
        print_test("GET /api/admin/verify with valid token", False, f"Exception: {str(e)}")
        return False
    
    # Test without token
    try:
        response = requests.get(f"{BASE_URL}/admin/verify", timeout=10)
        print(f"\nStatus Code (no token): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 401:
            print_test("GET /api/admin/verify without token returns 401", False, f"Got {response.status_code}")
            return False
        
        print_test("GET /api/admin/verify without token returns 401", True)
        
    except Exception as e:
        print_test("GET /api/admin/verify without token", False, f"Exception: {str(e)}")
        return False
    
    # Test with invalid token
    try:
        response = requests.get(
            f"{BASE_URL}/admin/verify",
            headers={"x-admin-token": "invalid-token-12345"},
            timeout=10
        )
        print(f"\nStatus Code (invalid token): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 401:
            print_test("GET /api/admin/verify with invalid token returns 401", False, f"Got {response.status_code}")
            return False
        
        print_test("GET /api/admin/verify with invalid token returns 401", True)
        
    except Exception as e:
        print_test("GET /api/admin/verify with invalid token", False, f"Exception: {str(e)}")
        return False
    
    return True

def test_admin_update_gold_price(token):
    """Test POST /api/admin/gold-price"""
    print("\n" + "="*80)
    print("TEST 4: POST /api/admin/gold-price")
    print("="*80)
    
    # Test without token
    try:
        payload = {"price_24k": 10500, "price_22k": 9600}
        response = requests.post(
            f"{BASE_URL}/admin/gold-price",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code (no token): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 401:
            print_test("POST /api/admin/gold-price without token returns 401", False, f"Got {response.status_code}")
            return False
        
        print_test("POST /api/admin/gold-price without token returns 401", True)
        
    except Exception as e:
        print_test("POST /api/admin/gold-price without token", False, f"Exception: {str(e)}")
        return False
    
    # Test with valid token and prices
    try:
        payload = {"price_24k": 10500, "price_22k": 9600}
        response = requests.post(
            f"{BASE_URL}/admin/gold-price",
            json=payload,
            headers={
                "Content-Type": "application/json",
                "x-admin-token": token
            },
            timeout=10
        )
        print(f"\nStatus Code (with token): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test("POST /api/admin/gold-price with valid token", False, f"Got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get('success'):
            print_test("POST /api/admin/gold-price returns success", False, f"Got {data.get('success')}")
            return False
        
        if data.get('price_24k') != 10500:
            print_test("POST /api/admin/gold-price returns updated price_24k", False, f"Got {data.get('price_24k')}")
            return False
        
        if data.get('price_22k') != 9600:
            print_test("POST /api/admin/gold-price returns updated price_22k", False, f"Got {data.get('price_22k')}")
            return False
        
        if 'updated_at' not in data:
            print_test("POST /api/admin/gold-price returns updated_at", False, "Missing updated_at")
            return False
        
        print_test("POST /api/admin/gold-price with valid token", True, f"24K={data['price_24k']}, 22K={data['price_22k']}")
        
    except Exception as e:
        print_test("POST /api/admin/gold-price with valid token", False, f"Exception: {str(e)}")
        return False
    
    # Verify GET /api/gold-price reflects new values immediately
    try:
        response = requests.get(f"{BASE_URL}/gold-price", timeout=10)
        print(f"\nVerifying GET /api/gold-price reflects new values...")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test("GET /api/gold-price after update", False, f"Got {response.status_code}")
            return False
        
        data = response.json()
        
        if data.get('price_24k') != 10500:
            print_test("GET /api/gold-price reflects updated price_24k", False, f"Expected 10500, got {data.get('price_24k')}")
            return False
        
        if data.get('price_22k') != 9600:
            print_test("GET /api/gold-price reflects updated price_22k", False, f"Expected 9600, got {data.get('price_22k')}")
            return False
        
        print_test("GET /api/gold-price reflects updated prices immediately", True, f"24K={data['price_24k']}, 22K={data['price_22k']}")
        
    except Exception as e:
        print_test("GET /api/gold-price after update", False, f"Exception: {str(e)}")
        return False
    
    return True

def test_contact_form():
    """Test POST /api/contact"""
    print("\n" + "="*80)
    print("TEST 5: POST /api/contact")
    print("="*80)
    
    # Test with valid data
    try:
        payload = {
            "name": "Rajesh Kumar",
            "phone": "9876543210",
            "email": "rajesh.kumar@example.com",
            "message": "I would like to sell 50 grams of 24K gold. Please contact me."
        }
        response = requests.post(
            f"{BASE_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code (valid data): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test("POST /api/contact with valid data", False, f"Got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get('success'):
            print_test("POST /api/contact returns success:true", False, f"Got {data.get('success')}")
            return False
        
        print_test("POST /api/contact with valid data", True, "Contact form submitted successfully")
        
    except Exception as e:
        print_test("POST /api/contact with valid data", False, f"Exception: {str(e)}")
        return False
    
    # Test without name
    try:
        payload = {
            "phone": "9876543210",
            "email": "test@example.com",
            "message": "Test message"
        }
        response = requests.post(
            f"{BASE_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"\nStatus Code (missing name): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 400:
            print_test("POST /api/contact without name returns 400", False, f"Got {response.status_code}")
            return False
        
        print_test("POST /api/contact without name returns 400", True)
        
    except Exception as e:
        print_test("POST /api/contact without name", False, f"Exception: {str(e)}")
        return False
    
    # Test without phone
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Test message"
        }
        response = requests.post(
            f"{BASE_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"\nStatus Code (missing phone): {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 400:
            print_test("POST /api/contact without phone returns 400", False, f"Got {response.status_code}")
            return False
        
        print_test("POST /api/contact without phone returns 400", True)
        
    except Exception as e:
        print_test("POST /api/contact without phone", False, f"Exception: {str(e)}")
        return False
    
    return True

def test_admin_logout(token):
    """Test POST /api/admin/logout"""
    print("\n" + "="*80)
    print("TEST 6: POST /api/admin/logout")
    print("="*80)
    
    # Test logout
    try:
        response = requests.post(
            f"{BASE_URL}/admin/logout",
            headers={"x-admin-token": token},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 200:
            print_test("POST /api/admin/logout", False, f"Got {response.status_code}")
            return False
        
        data = response.json()
        
        if not data.get('success'):
            print_test("POST /api/admin/logout returns success", False, f"Got {data.get('success')}")
            return False
        
        print_test("POST /api/admin/logout", True, "Logged out successfully")
        
    except Exception as e:
        print_test("POST /api/admin/logout", False, f"Exception: {str(e)}")
        return False
    
    # Verify token is invalidated
    try:
        response = requests.get(
            f"{BASE_URL}/admin/verify",
            headers={"x-admin-token": token},
            timeout=10
        )
        print(f"\nVerifying token is invalidated...")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code != 401:
            print_test("GET /api/admin/verify after logout returns 401", False, f"Got {response.status_code}")
            return False
        
        print_test("GET /api/admin/verify after logout returns 401", True, "Token successfully invalidated")
        
    except Exception as e:
        print_test("GET /api/admin/verify after logout", False, f"Exception: {str(e)}")
        return False
    
    return True

def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("RAYARU GOLD BUYING COMPANY - BACKEND API TESTS")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = {}
    
    # Test 1: GET /api/gold-price
    results['gold_price_get'] = test_gold_price_get()
    
    # Test 2: POST /api/admin/login
    token = test_admin_login()
    results['admin_login'] = token is not None
    
    if token:
        # Test 3: GET /api/admin/verify
        results['admin_verify'] = test_admin_verify(token)
        
        # Test 4: POST /api/admin/gold-price
        results['admin_update_price'] = test_admin_update_gold_price(token)
        
        # Test 5: POST /api/contact
        results['contact_form'] = test_contact_form()
        
        # Test 6: POST /api/admin/logout
        results['admin_logout'] = test_admin_logout(token)
    else:
        print("\n⚠️  Skipping remaining tests due to login failure")
        results['admin_verify'] = False
        results['admin_update_price'] = False
        results['contact_form'] = False
        results['admin_logout'] = False
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    print("="*80)
    
    return 0 if passed == total else 1

if __name__ == "__main__":
    sys.exit(main())
