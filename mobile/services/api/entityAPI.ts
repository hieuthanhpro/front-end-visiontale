import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

type EntityType = 'character' | 'location' | 'prop' | 'effect';

class EntityAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  async getEntities(type: EntityType) {
    try {
      const response = await this.api.get(`/entities`, {
        params: { type },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch entities:', error);
      throw error;
    }
  }

  async getEntity(id: string) {
    try {
      const response = await this.api.get(`/entities/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch entity:', error);
      throw error;
    }
  }

  async createEntity(type: EntityType, data: any) {
    try {
      const response = await this.api.post(`/entities`, {
        ...data,
        type,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create entity:', error);
      throw error;
    }
  }

  async updateEntity(id: string, data: any) {
    try {
      const response = await this.api.put(`/entities/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update entity:', error);
      throw error;
    }
  }

  async deleteEntity(id: string) {
    try {
      const response = await this.api.delete(`/entities/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete entity:', error);
      throw error;
    }
  }
}

export const entityAPI = new EntityAPI();
