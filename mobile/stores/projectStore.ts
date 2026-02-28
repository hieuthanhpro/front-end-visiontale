import { create } from 'zustand';
import { projectAPI } from '@/services/api/projectAPI';

export interface Project {
  id: string;
  name: string;
  description?: string;
  template?: string;
  createdAt: string;
  updatedAt: string;
  status?: 'draft' | 'published' | 'archived';
}

interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchProjects: () => Promise<void>;
  createProject: (data: { name: string; template?: string }) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  addProject: (project: Project) => void;
  clearProjects: () => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  setProjects: (projects) => set({ projects }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const data = await projectAPI.getProjects();
      set({ projects: data });
    } catch (err) {
      set({ error: 'Failed to fetch projects' });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (data) => {
    try {
      const newProject = await projectAPI.createProject(data);
      const { projects } = get();
      set({ projects: [newProject, ...projects] });
      return newProject;
    } catch (err) {
      set({ error: 'Failed to create project' });
      throw err;
    }
  },

  deleteProject: async (id) => {
    try {
      await projectAPI.deleteProject(id);
      const { projects } = get();
      set({ projects: projects.filter((p) => p.id !== id) });
    } catch (err) {
      set({ error: 'Failed to delete project' });
      throw err;
    }
  },

  updateProject: async (id, data) => {
    try {
      const updated = await projectAPI.updateProject(id, data);
      const { projects } = get();
      set({
        projects: projects.map((p) => (p.id === id ? updated : p)),
      });
    } catch (err) {
      set({ error: 'Failed to update project' });
      throw err;
    }
  },

  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),

  clearProjects: () => set({ projects: [], error: null }),
}));
