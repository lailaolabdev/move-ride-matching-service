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
  chatCallTaxi,
  updateStartAndComment,
  getComentAndRating,
  callTaxiTotalPrice,
  travelHistoryHistory,
  cancelTravelHistoryHistory,
  getTotalMeterTime,
  getTotalFlatFareTime,
  createDriverComplain,
  createPassengerComplain,
  getPassengerComplainById,
  getCallTaxiById,
  getCallTaxis,
  checkCallTaxiStatus,
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

// get total  ride
router.get(
  "/total-ride/:id",
  checkAuthorizationMiddleware,
  gettotalRide
);

// get total distance ride
router.get(
  "/total-distance/:id",
  checkAuthorizationMiddleware,
  getTotalDistance
);

// get total distance ride
router.get(
  "/ride-history/:id",
  checkAuthorizationMiddleware,
  getRideHistory
);

// get total the last ride
router.get(
  "/last-ride/:id",
  checkAuthorizationMiddleware,
  getThelastRide
);

// Get all calling taxi
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
  "/comment-rating/:id",
  checkAuthorizationMiddleware,
  getComentAndRating
);

router.put(
  "/rating-comment/:id",
  checkAuthorizationMiddleware,
  updateStartAndComment
);

// update chat while processing order
router.put(
  "/chat-call-taxi/:id",
  checkAuthorizationMiddleware,
  chatCallTaxi
);

// get total travel history ride
router.get(
  "/travel-history/:id",
  checkAuthorizationMiddleware,
  travelHistoryHistory
);

// get total cancel travel history ride
router.get(
  "/cancel-history/:id",
  checkAuthorizationMiddleware,
  cancelTravelHistoryHistory
);

// get total  travel request type meter
router.get(
  "/total-meter/:id",
  checkAuthorizationMiddleware,
  getTotalMeterTime
);

// get total  travel request type flat fare
router.get(
  "/flat-fare/:id",
  checkAuthorizationMiddleware,
  getTotalFlatFareTime
);

export default router;
