# ==========================================
# Global Plant Genetics - Build & Deploy Script
# ==========================================
# This script builds the 11ty site and deploys it to AWS S3
# Prerequisites: Node.js, AWS CLI configured with credentials

Write-Host "🌱 Global Plant Genetics - Build & Deploy" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Run .\setup.ps1 first." -ForegroundColor Red
    exit 1
}

# Check if AWS CLI is installed
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "❌ AWS CLI is not installed." -ForegroundColor Red
    Write-Host "Visit: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  Dependencies not installed. Running npm install..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Build the site
Write-Host "🔨 Building site..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build complete" -ForegroundColor Green
Write-Host ""

# Prompt for bucket name
$BUCKET_NAME = Read-Host "Enter your S3 bucket name"

if ([string]::IsNullOrWhiteSpace($BUCKET_NAME)) {
    Write-Host "❌ Bucket name is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Deploying to s3://$BUCKET_NAME" -ForegroundColor Cyan
Write-Host ""

# Sync dist/ folder to S3
Write-Host "📤 Uploading files..." -ForegroundColor Cyan
aws s3 sync dist/ s3://$BUCKET_NAME --delete

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed" -ForegroundColor Red
    exit 1
}

# Set cache headers
Write-Host ""
Write-Host "🔧 Setting cache headers..." -ForegroundColor Cyan

# HTML files - short cache (1 hour)
aws s3 cp dist/ s3://$BUCKET_NAME/ `
  --recursive `
  --exclude "*" `
  --include "*.html" `
  --content-type "text/html" `
  --cache-control "max-age=3600" `
  --metadata-directive REPLACE

# CSS files - long cache (1 year)
aws s3 cp dist/ s3://$BUCKET_NAME/ `
  --recursive `
  --exclude "*" `
  --include "*.css" `
  --content-type "text/css" `
  --cache-control "max-age=31536000" `
  --metadata-directive REPLACE

# JS files - long cache (1 year)
aws s3 cp dist/ s3://$BUCKET_NAME/ `
  --recursive `
  --exclude "*" `
  --include "*.js" `
  --content-type "application/javascript" `
  --cache-control "max-age=31536000" `
  --metadata-directive REPLACE

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Your site is available at:" -ForegroundColor Cyan
Write-Host "   http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com" -ForegroundColor White
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Set up CloudFront distribution for HTTPS and CDN" -ForegroundColor White
Write-Host "   2. Configure custom domain (optional)" -ForegroundColor White
Write-Host "   3. Test the site thoroughly" -ForegroundColor White
Write-Host ""
Write-Host "🌱 Happy growing!" -ForegroundColor Green
