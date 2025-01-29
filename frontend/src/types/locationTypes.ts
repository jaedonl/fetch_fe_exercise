// Coordinates interface for geographic data
export interface Coordinates {
    lat: number;
    lon: number;
}

// Location interface representing a location object
export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}
  