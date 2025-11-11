@echo off
echo Starting LMS (backend + frontend) in separate windows...
start cmd /k "cd /d backend && npm i && npm run dev"
start cmd /k "cd /d frontend && npm i && npm run dev"
echo Done. Two windows should be running now.
