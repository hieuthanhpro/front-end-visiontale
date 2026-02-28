# VisionTale Mobile - Complete Setup Guide

## Quick Start (5 minutes)

### Prerequisites
- Node.js 16+ installed
- npm/yarn/pnpm installed
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (free download from App Store/Play Store)

### Installation Steps

```bash
# 1. Navigate to mobile directory
cd mobile

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Update API base URL in .env.local
# EXPO_PUBLIC_API_BASE_URL=your_backend_api_url

# 5. Start development server
npm start

# 6. Scan QR code with Expo Go or press 'i' for iOS/a' for Android
```

Done! Your app is now running.

## Detailed Setup

### 1. Environment Setup

**Windows/macOS/Linux:**

```bash
# Install Node.js from https://nodejs.org (LTS recommended)

# Install Expo CLI globally
npm install -g expo-cli

# Verify installation
expo --version
```

### 2. Project Installation

```bash
cd mobile
npm install
```

This installs all dependencies including:
- React Native and React
- Expo framework
- Expo Router (navigation)
- Zustand (state management)
- Axios (HTTP client)
- Ionicons (icon library)

### 3. Environment Configuration

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:

```env
# Required: Backend API URL
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api

# Optional: Feature toggles
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=true
EXPO_PUBLIC_ENABLE_OFFLINE_MODE=false
```

### 4. Running the App

#### Option A: Expo Go (Easiest)

**iOS:**
```bash
npm start
# Then scan QR code with Camera app or Expo app
```

**Android:**
```bash
npm start
# Then scan QR code with Expo Go app
```

#### Option B: iOS Simulator

```bash
npm run ios
```

Requires Xcode installed. First run will install simulator.

#### Option C: Android Emulator

```bash
npm run android
```

Requires Android Studio and emulator configured.

#### Option D: Web Browser

```bash
npm run web
```

## Project Structure Explained

```
mobile/
├── app/                           # Expo Router file-based routing
│   ├── _layout.tsx               # Root layout with navigation
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── _layout.tsx          # Tab configuration
│   │   ├── index.tsx            # Projects tab (home)
│   │   ├── library.tsx          # Library tab
│   │   ├── storyboard.tsx       # Storyboard tab
│   │   └── profile.tsx          # Profile tab
│   ├── project/
│   │   └── [id].tsx             # Dynamic project detail page
│   └── settings.tsx              # Settings modal
│
├── components/                    # Reusable UI components
│   ├── Button.tsx                # Custom button component
│   └── Card.tsx                  # Card container component
│
├── services/                      # External service integrations
│   └── api/                       # API client services
│       ├── projectAPI.ts         # Project endpoints
│       └── entityAPI.ts          # Entity endpoints
│
├── stores/                        # State management (Zustand)
│   └── projectStore.ts           # Project state store
│
├── types/                         # TypeScript type definitions
│   └── index.ts                  # All app types
│
├── app.json                       # Expo configuration
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── babel.config.js                # Babel configuration
└── README.md                      # Documentation
```

## Connecting to Your Backend

### API Configuration

Update the API base URL in `.env.local`:

```env
EXPO_PUBLIC_API_BASE_URL=http://your-api-domain.com/api
```

For local development:
- **iOS Simulator**: Use `http://localhost:8080/api`
- **Android Emulator**: Use `http://10.0.2.2:8080/api`
- **Physical Device**: Use your machine's IP address `http://192.168.x.x:8080/api`

### Expected API Endpoints

Your backend should provide these endpoints:

```
Projects
  GET    /projects              - List all projects
  GET    /projects/:id          - Get project details
  POST   /projects              - Create new project
  PUT    /projects/:id          - Update project
  DELETE /projects/:id          - Delete project

Entities (Characters, Locations, Props, Effects)
  GET    /entities?type=...     - List entities by type
  GET    /entities/:id          - Get entity details
  POST   /entities              - Create entity
  PUT    /entities/:id          - Update entity
  DELETE /entities/:id          - Delete entity
```

## Key Features

### Tab-Based Navigation
- **Projects**: Browse and manage all projects
- **Library**: Organize characters, locations, props, and effects
- **Storyboard**: View and manage storyboards
- **Profile**: User settings and account info

### State Management with Zustand

Access app state anywhere:

```typescript
import { useProjectStore } from '@/stores/projectStore';

export function MyComponent() {
  const { projects, loading, setProjects } = useProjectStore();
  
  return <Text>{projects.length} projects</Text>;
}
```

### Type Safety

All TypeScript types defined in `types/index.ts`:

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  // ...
}
```

## Common Tasks

### Add a New Screen

1. Create file in `app/` directory: `app/new-screen.tsx`

```typescript
import { View, Text } from 'react-native';

export default function NewScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text>New Screen</Text>
    </View>
  );
}
```

2. Access via navigation: `router.push('/new-screen')`

### Create a New Store

1. Create in `stores/`: `stores/myStore.ts`

```typescript
import { create } from 'zustand';

export const useMyStore = create((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
}));
```

2. Use in component:

```typescript
import { useMyStore } from '@/stores/myStore';

const { value, increment } = useMyStore();
```

### Add a New API Service

1. Create in `services/api/`: `services/api/newAPI.ts`

```typescript
import axios from 'axios';

class NewAPI {
  private api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  });

  async getData() {
    const response = await this.api.get('/endpoint');
    return response.data;
  }
}

export const newAPI = new NewAPI();
```

## Debugging

### View Logs

```bash
# During development
npm start

# Logs appear in terminal
# Long press 'j' to open DevTools in Expo Go
```

### React Native Debugger

```bash
# Install React Native Debugger
# https://github.com/jhen0409/react-native-debugger

# In Expo, press 'j' to open debugger
```

## Building for Production

### Expo EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Submitting to App Stores

- **Apple App Store**: Follow Expo iOS submission guide
- **Google Play Store**: Follow Expo Android submission guide

## Troubleshooting

### App won't connect to backend

```bash
# Check API URL in .env.local
cat .env.local

# For local development:
# iOS: http://localhost:8080/api
# Android: http://10.0.2.2:8080/api
# Physical: http://192.168.x.x:8080/api
```

### Clear cache and rebuild

```bash
npm start -- --clear
```

### Module not found errors

```bash
# Verify paths in tsconfig.json
# Verify aliases in babel.config.js
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Expo Go app won't scan QR code

```bash
# Run in tunnel mode
npm start -- --tunnel

# Or use LAN
npm start -- --lan
```

## Performance Optimization

### Image Optimization
- Use WebP format for better compression
- Lazy load images when possible

### State Management
- Keep stores focused on single concerns
- Use selectors to prevent unnecessary re-renders

### Navigation
- Pre-load data before navigation
- Use React Navigation optimizations

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript in React Native](https://reactnative.dev/docs/typescript)

## Support

For issues:
1. Check error message in terminal/logs
2. Review [Expo troubleshooting guide](https://docs.expo.dev/troubleshooting/troubleshooting-a-project/)
3. Search existing GitHub issues
4. Create a new issue with detailed description

Happy coding! 🚀
