# VisionTale Mobile - Expo Go Setup Guide

Complete guide to set up and run the VisionTale mobile app using Expo Go.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Running on Devices](#running-on-devices)
4. [Project Structure](#project-structure)
5. [Configuration](#configuration)
6. [Development](#development)
7. [Troubleshooting](#troubleshooting)
8. [Building for Production](#building-for-production)

---

## Prerequisites

Before starting, ensure you have:

- **Node.js**: 18.0.0 or higher ([download](https://nodejs.org/))
- **npm** or **pnpm**: Latest version
- **Git**: For version control
- **Expo Go app**: Install on your mobile device
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

**Optional (for building):**
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`

---

## Quick Start

### 1. Navigate to Mobile Directory

```bash
cd mobile
```

### 2. Install Dependencies

Using **npm**:
```bash
npm install
```

Using **pnpm**:
```bash
pnpm install
```

Using **yarn**:
```bash
yarn install
```

### 3. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
```env
EXPO_PUBLIC_API_BASE_URL=http://your-api-url.com/api
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=true
EXPO_PUBLIC_ENABLE_OFFLINE_MODE=false
```

### 4. Start Development Server

```bash
npm start
```

You'll see a QR code and menu options:
```
› Press s to use Expo Go
› Press a to open Android
› Press i to open iOS
› Press r to reload
› Press c to clear console
```

---

## Running on Devices

### Using Expo Go (Recommended - Easiest)

**For iPhone/iPad:**
1. Install **Expo Go** from App Store
2. Open Expo Go app
3. Scan the QR code shown in terminal using camera app
4. App opens automatically

**For Android:**
1. Install **Expo Go** from Google Play
2. Open Expo Go app
3. Scan the QR code using Expo Go's built-in scanner
4. App loads

### Using iOS Simulator

**Requirements:** Mac with Xcode installed

```bash
npm start
# Then press 'i' in the terminal
```

Or directly:
```bash
npm run ios
```

### Using Android Emulator

**Requirements:** Android Studio with Emulator running

```bash
npm start
# Then press 'a' in the terminal
```

Or directly:
```bash
npm run android
```

### Using iOS Simulator (Without Xcode - Workaround)

If you don't have Xcode, use an online simulator service or ask a colleague with a Mac.

### Using Web Browser

Test the app in a web browser (limited functionality):
```bash
npm start
# Then press 'w' in the terminal
```

Or directly:
```bash
npm run web
```

---

## Project Structure

```
mobile/
├── app/                              # Expo Router screens (file-based routing)
│   ├── (tabs)/                      # Tab navigation group
│   │   ├── _layout.tsx              # Tab navigator configuration
│   │   ├── index.tsx                # Projects screen
│   │   ├── library.tsx              # Asset library screen
│   │   ├── storyboard.tsx           # Storyboard editor screen
│   │   └── profile.tsx              # User profile screen
│   ├── project/
│   │   └── [id].tsx                 # Dynamic project detail page
│   ├── settings.tsx                 # Settings screen
│   └── _layout.tsx                  # Root layout & navigation
│
├── services/                         # API & external services
│   └── api/
│       ├── projectAPI.ts            # Project CRUD operations
│       └── entityAPI.ts             # Entity management (chars, props, etc)
│
├── stores/                           # Zustand state management
│   ├── projectStore.ts              # Project state & actions
│   ├── libraryStore.ts              # Asset library state
│   └── userStore.ts                 # User auth & preferences
│
├── components/                       # Reusable React components
│
├── types/                            # TypeScript interfaces
│   └── index.ts
│
├── constants/                        # App-wide constants
│
├── hooks/                            # Custom React hooks
│
├── utils/                            # Utility functions
│
├── app.json                          # Expo configuration
├── tsconfig.json                     # TypeScript config
├── babel.config.js                   # Babel configuration
├── metro.config.js                   # Metro bundler config
├── package.json                      # Dependencies & scripts
├── .env.example                      # Environment template
├── .env.local                        # Local environment (git ignored)
└── README.md                         # App-specific README

```

### Key Routing Concepts

**File-based Routing** (Expo Router):
- Files in `/app` automatically become routes
- `(tabs)` creates a group without affecting URL
- `[id]` creates dynamic segments
- `_layout.tsx` configures navigation structure
- `/app/index.tsx` is the default home page

---

## Configuration

### TypeScript Paths

Path aliases defined in `tsconfig.json`:
```
@/*               → /
@/components/*    → /components/
@/services/*      → /services/
@/stores/*        → /stores/
@/types/*         → /types/
```

Use them in imports:
```tsx
import { useProjectStore } from '@/stores/projectStore';
import { projectAPI } from '@/services/api/projectAPI';
```

### Environment Variables

File: `.env.local`

```env
# API Configuration
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api

# App Info
EXPO_PUBLIC_APP_NAME=VisionTale Mobile
EXPO_PUBLIC_APP_VERSION=1.0.0

# Features
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=true
EXPO_PUBLIC_ENABLE_OFFLINE_MODE=false
```

**Important:** Only variables prefixed with `EXPO_PUBLIC_` are accessible in the app.

### App Configuration

File: `app.json`

Configure:
- App name, icon, splash screen
- Platform-specific settings (iOS bundle ID, Android package)
- Plugins and permissions
- EAS project ID

---

## Development

### Common Tasks

**Clear Cache & Reinstall**
```bash
npm start -- --clear
# or
rm -rf node_modules/.cache
npm start
```

**Format Code**
```bash
npm run lint
```

**Type Check**
```bash
npm run type-check
```

**View Logs**
```bash
# Metro bundler logs appear in terminal
# Press 'j' in terminal for logs menu
```

### Debugging

**Using Expo DevTools**
1. Shake device or press Ctrl+M (Android)
2. Press Cmd+D (iOS) or access debug menu
3. Select "Debug Remote JS"

**Console Logs**
```tsx
console.log('Your message');
// Appears in terminal and debugger
```

**React DevTools**
```bash
npm install react-devtools
# In another terminal:
react-devtools
# Connect from app menu
```

---

## Troubleshooting

### Metro Bundler Issues

**Error: "Metro has encountered an error"**
```bash
npm start -- --clear
# or
rm -rf node_modules/.cache
```

**Port 8081 already in use**
```bash
npm start -- --port 8082
```

### Dependencies Issues

**"Module not found" errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
npm run type-check
# Fix issues shown
```

### API Connection Issues

**"Network error" / "Cannot reach API"**
1. Check `EXPO_PUBLIC_API_BASE_URL` in `.env.local`
2. Ensure backend server is running
3. On Android emulator: use `10.0.2.2` instead of `localhost`
4. Check device/emulator network connectivity

**Localhost not working on device**
```env
# On device, use your computer's IP:
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.100:8080/api
```

### QR Code Not Scanning

1. Make sure device camera works
2. Ensure good lighting
3. Try manually entering URL shown in terminal
4. Restart Expo Go app

### Hot Reload Not Working

```bash
# Full restart
npm start -- --clear

# Or press 'c' in terminal to clear cache
```

---

## Building for Production

### Building with EAS

**Prerequisites**
```bash
npm install -g eas-cli
eas login
```

**Configure EAS**
```bash
eas init
# Follow prompts to set up
```

**Build for iOS**
```bash
eas build --platform ios
# Generates .ipa file
```

**Build for Android**
```bash
eas build --platform android
# Generates .aab file
```

**Submit to App Stores**
```bash
# iOS App Store
eas submit --platform ios

# Google Play
eas submit --platform android
```

### Local Build (iOS)

```bash
# Requires Xcode
npx expo run:ios
```

### Local Build (Android)

```bash
# Requires Android NDK
npx expo run:android
```

---

## Performance Tips

1. **Optimize Images**: Use appropriate sizes and formats
2. **Lazy Load Components**: Use React.lazy for heavy components
3. **Use FlatList**: For large lists (not ScrollView)
4. **Profile Performance**: Use React DevTools Profiler
5. **Minimize Dependencies**: Review and remove unused packages

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [Zustand State Management](https://github.com/pmndrs/zustand)
- [TypeScript in React Native](https://reactnative.dev/docs/typescript)

---

## Support

For issues:
1. Check [Expo Discord](https://chat.expo.dev/)
2. Search [Expo GitHub Issues](https://github.com/expo/expo/issues)
3. Check app-specific README in `/mobile/README.md`

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Set up `.env.local`
3. ✅ Run `npm start`
4. ✅ Scan QR code with Expo Go
5. 🚀 Start developing!

Happy coding! 🎉
