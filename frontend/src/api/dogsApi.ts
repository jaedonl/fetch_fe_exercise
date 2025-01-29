import { apiClient } from "./apiClient";
import { Dog, Match } from "../types/dogTypes";

// Fetch all dog breeds
export const getBreeds = async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>("/dogs/breeds");
    return response.data;
};

// Search for dogs based on filters
export const searchDogs = async (filters: {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: number;
    sort?: string;
}): Promise<string[]> => {
    const response = await apiClient.get<{ resultIds: string[] }>("/dogs/search", {
        params: filters,
    });
    return response.data.resultIds;
};

// Fetch full details of dogs using their IDs
export const getDogDetails = async (dogIds: string[]): Promise<Dog[]> => {
    const response = await apiClient.post<Dog[]>("/dogs", dogIds);
    return response.data;
};

// Match the best dog from favorites
export const matchDog = async (favoriteDogs: string[]): Promise<Match> => {
    const response = await apiClient.post<Match>("/dogs/match", favoriteDogs);
    return response.data;
};
