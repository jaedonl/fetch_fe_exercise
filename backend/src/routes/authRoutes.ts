import express, { Request, Response, NextFunction } from "express";
import { login, logout, checkAuthStatus } from "../controllers/authController";

const router = express.Router();

router.get("/status", (req, res) => {
    checkAuthStatus(req, res)
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    login(req, res, next);
});

router.post("/logout", logout);

export default router;
