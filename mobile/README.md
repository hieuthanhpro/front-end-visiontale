# VisionTale Mobile App

A React Native mobile application built with Expo for managing video generation projects on iOS and Android.

## Features

- **Project Management**: Create, view, and manage video generation projects
- **Library Management**: Browse and organize characters, locations, props, and effects
- **Storyboarding**: Visualize and organize video scenes
- **User Profile**: Manage account settings and preferences
- **Multi-language Support**: Built-in i18n support
- **Offline Support**: Works offline with cached data (planned)

## Prerequisites

- Node.js 16+ and npm/yarn/pnpm/bun
- Expo CLI: `npm install -g expo-cli`
- Expo Go app installed on your mobile device (for development)
- iOS Simulator or Android Emulator (for testing on desktop)

## Getting Started

### 1. Install Dependencies

```bash
cd mobile
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and update with your API configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
EXPO_PUBLIC_API_BASE_URL=your_api_base_url
```

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

## Development

### Running on Different Platforms

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

**Expo Go App:**
1. Run `npm start`
2. Scan the QR code with Expo Go app (iOS) or Expo Go app (Android)

### Project Structure

```
mobile/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Projects screen
│   │   ├── library.tsx    # Library screen
│   │   ├── storyboard.tsx # Storyboard screen
│   │   └── profile.tsx    # Profile screen
│   ├── project/           # Project details
│   │   └── [id].tsx       # Dynamic project page
│   ├── settings.tsx       # Settings modal
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── services/              # API services
│   └── api/              # API client classes
├── stores/               # Zustand state management
├── types/                # TypeScript type definitions
└── package.json          # Dependencies

```

## API Integration

The app connects to your backend API through the `services/api` directory:

- **projectAPI**: Project CRUD operations
- **entityAPI**: Entity (character, location, prop, effect) management

Configure the API base URL in `.env.local`:

```
EXPO_PUBLIC_API_BASE_URL=http://your-api.com/api
```

### API Endpoints Expected

```
GET    /api/projects              # Get all projects
GET    /api/projects/:id          # Get project details
POST   /api/projects              # Create project
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project

GET    /api/entities?type=...     # Get entities by type
GET    /api/entities/:id          # Get entity details
POST   /api/entities              # Create entity
PUT    /api/entities/:id          # Update entity
DELETE /api/entities/:id          # Delete entity
```

## State Management

The app uses **Zustand** for state management. Store hooks are located in `stores/`:

```typescript
import { useProjectStore } from '@/stores/projectStore';

// In component
const { projects, loading, setProjects } = useProjectStore();
```

## Styling

The app uses React Native's built-in styling system with:
- Consistent color palette defined throughout components
- Flexbox for layouts
- Tailwind-inspired spacing and sizing
- Ionicons for icons

### Color System

- Primary: `#2563eb` (Blue)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Danger: `#dc2626` (Red)
- Neutral: Gray scale from `#1f2937` to `#f9fafb`

## Building for Production

### iOS

```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

Requires Expo account and EAS CLI setup. See [Expo EAS documentation](https://docs.expo.dev/build/introduction/).

## Testing

```bash
npm test
```

## Troubleshooting

### Clear Cache

```bash
npm start -- --clear
```

### Reset Expo

```bash
expo start --clear
```

### Module Resolution Issues

If you encounter module resolution issues, verify:
1. `.env.local` is properly configured
2. `tsconfig.json` paths are correct
3. `babel.config.js` has the correct alias mappings

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Create a pull request

## Documentation

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router](https://docs.expo.dev/routing/introduction)
- [Zustand](https://github.com/pmndrs/zustand)

## License

MIT

## Support

For issues, questions, or suggestions, please open an issue in the repository.
