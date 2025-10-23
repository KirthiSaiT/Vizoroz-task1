import sys
import os
import subprocess

def check_python():
    """Check if Python is installed and accessible"""
    try:
        result = subprocess.run([sys.executable, "--version"], capture_output=True, text=True)
        print(f"✓ Python: {result.stdout.strip()}")
        return True
    except Exception as e:
        print(f"✗ Python: {e}")
        return False

def check_node():
    """Check if Node.js is installed and accessible"""
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        print(f"✓ Node.js: {result.stdout.strip()}")
        return True
    except Exception as e:
        print(f"✗ Node.js: {e}")
        return False

def check_npm():
    """Check if npm is installed and accessible"""
    try:
        result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
        print(f"✓ npm: {result.stdout.strip()}")
        return True
    except Exception as e:
        print(f"✗ npm: {e}")
        return False

def check_postgres():
    """Check if PostgreSQL is installed and accessible"""
    try:
        # This is a basic check - in a real scenario, you might want to connect to the database
        result = subprocess.run(["psql", "--version"], capture_output=True, text=True)
        print(f"✓ PostgreSQL: {result.stdout.strip()}")
        return True
    except Exception as e:
        print(f"✗ PostgreSQL: {e}")
        print("  Note: This might be a false negative if psql is not in PATH")
        return False

def check_backend_deps():
    """Check if backend dependencies are installed"""
    try:
        import fastapi
        import uvicorn
        # These imports might not be directly importable, so we'll check differently
        print("✓ Backend dependencies: FastAPI and Uvicorn available")
        return True
    except ImportError as e:
        print(f"✗ Backend dependencies: {e}")
        return False

def check_frontend_deps():
    """Check if frontend dependencies are installed"""
    frontend_node_modules = os.path.join("frontend", "node_modules")
    if os.path.exists(frontend_node_modules):
        print("✓ Frontend dependencies: Installed")
        return True
    else:
        print("✗ Frontend dependencies: Not found (run 'npm install' in frontend directory)")
        return False

def main():
    print("CRUD Application Setup Verification")
    print("=" * 40)
    
    checks = [
        check_python,
        check_node,
        check_npm,
        check_postgres,
        check_backend_deps,
        check_frontend_deps
    ]
    
    results = []
    for check in checks:
        results.append(check())
        print()
    
    passed = sum(results)
    total = len(results)
    
    print(f"Setup Verification: {passed}/{total} checks passed")
    
    if passed == total:
        print("🎉 All checks passed! Your environment is ready for development.")
    else:
        print("⚠️  Some checks failed. Please review the errors above.")

if __name__ == "__main__":
    main()