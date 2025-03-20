import express from "express";
import {
    driverUpdateStatus,
    createCallTaxi,
    getDriverCallTaxis,
    getUserCallTaxis,
    updateCallTaxis,
    gettotalRide,
    getTotalDistance,
    getThelastRide,
    getRideHistory,
    
} from "../controllers/callTaxi"
import { validateParamID } from "../utils/validateParamId";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createCallTaxi);

router.get("/user-history", checkAuthorizationMiddleware, getUserCallTaxis);

// get total  ride
router.get("/total-ride", checkAuthorizationMiddleware, gettotalRide);

// get total distance ride
router.get("/total-distance", checkAuthorizationMiddleware, getTotalDistance);

// get total distance ride
router.get("/ride-history", checkAuthorizationMiddleware, getRideHistory);

// get total the last ride
router.get("/last-ride", checkAuthorizationMiddleware, getThelastRide);

router.get("/driver-history", checkAuthorizationMiddleware, getDriverCallTaxis);

router.put("/:id", validateParamID, checkAuthorizationMiddleware, updateCallTaxis,);

router.put("/driver-confirm/:id", checkAuthorizationMiddleware, driverUpdateStatus,);


export default router;
