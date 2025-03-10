"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleDriver_1 = require("../validators/vehicleDriver");
const middlewares_1 = require("../middlewares");
const vehicleDriver_2 = require("../controllers/vehicleDriver");
const router = express_1.default.Router();
router.get('/', middlewares_1.checkAuthorizationMiddleware, vehicleDriver_2.getAllVehicleDrivers);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, vehicleDriver_2.getVehicleDriver);
router.get('/driver/:id', middlewares_1.checkAuthorizationMiddleware, vehicleDriver_2.getVehicleDriverByDriverId);
router.post('/', middlewares_1.checkAuthorizationMiddleware, vehicleDriver_1.validateCreateVehicleDriver, vehicleDriver_2.createVehicleDriver);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, vehicleDriver_2.updateVehicleDriver);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, vehicleDriver_2.deleteVehicleDriver);
exports.default = router;
