Write-Host "🌱 Global Plant Genetics - Setup Script" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed." -ForegroundColor Red
    Write-Host "📦 Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "   Download the LTS version and run the installer." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After installing Node.js, run this script again." -ForegroundColor Yellow
    exit 1
}
else {
    $nodeVersion = node -v
    Write-Host "✅ Node.js already installed ($nodeVersion)" -ForegroundColor Green
}

# Install project dependencies
Write-Host ""
Write-Host "📦 Installing project dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Run 'npm run dev' for local development" -ForegroundColor White
    Write-Host "   2. Run 'npm run deploy' to build and deploy to S3" -ForegroundColor White
    Write-Host ""
}
else {
    Write-Host ""
    Write-Host "❌ Setup failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}
