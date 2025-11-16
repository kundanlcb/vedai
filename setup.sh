#!/bin/bash

# VEDAI Student Learning Platform - Setup Guide
# Complete installation and running instructions

echo "======================================"
echo "VEDAI Student App - Setup Guide"
echo "======================================"

# Step 1: Install dependencies
echo ""
echo "Step 1: Installing dependencies..."
npm install

# Step 2: Install pods for iOS
echo ""
echo "Step 2: Installing iOS pods..."
cd ios && pod install && cd ..

# Step 3: Show available commands
echo ""
echo "======================================"
echo "Setup Complete! Available Commands:"
echo "======================================"
echo ""
echo "Development:"
echo "  npm start          - Start Metro bundler"
echo "  npm run ios        - Run on iOS simulator"
echo "  npm run android    - Run on Android emulator"
echo "  npm run lint       - Run ESLint"
echo "  npm test           - Run tests"
echo ""
echo "Next steps:"
echo "1. Run: npm start (in one terminal)"
echo "2. Run: npm run ios (in another terminal)"
echo ""
echo "======================================"

