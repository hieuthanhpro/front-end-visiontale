# VisionTale - Full Stack Application

This repository contains both the web and mobile applications for VisionTale, a comprehensive video generation platform.

## 📦 Project Structure

```
front-end-visiontale/
├── src/                          # Web application (Vue 3)
│   ├── api/                      # API client services
│   ├── components/               # Vue components
│   ├── views/                    # Page components
│   ├── router/                   # Vue Router configuration
│   ├── store/                    # Pinia store management
│   ├── locales/                  # i18n translations (EN, VI, ZH)
│   └── styles/                   # Global styles
│
├── mobile/                        # Mobile application (React Native + Expo)
│   ├── app/                      # Expo Router file-based routing
│   │   ├── (tabs)/              # Tabbed navigation screens
│   │   ├── project/             # Project detail screens
│   │   └── settings.tsx         # Settings modal
│   ├── components/              # Reusable UI components
│   ├── services/api/            # API client services
│   ├── stores/                  # Zustand state management
│   ├── hooks/                   # Custom React hooks
│   ├── utils/                   # Utility functions
│   ├── constants/               # App constants
│   ├── types/                   # TypeScript definitions
│   ├── README.md                # Mobile app documentation
│   ├── SETUP.md                 # Detailed setup guide
│   └── QUICK_REFERENCE.md       # Quick reference guide
│
└── Documentation/
    ├── MOBILE_BUILD_SUMMARY.md  # Mobile build overview
    └── VISIONTALE_MOBILE_README.md  # This file
```

## 🚀 Quick Start

### Web Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile Application

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Update API URL in .env.local
# EXPO_PUBLIC_API_BASE_URL=http://your-api-url/api

# Start development server
npm start

# Run on specific platform
npm run ios       # iOS Simulator
npm run android   # Android Emulator
npm run web       # Web Browser
```

## 🎯 Features

### Web Application (Vue 3)
- Dashboard for project management
- Text creation and editing
- Entity library management (characters, locations, props, effects)
- Storyboarding interface
- Video output and rendering
- Settings and configuration
- Multi-language support (English, Vietnamese, Chinese)

### Mobile Application (React Native)
- Project browsing and management
- Entity library explorer
- Storyboarding interface
- User profile and settings
- Responsive design for iOS and Android
- Offline-ready architecture
- Dark mode support (coming soon)

## 📱 Platform Requirements

### Web Application
- Node.js 16+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Vue 3.5+

### Mobile Application
- iOS 13+
- Android 7+
- Expo 52+
- React Native 0.75+

## 🔌 API Integration

Both applications connect to the same backend API. Configure the API URL:

**Web Application:**
- Set API URL in `src/config/index.js` or environment variables

**Mobile Application:**
- Set `EXPO_PUBLIC_API_BASE_URL` in `mobile/.env.local`

### Required API Endpoints

```
Projects
  GET    /api/projects              - List all projects
  GET    /api/projects/:id          - Get project details
  POST   /api/projects              - Create project
  PUT    /api/projects/:id          - Update project
  DELETE /api/projects/:id          - Delete project

Entities
  GET    /api/entities?type=...     - List entities by type
  GET    /api/entities/:id          - Get entity details
  POST   /api/entities              - Create entity
  PUT    /api/entities/:id          - Update entity
  DELETE /api/entities/:id          - Delete entity

Media
  GET    /api/media                 - List media files
  POST   /api/media                 - Upload media

Videos
  GET    /api/videos                - List generated videos
  POST   /api/videos                - Generate video
```

## 🛠️ Technology Stack

### Web Frontend
- **Framework:** Vue 3
- **Build Tool:** Vite
- **Routing:** Vue Router
- **State Management:** Pinia
- **UI Components:** Element Plus
- **Styling:** SCSS/CSS
- **Icons:** Element Plus Icons
- **i18n:** Vue I18n
- **HTTP Client:** Axios

### Mobile Frontend
- **Framework:** React Native
- **Build Tool:** Expo
- **Routing:** Expo Router
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Icons:** Ionicons
- **i18n:** i18next + react-i18next
- **DevTools:** Expo DevTools

### Common
- **Language:** TypeScript
- **Package Manager:** npm/yarn/pnpm/bun

## 📊 Project Dependencies

### Web Application
```json
{
  "vue": "^3.5.13",
  "vue-router": "^4.2.5",
  "pinia": "^3.0.3",
  "element-plus": "^2.5.3",
  "axios": "^1.7.9",
  "vue-i18n": "^9.9.0"
}
```

### Mobile Application
```json
{
  "react": "^18.2.0",
  "react-native": "0.75.1",
  "expo": "^52.0.0",
  "expo-router": "^4.0.0",
  "zustand": "^4.4.0",
  "axios": "^1.7.9"
}
```

## 🎨 Design System

### Colors
- **Primary:** Blue (#2563eb)
- **Secondary:** Green (#10b981)
- **Warning:** Amber (#f59e0b)
- **Danger:** Red (#dc2626)
- **Neutrals:** Gray scale

### Typography
- **Headings:** Bold, 18-36px
- **Body:** Regular, 14-16px
- **Caption:** Regular, 12-14px

### Spacing Scale
- xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px, 2xl: 24px

## 📚 Documentation

### Web Application
- `/src` - Source code
- Main entry point: `src/main.ts`
- Configuration: `src/config/index.js`
- API clients: `src/api/`

### Mobile Application
- `/mobile/README.md` - Main documentation
- `/mobile/SETUP.md` - Detailed setup guide
- `/mobile/QUICK_REFERENCE.md` - Quick reference
- `/MOBILE_BUILD_SUMMARY.md` - Build overview

## 🔐 Security

- **API Communication:** HTTPS (production)
- **Authentication:** Handled by backend
- **CORS:** Configured for cross-origin requests
- **Data Validation:** Client and server-side
- **Input Sanitization:** Implemented

## 🚢 Deployment

### Web Application
```bash
npm run build
# Deploy dist/ folder to web server
```

### Mobile Application
```bash
cd mobile
eas build --platform ios    # Build for iOS
eas build --platform android # Build for Android
```

Requires Expo account and EAS setup. See Expo documentation for details.

## 🐛 Troubleshooting

### Web Application Issues
1. Clear cache: `npm start -- --clear`
2. Restart dev server
3. Check browser console for errors
4. Verify API URL configuration

### Mobile Application Issues
1. Check `.env.local` configuration
2. For Android emulator: Use `http://10.0.2.2:port`
3. Clear cache: `npm start -- --clear`
4. Check Expo logs in terminal

## 📞 Support

### Documentation
- [Vue.js Documentation](https://vuejs.org)
- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Vite Documentation](https://vitejs.dev)

### Community
- Vue Community: https://vuejs.org/community/
- React Native Community: https://reactnativecommunity.org
- Expo Forum: https://forums.expo.dev

## 📝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes with proper commit messages
3. Test thoroughly on both web and mobile
4. Create pull request with description
5. Await review and merge

## 📄 License

MIT License - See LICENSE file for details

## 🎯 Roadmap

### Planned Features
- [ ] Advanced storyboarding tools
- [ ] Real-time collaboration
- [ ] AI-powered suggestions
- [ ] Video preview in mobile app
- [ ] Offline mode with sync
- [ ] Advanced analytics
- [ ] Team management
- [ ] Premium features

## 📞 Contact

For questions, issues, or suggestions, please create an issue in the repository or contact the development team.

---

**Version:** 1.0.0
**Last Updated:** 2024
**Maintained by:** VisionTale Development Team
