import { apiClient } from "./apiClient";
import { Location } from "../types/locationTypes";

// Get location details by ZIP codes
export const getLocationsByZip = async (zipCodes: string[]): Promise<Location[]> => {
    const response = await apiClient.post<Location[]>("/locations", zipCodes);
    return response.data;
};

// Search locations based on filters (city, state, etc.)
export const searchLocations = async (filters: {
    city?: string;
    states?: string[];
    geoBoundingBox?: {
        top?: { lat: number; lon: number };
        left?: { lat: number; lon: number };
        bottom?: { lat: number; lon: number };
        right?: { lat: number; lon: number };
        bottom_left?: { lat: number; lon: number };
        top_left?: { lat: number; lon: number };
    };
    size?: number;
    from?: number;
}): Promise<{ results: Location[]; total: number }> => {
    const response = await apiClient.post<{ results: Location[]; total: number }>("/locations/search", filters);
    return response.data;
};
