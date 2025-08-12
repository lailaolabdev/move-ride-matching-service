import express from "express";
import { checkAuthorizationMiddleware } from "../middlewares";
import { handleCallStatus, registerVoiceCallToken, voiceCall } from "../controllers/voiceCall";

const router = express.Router();

router.get("/token", checkAuthorizationMiddleware, registerVoiceCallToken);
router.post("/", voiceCall);
router.post("/status", handleCallStatus);

export default router;
