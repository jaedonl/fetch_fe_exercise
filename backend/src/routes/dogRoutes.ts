import express from "express";
import { getBreeds, searchDogs, getDogs, matchDogs } from "../controllers/dogController";

const router = express.Router();

router.get("/breeds", getBreeds);
router.get("/search", searchDogs);
router.post("/", getDogs);
router.post("/match", matchDogs);

export default router;
