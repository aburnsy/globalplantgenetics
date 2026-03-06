#!/bin/bash

# ==========================================
# Global Plant Genetics - Build & Deploy Script
# ==========================================
# This script builds the 11ty site and deploys it to AWS S3
# Prerequisites: Node.js, AWS CLI configured with credentials

echo "🌱 Global Plant Genetics - Build & Deploy"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Run ./setup.sh first."
    exit 1
fi

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed."
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencies not installed. Running npm install..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Build the site
echo "🔨 Building site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build complete"
echo ""

# Prompt for bucket name
read -p "Enter your S3 bucket name: " BUCKET_NAME

if [ -z "$BUCKET_NAME" ]; then
    echo "❌ Bucket name is required"
    exit 1
fi

echo ""
echo "📦 Deploying to s3://$BUCKET_NAME"
echo ""

# Sync dist/ folder to S3
echo "📤 Uploading files..."
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete

if [ $? -ne 0 ]; then
    echo "❌ Upload failed"
    exit 1
fi

# Set cache headers
echo ""
echo "🔧 Setting cache headers..."

# HTML files - short cache (1 hour)
aws s3 cp dist/ s3://$BUCKET_NAME/ \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --content-type "text/html" \
  --cache-control "max-age=3600" \
  --metadata-directive REPLACE

# CSS files - long cache (1 year)
aws s3 cp dist/ s3://$BUCKET_NAME/ \
  --recursive \
  --exclude "*" \
  --include "*.css" \
  --content-type "text/css" \
  --cache-control "max-age=31536000" \
  --metadata-directive REPLACE

# JS files - long cache (1 year)
aws s3 cp dist/ s3://$BUCKET_NAME/ \
  --recursive \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript" \
  --cache-control "max-age=31536000" \
  --metadata-directive REPLACE

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📍 Your site is available at:"
echo "   http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo ""
echo "💡 Next steps:"
echo "   1. Set up CloudFront distribution for HTTPS and CDN"
echo "   2. Configure custom domain (optional)"
echo "   3. Test the site thoroughly"
echo ""
echo "🌱 Happy growing!"
