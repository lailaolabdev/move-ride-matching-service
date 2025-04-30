"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverLocation_1 = require("../validators/driverLocation");
const driverLocation_2 = require("../controllers/driverLocation");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, driverLocation_1.validateCreateDriverLocation, driverLocation_2.createDriverLocation);
router.get('/', middlewares_1.checkAuthorizationMiddleware, driverLocation_2.getAllDriverLocation);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, driverLocation_2.getDriverLocationById);
router.put('/', middlewares_1.checkAuthorizationMiddleware, driverLocation_2.updateDriverLocation);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, driverLocation_2.deleteDriverLocation);
exports.default = router;
