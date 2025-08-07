"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const cashLimit_1 = require("../controllers/cashLimit");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, cashLimit_1.createCashLimit);
router.get('/', middlewares_1.checkAuthorizationMiddleware, cashLimit_1.getAllCashLimits);
router.get('/:id', cashLimit_1.getCashLimitById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, cashLimit_1.updateCashLimit);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, cashLimit_1.deleteCashLimit);
exports.default = router;
