"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nearByDriver_1 = require("../controllers/nearByDriver");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.get('/', middlewares_1.checkAuthorizationMiddleware, nearByDriver_1.getNearbyDrivers);
exports.default = router;
