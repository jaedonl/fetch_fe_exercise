import { apiClient } from "./apiClient";

export const login = async (name: string, email: string) => {
    await apiClient.post<{ token: string }>("/auth/login", { name, email });
};



export const logout = async () => {
    await apiClient.post("/auth/logout");
};

export const checkAuthStatus = async (): Promise<boolean> => {
    try {
      await apiClient.get("/dogs/breeds");
      return true;
    } catch {
      return false; 
    }
};