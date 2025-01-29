import axios from "axios";
import { BASE_API_URL } from "../config";

export const apiClient = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true, // Ensures cookies are sent
    headers: {
        "Content-Type": "application/json",
    },
});
