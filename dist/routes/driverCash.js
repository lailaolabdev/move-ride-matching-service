"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const driverCash_1 = require("../controllers/driverCash");
const router = express_1.default.Router();
router.post("/", middlewares_1.checkAuthorizationMiddleware, driverCash_1.createDriverCash);
router.get("/", middlewares_1.checkAuthorizationMiddleware, driverCash_1.getAllDriverCash);
router.get("/:id", middlewares_1.checkAuthorizationMiddleware, driverCash_1.getDriverCashById);
router.get("/by-driver-id/:id", middlewares_1.checkAuthorizationMiddleware, driverCash_1.getDriverCashByDriverId);
router.put("/:id", middlewares_1.checkAuthorizationMiddleware, driverCash_1.updateDriverCash);
router.delete("/:id", middlewares_1.checkAuthorizationMiddleware, driverCash_1.deleteDriverCash);
router.post("/adjust-driver-cash", middlewares_1.checkAuthorizationMiddleware, driverCash_1.adjustDriverCash);
exports.default = router;
