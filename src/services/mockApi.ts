import type { CharacterResponse, Character } from '../types/api';

// Mock data to demonstrate functionality when the real API is not accessible
const mockCharacters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T18:48:46.250Z"
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "unknown", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T18:50:21.651Z"
  },
  {
    id: 3,
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: { name: "Earth (Replacement Dimension)", url: "" },
    location: { name: "Earth (Replacement Dimension)", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T19:09:56.428Z"
  },
  {
    id: 4,
    name: "Beth Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: { name: "Earth (Replacement Dimension)", url: "" },
    location: { name: "Earth (Replacement Dimension)", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T19:22:43.665Z"
  },
  {
    id: 5,
    name: "Jerry Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (Replacement Dimension)", url: "" },
    location: { name: "Earth (Replacement Dimension)", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T19:26:56.301Z"
  },
  {
    id: 6,
    name: "Abadango Cluster Princess",
    status: "Alive",
    species: "Alien",
    type: "",
    gender: "Female",
    origin: { name: "Abadango", url: "" },
    location: { name: "Abadango", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T19:50:28.250Z"
  },
  {
    id: 7,
    name: "Abradolf Lincler",
    status: "unknown",
    species: "Human",
    type: "Genetic experiment",
    gender: "Male",
    origin: { name: "Earth (Replacement Dimension)", url: "" },
    location: { name: "Testicle Monster Dimension", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    episode: [],
    url: "",
    created: "2017-11-04T19:59:20.523Z"
  },
  {
    id: 8,
    name: "Adjudicator Rick",
    status: "Dead",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "unknown", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    episode: [],
    url: "",
    created: "2017-11-10T12:58:05.405Z"
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getCharacters: async (page: number = 1): Promise<CharacterResponse> => {
    await delay(800); // Simulate network delay
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const characters = mockCharacters.slice(startIndex, endIndex);
    
    return {
      info: {
        count: mockCharacters.length,
        pages: Math.ceil(mockCharacters.length / pageSize),
        next: endIndex < mockCharacters.length ? `?page=${page + 1}` : null,
        prev: page > 1 ? `?page=${page - 1}` : null,
      },
      results: characters,
    };
  },

  searchCharacters: async (name: string, page: number = 1): Promise<CharacterResponse> => {
    await delay(800);
    const filteredCharacters = mockCharacters.filter(char =>
      char.name.toLowerCase().includes(name.toLowerCase())
    );
    
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const characters = filteredCharacters.slice(startIndex, endIndex);
    
    return {
      info: {
        count: filteredCharacters.length,
        pages: Math.ceil(filteredCharacters.length / pageSize),
        next: endIndex < filteredCharacters.length ? `?page=${page + 1}` : null,
        prev: page > 1 ? `?page=${page - 1}` : null,
      },
      results: characters,
    };
  },
};