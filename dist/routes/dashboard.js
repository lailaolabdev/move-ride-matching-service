"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../controllers/dashboard");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.get("/summary/revenue", middlewares_1.checkAuthorizationMiddleware, dashboard_1.summaryRevenueCallTaxi);
router.post("/script/update", dashboard_1.scriptToUpdateCountry);
exports.default = router;
