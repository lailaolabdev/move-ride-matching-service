"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverLocation_1 = require("../controllers/driverLocation");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.put('/', middlewares_1.checkAuthorizationMiddleware, driverLocation_1.updateDriverLocation);
exports.default = router;
