import express from "express";
import {
  driverUpdateStatus,
  createCallTaxi,
  getDriverCallTaxis,
  getUserCallTaxis,
  updateCallTaxis,
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
  getTotalDriverIncome,
  getDriverPaymentDetail,
  updateClaimMoneyStatus,
  checkUsingPromotion,
  checkNewcomerPromotionUsage,
  checkNewcomerPromotionUsageByUserId,
  socketCheckStatus,
  updateClaimMoneyByClaimMoneyId,
  adminUpdateCallTaxiStatus,
} from "../controllers/callTaxi";
import { validateParamID } from "../utils/validateParamId";
import { checkAuthorizationAdminRole, checkAuthorizationMiddleware } from "../middlewares";
import { getClaimPayment } from "../controllers/callTaxi";

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
  "/socket/check/status/:id",
  socketCheckStatus
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

// Update claim money status by claim money id
router.put(
  "/claim-money/:id",
  validateParamID,
  checkAuthorizationMiddleware,
  updateClaimMoneyStatus
);

// Get claim payment history by driver id
router.get(
  "/claim-money/:id",
  validateParamID,
  checkAuthorizationMiddleware,
  getClaimPayment
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

// Use both driver and passenger
router.get(
  "/travel-history/:id",
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

router.get(
  '/driver/payment-detail/:id',
  checkAuthorizationMiddleware,
  getDriverPaymentDetail
)

router.post(
  "/check/promotion",
  checkAuthorizationMiddleware,
  checkUsingPromotion
);

router.post(
  "/check/newcomer-promotion",
  checkAuthorizationMiddleware,
  checkNewcomerPromotionUsage
);

// update claim money
router.put(
  "/update/claim-money",
  checkAuthorizationMiddleware,
  updateClaimMoneyByClaimMoneyId
);

router.put(
  '/admin/update/status/:id',
  checkAuthorizationMiddleware,
  checkAuthorizationAdminRole,
  adminUpdateCallTaxiStatus
)

// Check newcomer promotion usage by user ID
router.get("/usage/check/new-comer-promotions/:userId", checkNewcomerPromotionUsageByUserId);

export default router;
