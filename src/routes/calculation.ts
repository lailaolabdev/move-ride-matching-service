import express from "express";
import { calculateUserDistanceAndDuration } from "../controllers/calculation"

const router = express.Router();

router.post(
    "/distance",
    // checkAuthorizationMiddleware,
    calculateUserDistanceAndDuration,
);

export default router