Write-Host "Starting LMS (backend + frontend)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit","-Command","cd backend; npm i; npm run dev"
Start-Process powershell -ArgumentList "-NoExit","-Command","cd frontend; npm i; npm run dev"
Write-Host "Launched." -ForegroundColor Green
