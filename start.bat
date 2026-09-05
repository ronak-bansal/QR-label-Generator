@echo off
title QR Generator Server
cd /d "%~dp0"
echo Starting QR Generator Server on http://localhost:3000...
node server.js
pause
