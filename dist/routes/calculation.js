"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculation_1 = require("../controllers/calculation");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/passenger", middlewares_1.checkAuthorizationMiddleware, calculation_1.calculateUserDistanceAndDuration);
router.post("/driver", middlewares_1.checkAuthorizationMiddleware, calculation_1.calculateDriverDistanceAndDuration);
exports.default = router;
