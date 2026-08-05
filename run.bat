@echo off
echo ==============================================
echo  Rage Labs - Syncing Frontend Assets to Backend
echo ==============================================
xcopy /E /Y /I frontend backend\src\main\resources\static

echo ==============================================
echo  Starting Spring Boot Backend Server...
echo ==============================================
cd backend
mvn spring-boot:run
