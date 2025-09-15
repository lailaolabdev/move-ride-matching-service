"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../controllers/dashboard");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.get("/summary/revenue", middlewares_1.checkAuthorizationMiddleware, dashboard_1.summaryRevenueCallTaxi); // Revenue Overview
router.get("/summary/call", middlewares_1.checkAuthorizationMiddleware, dashboard_1.summaryRideCallTaxi); // Ride Summary 
router.get("/summary/calling-transaction", middlewares_1.checkAuthorizationMiddleware, dashboard_1.getCallingTransaction); // Ride Summary 
router.get("/summary/top-driver", middlewares_1.checkAuthorizationMiddleware, dashboard_1.getTopTenDriver);
router.get("/summary/top-passenger", middlewares_1.checkAuthorizationMiddleware, dashboard_1.getTopTenPassenger);
router.post("/script/update", dashboard_1.scriptToUpdateCountry);
exports.default = router;
