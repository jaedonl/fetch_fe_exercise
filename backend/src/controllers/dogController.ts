import { Request, Response } from "express";
import { apiClient } from "../utils/apiClient";
import { Dog, Match } from "../models/dog";

export const getBreeds = async (_req: Request, res: Response) => {
    try {
        const response = await apiClient.get<string[]>("/dogs/breeds");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch breeds" });
    }
};

export const searchDogs = async (req: Request, res: Response) => {
    try {
        const response = await apiClient.get("/dogs/search", { params: req.query });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to search dogs" });
    }
};

export const getDogs = async (req: Request, res: Response) => {
    try {
        const dogIds: string[] = req.body;
        const response = await apiClient.post<Dog[]>("/dogs", dogIds);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch dog details" });
    }
};

export const matchDogs = async (req: Request, res: Response) => {
    try {
        const dogIds: string[] = req.body;
        const response = await apiClient.post<Match>("/dogs/match", dogIds);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to match dogs" });
    }
};
