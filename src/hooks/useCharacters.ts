import { useState, useEffect, useCallback } from 'react';
import type { Character, CharacterResponse } from '../types/api';
import { rickAndMortyApi } from '../services/rickAndMortyApi';

interface UseCharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const useCharacters = () => {
  const [state, setState] = useState<UseCharactersState>({
    characters: [],
    loading: true,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  });

  const [searchQuery, setSearchQuery] = useState('');

  const fetchCharacters = useCallback(async (page: number = 1, query: string = '') => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      let response: CharacterResponse;
      
      if (query.trim()) {
        response = await rickAndMortyApi.searchCharacters(query, page);
      } else {
        response = await rickAndMortyApi.getCharacters(page);
      }

      setState(prev => ({
        ...prev,
        characters: response.results,
        loading: false,
        pagination: {
          currentPage: page,
          totalPages: response.info.pages,
          hasNext: !!response.info.next,
          hasPrev: !!response.info.prev,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
        characters: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      }));
    }
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    fetchCharacters(1, query);
  }, [fetchCharacters]);

  const handlePageChange = useCallback((page: number) => {
    fetchCharacters(page, searchQuery);
  }, [fetchCharacters, searchQuery]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return {
    ...state,
    handleSearch,
    handlePageChange,
    refetch: () => fetchCharacters(state.pagination.currentPage, searchQuery),
  };
};