import { apiClient } from "./apiClient";

export const login = async (name: string, email: string) => {
    const response = await apiClient.post<{ token: string }>("/auth/login", { name, email });
    localStorage.setItem("authToken", response.data.token);
};

// export const logout = () => {
//     return apiClient.post("/auth/logout");
// };

export const logout = () => {
    localStorage.removeItem("authToken");
};

export const checkAuthStatus = async (): Promise<boolean> => {
    try {
        const response = await apiClient.get("/auth/status");
        return response.data.authenticated;
    } catch {
        return false; // If request fails (401), return false
    }
};