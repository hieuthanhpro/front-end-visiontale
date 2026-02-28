export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'archived' | 'completed';
  thumbnail?: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'character' | 'location' | 'prop' | 'effect';
  category: string;
  description?: string;
  thumbnail?: string;
  metadata?: Record<string, any>;
}

export interface Scene {
  id: string;
  projectId: string;
  name: string;
  order: number;
  duration: number;
  entities: Entity[];
  content?: string;
}

export interface Storyboard {
  id: string;
  projectId: string;
  title: string;
  scenes: Scene[];
  status: 'draft' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
