import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserStore {
  user: User | null;
  notifications: boolean;
  setUser: (user: User | null) => void;
  setNotifications: (enabled: boolean) => void;
  logout: () => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  notifications: true,

  setUser: (user) => set({ user }),

  setNotifications: async (enabled) => {
    set({ notifications: enabled });
    await AsyncStorage.setItem('notifications', JSON.stringify(enabled));
  },

  logout: async () => {
    set({ user: null });
    await AsyncStorage.removeItem('user_token');
    await AsyncStorage.removeItem('user');
  },

  loadUserFromStorage: async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const notifications = await AsyncStorage.getItem('notifications');
      if (user) set({ user: JSON.parse(user) });
      if (notifications) set({ notifications: JSON.parse(notifications) });
    } catch (err) {
      console.error('Failed to load user from storage:', err);
    }
  },
}));
