import { create } from 'zustand';
import { entityAPI } from '@/services/api/entityAPI';

export interface Entity {
  id: string;
  name: string;
  type: 'character' | 'location' | 'prop' | 'effect';
  category?: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
}

interface LibraryStore {
  assets: Entity[];
  loading: boolean;
  error: string | null;
  fetchAssets: () => Promise<void>;
  addAsset: (asset: Omit<Entity, 'id' | 'createdAt'>) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
  searchAssets: (query: string) => Entity[];
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  assets: [],
  loading: false,
  error: null,

  fetchAssets: async () => {
    set({ loading: true, error: null });
    try {
      const characters = await entityAPI.getEntities('character');
      const locations = await entityAPI.getEntities('location');
      const props = await entityAPI.getEntities('prop');
      const effects = await entityAPI.getEntities('effect');
      set({ assets: [...characters, ...locations, ...props, ...effects] });
    } catch (err) {
      set({ error: 'Failed to fetch assets' });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  addAsset: async (asset) => {
    try {
      const newAsset = await entityAPI.createEntity(asset);
      const { assets } = get();
      set({ assets: [newAsset, ...assets] });
    } catch (err) {
      set({ error: 'Failed to add asset' });
      throw err;
    }
  },

  deleteAsset: async (id) => {
    try {
      await entityAPI.deleteEntity(id);
      const { assets } = get();
      set({ assets: assets.filter((a) => a.id !== id) });
    } catch (err) {
      set({ error: 'Failed to delete asset' });
      throw err;
    }
  },

  searchAssets: (query) => {
    const { assets } = get();
    return assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(query.toLowerCase()) ||
        asset.category?.toLowerCase().includes(query.toLowerCase())
    );
  },
}));
