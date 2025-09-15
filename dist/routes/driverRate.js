"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const driverRate_1 = require("../controllers/driverRate");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, driverRate_1.createDriverRate);
router.get('/', middlewares_1.checkAuthorizationMiddleware, driverRate_1.getAllDriverRates);
router.get('/:id', driverRate_1.getDriverRateById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, driverRate_1.updateDriverRate);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, driverRate_1.deleteDriverRate);
exports.default = router;
