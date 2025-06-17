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
  reportPassenger,
  travelHistory,
  getCommentAndRating,
  getTotalDriverIncome
} from "../controllers/callTaxi";
import { validateParamID } from "../utils/validateParamId";
import { checkAuthorizationMiddleware } from "../middlewares";
import { getTotalDriverIncomeService } from "../services/callTaxi";

const router = express.Router();

router.post(
  "/",
  checkAuthorizationMiddleware,
  createCallTaxi
);

// Admin also use this route for detail
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

// using
// get ride history detail by passenger id
router.get(
  "/ride-history-detail/:id",
  checkAuthorizationMiddleware,
  getRideHistoryDetailById
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

// Report in admin dashboard part
// By passenger id
router.get(
  "/report-passenger/:id",
  checkAuthorizationMiddleware,
  reportPassenger
)

router.get(
  "/passenger-travel-history/:id",
  checkAuthorizationMiddleware,
  travelHistory
)

router.get(
  "/comment-and-rating/:id",
  checkAuthorizationMiddleware,
  getCommentAndRating
)

// Report in driver part
// By driver id
router.get(
  "/driver/ride-history",
  checkAuthorizationMiddleware,
  getDriverRideHistoryDetailById
);

router.get(
  '/driver/total-income',
  checkAuthorizationMiddleware,
  getTotalDriverIncome
)

export default router;
