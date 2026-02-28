# VisionTale Mobile App - Visual Overview & Architecture

## 🎯 What You Have

A **complete React Native mobile application** using Expo and Expo Router, ready to run on any iPhone, Android, or Expo Go client.

---

## 🏗 Application Architecture

```
┌─────────────────────────────────────────────────────┐
│          VisionTale Mobile App (Expo)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │        Expo Router (File-based routing)      │  │
│  ├──────────────────────────────────────────────┤  │
│  │                                              │  │
│  │  ┌─────────────────────────────────────┐    │  │
│  │  │     (tabs) - Bottom Tab Navigator   │    │  │
│  │  ├─────────────────────────────────────┤    │  │
│  │  │ Projects │ Library │ Storyboard │ Profile │  │
│  │  │  Screen  │ Screen  │  Screen   │ Screen  │  │
│  │  └─────────────────────────────────────┘    │  │
│  │                                              │  │
│  │  ┌─────────────────────────────────────┐    │  │
│  │  │    /project/[id] - Detail Screen    │    │  │
│  │  │    /settings - Settings Screen      │    │  │
│  │  └─────────────────────────────────────┘    │  │
│  │                                              │  │
│  └──────────────────────────────────────────────┘  │
│                         ↓                          │
│  ┌──────────────────────────────────────────────┐  │
│  │    State Management (Zustand Stores)        │  │
│  ├──────────────────────────────────────────────┤  │
│  │ • projectStore   - Projects & CRUD          │  │
│  │ • libraryStore   - Assets & Search          │  │
│  │ • userStore      - Auth & Preferences       │  │
│  └──────────────────────────────────────────────┘  │
│                         ↓                          │
│  ┌──────────────────────────────────────────────┐  │
│  │      API Services (Axios HTTP Client)       │  │
│  ├──────────────────────────────────────────────┤  │
│  │ • projectAPI.ts  - /api/projects endpoints  │  │
│  │ • entityAPI.ts   - /api/entities endpoints  │  │
│  └──────────────────────────────────────────────┘  │
│                         ↓                          │
│  ┌──────────────────────────────────────────────┐  │
│  │        Backend API Server (Your API)        │  │
│  ├──────────────────────────────────────────────┤  │
│  │ GET/POST/PUT/DELETE /api/projects           │  │
│  │ GET/POST/PUT/DELETE /api/entities           │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📱 Screen Navigation Map

```
                    ┌─────────────────┐
                    │   Root Layout   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  (tabs) Layout  │
                    │  Bottom Tabs    │
                    └────────┬────────┘
                             │
        ┌────────┬───────────┼──────────┬────────┐
        │        │           │          │        │
   ┌────▼──┐ ┌──▼───┐ ┌─────▼──┐ ┌────▼──┐  ┌──▼─────┐
   │Projects│ │Library│ │Storyboard│ │Profile│  │Settings│
   │ Tab    │ │ Tab   │ │  Tab     │ │ Tab   │  │(Modal) │
   └────┬──┘ └──────┘ └──────────┘ └────┬──┘  └────────┘
        │                               │
        └──────────┬────────────────────┘
                   │
        ┌──────────▼──────────┐
        │ project/[id]        │
        │ Dynamic Detail      │
        │ (Modal/Push)        │
        └─────────────────────┘
```

---

## 📂 File Organization

### **App Structure (Screens)**

```
/app
├── _layout.tsx                    # Root layout, navigation setup
├── settings.tsx                   # Settings screen (modal)
├── (tabs)/
│   ├── _layout.tsx               # Tab navigator configuration
│   ├── index.tsx                 # Projects screen
│   ├── library.tsx               # Library screen
│   ├── storyboard.tsx            # Storyboard screen
│   └── profile.tsx               # Profile screen
└── project/
    └── [id].tsx                  # Project detail (dynamic)
```

### **Services (API Integration)**

```
/services/api
├── projectAPI.ts                 # REST calls for projects
│   ├── getProjects()
│   ├── getProject(id)
│   ├── createProject(data)
│   ├── updateProject(id, data)
│   └── deleteProject(id)
│
└── entityAPI.ts                  # REST calls for entities
    ├── getEntities(type)
    ├── getEntity(id)
    ├── createEntity(data)
    ├── updateEntity(id, data)
    └── deleteEntity(id)
```

### **State Management (Zustand)**

```
/stores
├── projectStore.ts               # Project state & actions
│   ├── projects: Project[]
│   ├── loading: boolean
│   ├── fetchProjects()
│   ├── createProject()
│   ├── updateProject()
│   └── deleteProject()
│
├── libraryStore.ts               # Asset library state
│   ├── assets: Entity[]
│   ├── fetchAssets()
│   ├── addAsset()
│   ├── deleteAsset()
│   └── searchAssets()
│
└── userStore.ts                  # User state & auth
    ├── user: User | null
    ├── notifications: boolean
    ├── setUser()
    ├── setNotifications()
    ├── logout()
    └── loadUserFromStorage()
```

### **Type Definitions**

```
/types
└── index.ts
    ├── Project interface
    ├── Entity interface
    ├── Scene interface
    ├── Storyboard interface
    ├── User interface
    ├── ApiResponse interface
    └── RootStackParamList type
```

---

## 🔄 Data Flow Example: Creating a Project

```
User taps "Create Project" button
        ↓
CreateScreen component renders
        ↓
User enters project name + selects template
        ↓
User taps "Create Project" button
        ↓
Call: useProjectStore().createProject(data)
        ↓
Zustand action: projectStore.createProject()
        ↓
Call: projectAPI.createProject(data)
        ↓
Axios makes POST request to /api/projects
        ↓
Backend creates project, returns data
        ↓
Zustand store updates: projects = [newProject, ...projects]
        ↓
Component re-renders with new project
        ↓
Navigation to project detail screen
        ↓
Display project details
```

---

## 🎬 Screen Features Breakdown

### **Projects Screen (index.tsx)**
```
┌─────────────────────────────────┐
│   Projects                      │
├─────────────────────────────────┤
│                                 │
│  ┌────────────────────────────┐ │
│  │ Project Card 1             │ │
│  │ • Thumbnail                │ │
│  │ • Project name             │ │
│  │ • Created date             │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌────────────────────────────┐ │
│  │ Project Card 2             │ │
│  │ • Thumbnail                │ │
│  │ • Project name             │ │
│  │ • Created date             │ │
│  └────────────────────────────┘ │
│                                 │
│              [+] FAB button      │
│              Create Project      │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- View all projects in grid
- Pull-to-refresh
- Tap to view details
- FAB button to create new
- Empty state with CTA

### **Library Screen (library.tsx)**
```
┌─────────────────────────────────┐
│   Library                       │
├─────────────────────────────────┤
│ [Search box]                    │
├─────────────────────────────────┤
│                                 │
│ [Char] [Loc] [Prop] [Effect]   │ ← Tabs
│                                 │
│  ┌────────────────────────────┐ │
│  │ Asset 1                    │ │
│  │ • Icon                     │ │
│  │ • Name                     │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌────────────────────────────┐ │
│  │ Asset 2                    │ │
│  │ • Icon                     │ │
│  │ • Name                     │ │
│  └────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- Filter by type (Character, Location, Prop, Effect)
- Search functionality
- Grid view of assets
- Tap to select asset
- Pull-to-refresh

### **Storyboard Screen (storyboard.tsx)**
```
┌─────────────────────────────────┐
│   Storyboard                    │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Scene 1                     │ │
│ │ ┌──────────────────────┐    │ │
│ │ │[Scene thumbnail]     │    │ │
│ │ ├──────────────────────┤    │ │
│ │ │ Duration: 5s         │[X] │ │
│ │ └──────────────────────┘    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Scene 2                     │ │
│ │ ┌──────────────────────┐    │ │
│ │ │[Scene thumbnail]     │    │ │
│ │ ├──────────────────────┤    │ │
│ │ │ Duration: 3s         │[X] │ │
│ │ └──────────────────────┘    │ │
│ └─────────────────────────────┘ │
│                                 │
│              [+] FAB button      │
│              Add Scene           │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- List of scenes
- Scene preview/thumbnail
- Duration display
- Delete scene button
- Add new scene FAB
- Drag-to-reorder (can be added)

### **Profile Screen (profile.tsx)**
```
┌─────────────────────────────────┐
│   Profile                       │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ [Avatar]                    │ │
│ │ User Name                   │ │
│ │ user@example.com            │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Stats                           │
│ ┌────────┬─────────┬──────────┐ │
│ │ 5      │ 12      │ 24       │ │
│ │Projects│ Videos  │ Hours    │ │
│ └────────┴─────────┴──────────┘ │
├─────────────────────────────────┤
│ ☑ Notifications Enabled         │
│ Settings › Privacy › About      │
├─────────────────────────────────┤
│ [Logout]                        │
│                                 │
└─────────────────────────────────┘
```

**Features:**
- User profile info
- Statistics display
- Settings menu
- Notification toggle
- Logout button

---

## 🔐 API Contract

### **Projects Endpoints**

```typescript
// GET /api/projects
Response: Project[]

// POST /api/projects
Body: { name: string, template?: string }
Response: Project

// GET /api/projects/:id
Response: Project

// PUT /api/projects/:id
Body: Partial<Project>
Response: Project

// DELETE /api/projects/:id
Response: void
```

### **Entities Endpoints**

```typescript
// GET /api/entities?type=character
Response: Entity[]

// POST /api/entities
Body: { name, type, category, description, ... }
Response: Entity

// GET /api/entities/:id
Response: Entity

// PUT /api/entities/:id
Body: Partial<Entity>
Response: Entity

// DELETE /api/entities/:id
Response: void
```

---

## 🚀 Deployment Paths

```
┌──────────────────────────────────────────┐
│      Your Local Machine                  │
│  (npm start → Expo development server)   │
│           ↓                              │
│  ┌────────────────────────────────┐      │
│  │ Expo Go App (on your phone)    │      │
│  │ • Development builds instantly │      │
│  │ • Perfect for testing          │      │
│  └────────────────────────────────┘      │
└──────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────┐
│    Build for Production                  │
│    (npm run build:ios/android)           │
│           ↓                              │
│  ┌────────────────────────────────┐      │
│  │ iOS (App Store)                │      │
│  │ • .ipa file                    │      │
│  │ • Full app store deployment    │      │
│  └────────────────────────────────┘      │
│           +                              │
│  ┌────────────────────────────────┐      │
│  │ Android (Google Play)          │      │
│  │ • .aab file                    │      │
│  │ • Full play store deployment   │      │
│  └────────────────────────────────┘      │
└──────────────────────────────────────────┘
```

---

## 📊 Technology Stack Diagram

```
┌──────────────────────────────────────────────────────────┐
│                   React Native                           │
│              (Mobile framework)                          │
├──────────────────────────────────────────────────────────┤
│                   Expo 52.0.0+                           │
│        (Development platform & build system)            │
├──────────────────────────────────────────────────────────┤
│  ┌──────────┬──────────────┬──────────┬──────────────┐  │
│  │ Expo     │ React Native │ React    │ TypeScript   │  │
│  │ Router   │ Reanimated   │ 18.2.0   │ 5.3.0+       │  │
│  └──────────┴──────────────┴──────────┴──────────────┘  │
├──────────────────────────────────────────────────────────┤
│  ┌──────────────┬──────────────┬──────────────────────┐  │
│  │ Zustand      │ Axios        │ Async Storage        │  │
│  │ State Mgmt   │ HTTP Client  │ Local Persistence    │  │
│  └──────────────┴──────────────┴──────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│                  REST API (Your Backend)                │
└──────────────────────────────────────────────────────────┘
```

---

## ✨ Summary

You now have a **complete, production-ready mobile app** with:

| Aspect | Status |
|--------|--------|
| File-based routing | ✅ Complete |
| State management | ✅ Complete |
| API integration | ✅ Complete |
| 4 main screens | ✅ Complete |
| Type safety | ✅ Complete |
| Responsive design | ✅ Complete |
| Ready to deploy | ✅ Complete |

**Just run `npm start` and scan the QR code!** 🎉

---

## 🎯 Next Steps

1. Navigate to `/mobile` directory
2. Run `npm install`
3. Create `.env.local` from `.env.example`
4. Run `npm start`
5. Install Expo Go on your phone
6. Scan the QR code
7. Start exploring!

**Happy building!** 🚀
