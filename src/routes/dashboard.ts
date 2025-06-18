import express from "express";
import { summaryRevenueCallTaxi, scriptToUpdateCountry, summaryRideCallTaxi, getCallingTransaction, getTopTenDriver, getTopTenPassenger } from "../controllers/dashboard";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.get("/summary/revenue", checkAuthorizationMiddleware, summaryRevenueCallTaxi); // Revenue Overview
router.get("/summary/call", checkAuthorizationMiddleware, summaryRideCallTaxi); // Ride Summary 
router.get("/summary/calling-transaction", checkAuthorizationMiddleware, getCallingTransaction); // Ride Summary 
router.get("/summary/top-driver", checkAuthorizationMiddleware, getTopTenDriver);
router.get("/summary/top-passenger", checkAuthorizationMiddleware, getTopTenPassenger);
router.post("/script/update", scriptToUpdateCountry);

export default router