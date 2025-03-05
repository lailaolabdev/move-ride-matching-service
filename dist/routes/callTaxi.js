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
router.post("/", 
// checkAuthorizationMiddleware,
callTaxi_1.createCallTaxi);
router.get("/user-history", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getUserCallTaxis);
router.get("/driver-history", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.getDriverCallTaxis);
router.put("/:id", validateParamId_1.validateParamID, middlewares_1.checkAuthorizationMiddleware, callTaxi_1.updateCallTaxis);
router.put("/driver-confirm/:id", middlewares_1.checkAuthorizationMiddleware, callTaxi_1.driverUpdateStatus);
exports.default = router;
