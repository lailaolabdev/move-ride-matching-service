import express from "express";
import { calculateUserDistanceAndDuration } from "../controllers/calculation"

const router = express.Router();

router.post(
    "/",
    // checkAuthorizationMiddleware,
    calculateUserDistanceAndDuration,
);

export default router