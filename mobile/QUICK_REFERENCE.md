# VisionTale Mobile - Quick Reference Guide

## 🚀 Getting Started (Copy-Paste)

```bash
# 1. Install dependencies
cd mobile && npm install

# 2. Set up environment
cp .env.example .env.local

# 3. Start development
npm start

# 4. Open in Expo Go (scan QR) or:
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web Browser
```

## 📂 File Organization

**Screens/Pages:**
- `app/(tabs)/index.tsx` - Projects list
- `app/(tabs)/library.tsx` - Entity browser
- `app/(tabs)/storyboard.tsx` - Storyboard view
- `app/(tabs)/profile.tsx` - User profile
- `app/project/[id].tsx` - Project details
- `app/settings.tsx` - Settings modal

**Core Files:**
- `app/_layout.tsx` - Root navigation
- `app/(tabs)/_layout.tsx` - Tab configuration

**Business Logic:**
- `services/api/projectAPI.ts` - Project API
- `services/api/entityAPI.ts` - Entity API
- `stores/projectStore.ts` - Project state

**UI Components:**
- `components/Button.tsx` - Button component
- `components/Card.tsx` - Card component

**Utilities:**
- `utils/formatters.ts` - Date, time, size formatting
- `utils/validators.ts` - Form validation
- `hooks/useApi.ts` - API data fetching

## 🎨 Colors Quick Reference

```typescript
import { COLORS } from '@/constants/colors';

COLORS.primary          // #2563eb
COLORS.secondary        // #10b981
COLORS.danger          // #dc2626
COLORS.warning         // #f59e0b
COLORS.gray[500]       // #6b7280
COLORS.white           // #ffffff
```

## 📐 Spacing Reference

```typescript
import { SPACING } from '@/constants/spacing';

SPACING.xs   // 4
SPACING.sm   // 8
SPACING.md   // 12
SPACING.lg   // 16
SPACING.xl   // 20
SPACING.2xl  // 24
```

## 🔌 Common API Patterns

### Fetch Projects
```typescript
import { projectAPI } from '@/services/api/projectAPI';
import { useProjectStore } from '@/stores/projectStore';

const getProjects = async () => {
  const { setProjects, setLoading } = useProjectStore();
  setLoading(true);
  try {
    const data = await projectAPI.getProjects();
    setProjects(data);
  } finally {
    setLoading(false);
  }
};
```

### Use API Hook
```typescript
import { useApi } from '@/hooks/useApi';
import { projectAPI } from '@/services/api/projectAPI';

const { data, loading, error, refetch } = useApi(
  () => projectAPI.getProjects()
);
```

### Create Entity
```typescript
import { entityAPI } from '@/services/api/entityAPI';

await entityAPI.createEntity('character', {
  name: 'Hero',
  description: 'Main character'
});
```

## 🧩 Component Usage

### Button Component
```typescript
import { Button } from '@/components/Button';

<Button
  onPress={() => handlePress()}
  title="Click Me"
  variant="primary"  // 'primary' | 'secondary' | 'danger'
/>
```

### Card Component
```typescript
import { Card } from '@/components/Card';

<Card>
  <Text>Content here</Text>
</Card>
```

## 🗂️ State Management with Zustand

```typescript
import { useProjectStore } from '@/stores/projectStore';

export function MyComponent() {
  const { projects, loading, addProject } = useProjectStore();
  
  const handleAdd = () => {
    addProject({ id: '1', name: 'New', ... });
  };
  
  return <View>...</View>;
}
```

## 📱 Navigation Patterns

### Push Navigation
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/project/123');
router.push('/settings');
```

### Go Back
```typescript
router.back();
```

### Replace Navigation
```typescript
router.replace('/project/new');
```

## ✅ Form Validation

```typescript
import { validateProjectName, isValidEmail } from '@/utils/validators';

// Validate project name
const result = validateProjectName('My Project');
if (!result.isValid) {
  console.error(result.message);
}

// Validate email
if (isValidEmail('user@example.com')) {
  // Valid
}
```

## 🎯 Common Patterns

### Loading State
```typescript
import { ActivityIndicator } from 'react-native';

{loading ? (
  <ActivityIndicator size="large" color="#2563eb" />
) : (
  <View>{/* content */}</View>
)}
```

### Empty State
```typescript
{items.length === 0 ? (
  <View style={{ alignItems: 'center', padding: 24 }}>
    <Ionicons name="inbox" size={64} color="#d1d5db" />
    <Text>No items found</Text>
  </View>
) : (
  <View>{/* list */}</View>
)}
```

### Error Display
```typescript
{error && (
  <View style={{ backgroundColor: '#fee2e2', padding: 12 }}>
    <Text style={{ color: '#dc2626' }}>
      {error.message}
    </Text>
  </View>
)}
```

### Search Filter
```typescript
const [query, setQuery] = useState('');
const filtered = items.filter(item =>
  item.name.toLowerCase().includes(query.toLowerCase())
);
```

## 🔧 Debugging

### Log Data
```typescript
console.log('[v0] Data received:', data);
console.log('[v0] Error:', error.message);
```

### React DevTools
- Press 'j' in Expo Go to open DevTools
- Available on physical devices and emulators

### Clear Cache
```bash
npm start -- --clear
```

## 📝 Type Definitions

### Project Type
```typescript
import { Project } from '@/types';

const project: Project = {
  id: '1',
  name: 'My Project',
  description: 'Description',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  status: 'active'
};
```

### Entity Type
```typescript
import { Entity } from '@/types';

const entity: Entity = {
  id: '1',
  name: 'Character',
  type: 'character',
  category: 'Hero',
  description: 'Main character'
};
```

## 🎬 Real-World Examples

### Fetch and Display Projects
```typescript
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { projectAPI } from '@/services/api/projectAPI';

export function ProjectsList() {
  const { data: projects, loading, error } = useApi(
    () => projectAPI.getProjects()
  );

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={projects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

### Create Project Form
```typescript
import { useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { projectAPI } from '@/services/api/projectAPI';
import { validateProjectName } from '@/utils/validators';

export function CreateProjectForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const { isValid, message } = validateProjectName(name);
    
    if (!isValid) {
      Alert.alert('Validation Error', message);
      return;
    }

    setLoading(true);
    try {
      await projectAPI.createProject({ name });
      Alert.alert('Success', 'Project created!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Project name"
      />
      <Button
        onPress={handleCreate}
        title="Create"
        disabled={loading}
      />
    </View>
  );
}
```

## 🌐 Environment Configuration

```bash
# .env.local
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api

# For Android Emulator:
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:8080/api

# For physical device:
EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:8080/api
```

## 📚 Useful Links

- [Expo Docs](https://docs.expo.dev)
- [React Native](https://reactnative.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [Ionicons](https://ionic.io/ionicons)
- [Axios](https://axios-http.com)

## ⚡ Performance Tips

1. Use `FlatList` instead of `ScrollView` for long lists
2. Memoize components with `memo` to prevent re-renders
3. Use `useMemo` for expensive calculations
4. Lazy load images and data
5. Keep state updates minimal and focused

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| API not responding | Check `.env.local` URL, restart backend |
| Module not found | Run `npm install`, clear cache |
| Blank screen | Check terminal logs, restart Expo |
| Keyboard overlapping | Add `keyboardVerticalOffset` to ScrollView |
| Slow performance | Profile with DevTools, optimize renders |

---

**Pro Tip:** Bookmark this guide for quick reference during development! 📌
