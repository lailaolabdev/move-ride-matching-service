import express from "express";
import { calculateUserDistanceAndDuration } from "../controllers/calculation"
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post(
    "/",
    checkAuthorizationMiddleware,
    calculateUserDistanceAndDuration,
);

export default router