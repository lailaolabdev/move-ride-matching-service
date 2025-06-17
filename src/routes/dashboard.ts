import express from "express";
import { summaryRevenueCallTaxi, scriptToUpdateCountry } from "../controllers/dashboard";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.get("/summary/revenue", checkAuthorizationMiddleware, summaryRevenueCallTaxi);
router.post("/script/update", scriptToUpdateCountry);

export default router