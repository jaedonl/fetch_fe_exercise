import { Request, Response } from "express";
import { apiClient } from "../utils/apiClient";
import { Location } from "../models/location";

export const getLocations = async (req: Request, res: Response) => {
    try {
        const zipCodes: string[] = req.body;
        const response = await apiClient.post<Location[]>("/locations", zipCodes);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch locations" });
    }
};

export const searchLocations = async (req: Request, res: Response) => {
    try {
        const response = await apiClient.post("/locations/search", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to search locations" });
    }
};
