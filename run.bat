@echo off
setlocal

echo ==============================================
echo Rage Labs - Syncing Frontend to Backend
echo ==============================================

REM Ensure static folder exists
if not exist "backend\src\main\resources\static" (
    mkdir "backend\src\main\resources\static"
)

REM Copy frontend files to backend
xcopy "frontend\*" "backend\src\main\resources\static\" /E /I /Y

echo ==============================================
echo Starting Spring Boot Backend Server...
echo ==============================================

cd backend
mvn spring-boot:run

pause