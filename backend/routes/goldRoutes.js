import express from "express";
import { buyGold } from "../controllers/goldController.js";

const router = express.Router();

router.post("/buy", buyGold);

export default router;
