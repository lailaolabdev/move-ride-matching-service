"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const delayPrice_1 = require("../controllers/delayPrice");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, delayPrice_1.createDelayPrice);
router.get('/', middlewares_1.checkAuthorizationMiddleware, delayPrice_1.getAllDelayPrices);
router.get('/:id', delayPrice_1.getDelayPriceById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, delayPrice_1.updateDelayPrice);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, delayPrice_1.deleteDelayPrice);
exports.default = router;
