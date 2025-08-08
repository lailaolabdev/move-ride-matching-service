"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const roundLimit_1 = require("../controllers/roundLimit");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, roundLimit_1.createRoundLimit);
router.get('/', middlewares_1.checkAuthorizationMiddleware, roundLimit_1.getAllRoundLimits);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, roundLimit_1.getRoundLimitById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, roundLimit_1.updateRoundLimit);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, roundLimit_1.deleteRoundLimit);
exports.default = router;
