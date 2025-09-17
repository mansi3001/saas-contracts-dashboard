@echo off
set PYTHONIOENCODING=utf-8
set PYTHONLEGACYWINDOWSSTDIO=1

echo Starting FastAPI server...
echo Server will be available at: http://127.0.0.1:8000
echo API docs will be available at: http://127.0.0.1:8000/docs
echo Press Ctrl+C to stop the server
echo --------------------------------------------------

python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

pause