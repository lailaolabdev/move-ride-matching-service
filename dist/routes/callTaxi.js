"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const callTaxi_1 = require("../controllers/callTaxi");
const validateParamId_1 = require("../utils/validateParamId");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.createCallTaxi);
router.get("/:id", callTaxi_1.getCallTaxiById);
router.get("/", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getCallTaxis);
router.get("/check/status", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.checkCallTaxiStatus);
router.get("/user-history", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getUserCallTaxis);
// driver complain passenger by call taxi id
router.put("/driver-complain/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.createDriverComplain);
// passenger complain driver by call taxi id
router.put("/passenger-complain/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.createPassengerComplain);
// get passenger complain by passenger id
router.get("/passenger-complain/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getPassengerComplainById);
// get passenger total ride
router.get("/total-ride/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.gettotalRide);
// using
// get ride history detail by passenger id
router.get("/ride-history-detail/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getRideHistoryDetailById);
// using
// get ride history detail by passenger id
router.get("/driver/ride-history", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getDriverRideHistoryDetailById);
// get total distance ride
router.get("/ride-history/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getRideHistory);
// Get all driver's order 
router.get("/calling-taxi-history", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getDriverCallTaxis);
// Update type and status by calling taxi id
router.put("/:id", validateParamId_1.validateParamID, middlewares_1.checkAuthorizationMiddleware, callTaxi_1.updateCallTaxis);
// Driver update order processing status
router.put("/driver-confirm/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.driverUpdateStatus);
router.get("/total-price", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.callTaxiTotalPrice);
router.put("/rating-comment/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.updateStartAndComment);
exports.default = router;
