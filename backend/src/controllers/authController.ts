import { NextFunction, Request, Response } from "express";
import { apiClient } from "../utils/apiClient";

export const checkAuthStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        // If the user has a valid session, return authenticated: true
        if (req.cookies["fetch-access-token"]) {
            res.status(200).json({ authenticated: true });
            return;
        }
        res.status(401).json({ authenticated: false });
    } catch (error) {
        console.error("Auth Status Check Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
    // Otherwise, return authenticated: false
    res.status(401).json({ authenticated: false });
};


export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email } = req.body;
        const response = await apiClient.post("/auth/login", { name, email });

        const token = response.headers["set-cookie"]?.find((cookie: string) => cookie.includes("fetch-access-token"));

        if (!token) {
            res.status(401).json({ error: "Authentication failed" });
            return;
        }

        const tokenValue = token.split(";")[0].split("=")[1];

        res.cookie("fetch-access-token", tokenValue, {
            httpOnly: true,
            secure: true,
            sameSite: "none", 
            path: "/",
            domain: "jaedon-fetch-exercise.netlify.app"
        });

        res.status(200).json({ message: "Login successful" });

        // res.json(200).json({ token });
    } catch (error) {
        // res.status(500).json({ error: "Login failed" });
        console.error("login Error: ", error)
        next(error);
    }
};

export const logout = async (_req: Request, res: Response) => {
    await apiClient.post("/auth/logout");
    res.clearCookie("fetch-access-token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({ message: "Logged out" });
};
