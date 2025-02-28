"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculation_1 = require("../controllers/calculation");
const router = express_1.default.Router();
router.post("/distance", 
// checkAuthorizationMiddleware,
calculation_1.calculateUserDistanceAndDuration);
exports.default = router;
