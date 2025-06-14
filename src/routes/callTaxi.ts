import express from "express";
import {
  driverUpdateStatus,
  createCallTaxi,
  getDriverCallTaxis,
  getUserCallTaxis,
  updateCallTaxis,
  gettotalRide,
  getRideHistory,
  callTaxiTotalPrice,
  createDriverComplain,
  createPassengerComplain,
  getPassengerComplainById,
  getCallTaxiById,
  getCallTaxis,
  checkCallTaxiStatus,
  getRideHistoryDetailById,
  getDriverRideHistoryDetailById,
  reportPassenger
} from "../controllers/callTaxi";
import { validateParamID } from "../utils/validateParamId";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post(
  "/",
  checkAuthorizationMiddleware,
  createCallTaxi
);

router.get("/:id", getCallTaxiById);

router.get(
  "/",
  checkAuthorizationMiddleware,
  getCallTaxis
);

router.get(
  "/check/status",
  checkAuthorizationMiddleware,
  checkCallTaxiStatus
);

router.get(
  "/user-history",
  checkAuthorizationMiddleware,
  getUserCallTaxis
);

// driver complain passenger by call taxi id
router.put(
  "/driver-complain/:id",
  checkAuthorizationMiddleware,
  createDriverComplain
);

// passenger complain driver by call taxi id
router.put(
  "/passenger-complain/:id",
  checkAuthorizationMiddleware,
  createPassengerComplain
);

// get passenger complain by passenger id
router.get(
  "/passenger-complain/:id",
  checkAuthorizationMiddleware,
  getPassengerComplainById
);

// get passenger total ride
router.get(
  "/total-ride/:id",
  checkAuthorizationMiddleware,
  gettotalRide
);

// using
// get ride history detail by passenger id
router.get(
  "/ride-history-detail/:id",
  checkAuthorizationMiddleware,
  getRideHistoryDetailById
);

// using
// get ride history detail by passenger id
router.get(
  "/driver/ride-history",
  checkAuthorizationMiddleware,
  getDriverRideHistoryDetailById
);

// get total distance ride
router.get(
  "/ride-history/:id",
  checkAuthorizationMiddleware,
  getRideHistory
);

// Get all driver's order 
router.get(
  "/calling-taxi-history",
  checkAuthorizationMiddleware,
  getDriverCallTaxis
);

// Update type and status by calling taxi id
router.put(
  "/:id",
  validateParamID,
  checkAuthorizationMiddleware,
  updateCallTaxis
);

// Driver update order processing status
router.put(
  "/driver-confirm/:id",
  checkAuthorizationMiddleware,
  driverUpdateStatus
);

router.get(
  "/total-price",
  checkAuthorizationMiddleware,
  callTaxiTotalPrice
);

router.get(
  "/report-passenger/:id",
  checkAuthorizationMiddleware,
  reportPassenger
)

export default router;
