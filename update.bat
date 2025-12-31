@echo off
echo Pulling latest changes...
git pull

echo Staging all changes...
git add .

echo Committing changes...
git commit -m "Update content"

echo Pushing changes to remote...
git push

echo.
echo Script finished.
pause
