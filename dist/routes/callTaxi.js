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
router.get("/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getCallTaxiById);
router.get("/", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getCallTaxis);
router.get("/user-history", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getUserCallTaxis);
// driver complain passenger by call taxi id
router.put("/driver-complain/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.createDriverComplain);
// passenger complain driver by call taxi id
router.put("/passenger-complain/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.createPassengerComplain);
// get passenger complain by passenger id
router.get("/passenger-complain/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getPassengerComplainById);
// get total  ride
router.get("/total-ride/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.gettotalRide);
// get total distance ride
router.get("/total-distance/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getTotalDistance);
// get total distance ride
router.get("/ride-history/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getRideHistory);
// get total the last ride
router.get("/last-ride/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getThelastRide);
// Get all calling taxi
router.get("/calling-taxi-history", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getDriverCallTaxis);
// Update type and status by calling taxi id
router.put("/:id", validateParamId_1.validateParamID, middlewares_1.checkAuthorizationMiddleware, callTaxi_1.updateCallTaxis);
// Driver update order processing status
router.put("/driver-confirm/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.driverUpdateStatus);
router.get("/total-price", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.callTaxiTotalPrice);
router.get("/comment-rating/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getComentAndRating);
router.put("/rating-comment/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.updateStartAndComment);
// update chat while processing order
router.put("/chat-call-taxi/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.chatCallTaxi);
// get total travel history ride
router.get("/travel-history/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.travelHistoryHistory);
// get total cancel travel history ride
router.get("/cancel-history/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.cancelTravelHistoryHistory);
// get total  travel request type meter
router.get("/total-meter/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getTotalMeterTime);
// get total  travel request type flat fare
router.get("/flat-fare/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getTotalFlatFareTime);
exports.default = router;
