@echo off
setlocal
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Python was not found in PATH.
  exit /b 1
)

where pythonw >nul 2>nul
if errorlevel 1 (
  start "" python -m http.server 5173 -d frontend
) else (
  start "" pythonw -m http.server 5173 -d frontend
)
timeout /t 2 >nul

python tests\test_structure.py
if errorlevel 1 exit /b 1

echo [OK] Course repository scaffold is ready.
echo [INFO] Open http://127.0.0.1:5173/index.html in your browser.
exit /b 0
