import express from "express";
import { getLocations, searchLocations } from "../controllers/locationController";

const router = express.Router();

router.post("/", getLocations);
router.post("/search", searchLocations);

export default router;
