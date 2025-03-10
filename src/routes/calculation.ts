import express from "express";
import { calculateUserDistanceAndDuration, calculateDriverDistanceAndDuration } from "../controllers/calculation"
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/passenger", checkAuthorizationMiddleware, calculateUserDistanceAndDuration);

router.post("/driver", checkAuthorizationMiddleware, calculateDriverDistanceAndDuration);

export default router