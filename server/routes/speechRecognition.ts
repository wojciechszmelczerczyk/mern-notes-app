import { config } from "dotenv";
import { Router } from "express";
import speechTokenController from "../controllers/speechTokenController";

config();

const router = Router();

router.get("/api/get-speech-token", speechTokenController);

export default router;
