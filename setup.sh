#!/bin/bash

echo "🌱 Global Plant Genetics - Setup Script"
echo "======================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "📦 Installing Node.js via nvm (Node Version Manager)..."

    # Install nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    # Install Node.js LTS
    nvm install --lts
    nvm use --lts

    echo "✅ Node.js installed successfully"
else
    echo "✅ Node.js already installed ($(node -v))"
fi

# Install project dependencies
echo ""
echo "📦 Installing project dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "📍 Next steps:"
    echo "   1. Run 'npm run dev' for local development"
    echo "   2. Run 'npm run deploy' to build and deploy to S3"
    echo ""
else
    echo ""
    echo "❌ Setup failed. Please check the error messages above."
    exit 1
fi
