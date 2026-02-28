# VisionTale Mobile App

A React Native mobile application built with Expo and Expo Router, designed to manage video projects and multimedia assets on iOS and Android devices.

## 📱 Features

- **Project Management**: Create, edit, and manage video projects
- **Asset Library**: Browse and organize characters, locations, props, and effects
- **Storyboard Creation**: Visual storyboarding for video projects
- **User Profile**: Manage user settings and preferences
- **Real-time Sync**: Seamless synchronization with the backend API
- **Responsive Design**: Optimized for phones and tablets

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn or pnpm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

### Installation

1. **Install dependencies**:
   ```bash
   cd mobile
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `EXPO_PUBLIC_API_URL` with your API endpoint:
   ```env
   EXPO_PUBLIC_API_URL=http://your-api-url.com/api
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or
   pnpm start
   ```

## 📲 Running on Devices

### Using Expo Go (Easiest)

1. Install **Expo Go** from:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the development server:
   ```bash
   npm start
   ```

3. Scan the QR code with your phone to open the app in Expo Go

### Using iOS Simulator

```bash
npm start
# Press 'i' to open iOS Simulator
```

### Using Android Emulator

```bash
npm start
# Press 'a' to open Android Emulator
```

### Building for Production

#### iOS Build

```bash
npm run build:ios
```

#### Android Build

```bash
npm run build:android
```

#### Web Build

```bash
npm run build:web
```

## 📁 Project Structure

```
mobile/
├── app/                          # Expo Router screens
│   ├── (tabs)/                  # Tab-based navigation
│   │   ├── index.tsx            # Projects screen
│   │   ├── library.tsx          # Library/Assets screen
│   │   ├── storyboard.tsx       # Storyboard screen
│   │   ├── profile.tsx          # Profile screen
│   │   └── _layout.tsx          # Tabs layout
│   ├── project/[id].tsx         # Project detail screen
│   ├── settings.tsx             # Settings screen
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
├── services/                     # API services
│   └── api/
│       ├── projectAPI.ts        # Project API calls
│       └── entityAPI.ts         # Entity API calls
├── stores/                       # Zustand stores
│   ├── projectStore.ts          # Project state management
│   ├── libraryStore.ts          # Library state management
│   └── userStore.ts             # User state management
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions
├── hooks/                        # Custom React hooks
├── constants/                    # App constants
├── app.json                      # Expo configuration
├── tsconfig.json                 # TypeScript configuration
├── babel.config.js               # Babel configuration
├── metro.config.js               # Metro bundler configuration
└── package.json                  # Dependencies
```

## 🔧 Configuration

### TypeScript Paths

Path aliases are configured in `tsconfig.json`:
- `@/*` → Root directory
- `@/components/*` → Components directory
- `@/services/*` → Services directory
- `@/stores/*` → Stores directory
- `@/types/*` → Types directory
- `@/utils/*` → Utils directory

### Expo Configuration

The `app.json` file contains:
- App name and slug
- Icon and splash screen configuration
- Plugin configuration (camera, media library)
- Platform-specific settings

## 🔌 API Integration

The app communicates with the backend API through Axios. All API calls are centralized in `/services/api/`:

- **projectAPI.ts**: Project CRUD operations
- **entityAPI.ts**: Entity management (characters, locations, props, effects)

Configure the API endpoint in `.env.local`:
```env
EXPO_PUBLIC_API_URL=http://your-api-url.com/api
```

## 📦 State Management

The app uses **Zustand** for state management:

- `useProjectStore`: Project management and fetching
- `useLibraryStore`: Asset library management
- `useUserStore`: User authentication and preferences

## 🎨 Design System

The app uses a consistent color scheme:
- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Neutral**: Gray scale from `#1f2937` to `#f9fafb`

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📚 Dependencies

Key dependencies:
- **expo**: React Native framework
- **expo-router**: File-based routing
- **zustand**: State management
- **axios**: HTTP client
- **react-native-gesture-handler**: Touch handling
- **react-native-reanimated**: Animations
- **@react-native-async-storage/async-storage**: Local storage

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📝 License

This project is part of the VisionTale suite. See the main repository for license information.

## 🆘 Troubleshooting

### Metro Bundler Cache Issues

```bash
npm start -- --clear
# or
rm -rf node_modules/.cache
npm start
```

### Dependencies Not Installing

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
npm start -- --port 8081
```

### API Connection Issues

- Ensure `EXPO_PUBLIC_API_URL` is correctly set in `.env.local`
- Check if backend API is running and accessible
- Verify network connectivity on the device/simulator

## 🚀 Next Steps

1. Set up your backend API
2. Configure environment variables
3. Run `npm start` and test with Expo Go
4. Deploy using EAS Build for iOS/Android

For more information, visit:
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [React Native Documentation](https://reactnative.dev/)
