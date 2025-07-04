# TradeX - Trading App

A modern trading application built with React Native and Expo.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/tradex.git
cd tradex
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npx expo start
```

## 📱 Building Apps

### Android

#### Development Build

```bash
# Create development build
npx expo run:android

# Create specific variant
npx expo run:android --variant development
```

#### Production APK

```bash
# Generate production APK
eas build -p android --profile preview

# Generate production AAB (Play Store)
eas build -p android --profile production
```

### iOS

```bash
# Create development build
npx expo run:ios

# Build for App Store
eas build -p ios --profile production
```

## 🛠️ Development Commands

### Start Development Server

```bash
# Start Expo development server
npx expo start

# Start with clearing cache
npx expo start -c

# Start on specific platform
npx expo start --android
npx expo start --ios
npx expo start --web
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

### Type Checking

```bash
# Run TypeScript compiler
npm run tsc

# Watch for type errors
npm run tsc:watch
```

## 📦 EAS Build Commands

```bash
# Configure EAS
eas build:configure

# Build for internal testing
eas build --profile development

# Build for preview/testing
eas build --profile preview

# Build for production
eas build --profile production

# Submit to stores
eas submit -p ios
eas submit -p android
```

## 🔄 Update Dependencies

```bash
# Update Expo SDK
npx expo-cli upgrade

# Update other dependencies
npx npm-check-updates -u
npm install
```

## 📱 Device Commands

```bash
# Start on physical device
npx expo start --localhost

# Start on Android emulator
npx expo start --android

# Start on iOS simulator
npx expo start --ios
```

## 🔧 Troubleshooting

If you encounter build issues:

1. Clear Metro bundler cache:

```bash
npx expo start -c
```

2. Reset Expo development client:

```bash
npx expo prebuild --clean
```

3. Clean Android build:

```bash
cd android
./gradlew clean
cd ..
```

4. Reset node_modules:

```bash
rm -rf node_modules
npm install
```

## 📚 Environment Setup

### Android Development

1. Install Android Studio
2. Install Android SDK
3. Set up environment variables:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### iOS Development (macOS only)

1. Install Xcode
2. Install Xcode Command Line Tools
3. Install CocoaPods:

```bash
sudo gem install cocoapods
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
