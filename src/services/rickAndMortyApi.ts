import type { CharacterResponse, Character } from '../types/api';
import { mockApi } from './mockApi';

const BASE_URL = 'https://rickandmortyapi.com/api';

const shouldUseMockApi = () => {
  // Use mock API in development/testing environments or when the real API fails
  return import.meta.env.MODE === 'development' || typeof window === 'undefined';
};

export const rickAndMortyApi = {
  getCharacters: async (page: number = 1): Promise<CharacterResponse> => {
    try {
      if (shouldUseMockApi()) {
        return await mockApi.getCharacters(page);
      }
      
      const response = await fetch(`${BASE_URL}/character?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn('Real API failed, falling back to mock data:', error);
      return await mockApi.getCharacters(page);
    }
  },

  getCharacter: async (id: number): Promise<Character> => {
    try {
      if (shouldUseMockApi()) {
        const result = await mockApi.getCharacters(1);
        const character = result.results.find(c => c.id === id);
        if (!character) {
          throw new Error(`Character ${id} not found`);
        }
        return character;
      }
      
      const response = await fetch(`${BASE_URL}/character/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn('Real API failed, falling back to mock data:', error);
      const result = await mockApi.getCharacters(1);
      const character = result.results.find(c => c.id === id);
      if (!character) {
        throw new Error(`Character ${id} not found`);
      }
      return character;
    }
  },

  searchCharacters: async (name: string, page: number = 1): Promise<CharacterResponse> => {
    try {
      if (shouldUseMockApi()) {
        return await mockApi.searchCharacters(name, page);
      }
      
      const response = await fetch(`${BASE_URL}/character?name=${name}&page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.warn('Real API failed, falling back to mock data:', error);
      return await mockApi.searchCharacters(name, page);
    }
  }
};