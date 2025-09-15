"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxi_1 = require("../validators/taxi");
const taxi_2 = require("../controllers/taxi");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, taxi_1.validateCreateTaxi, taxi_2.createTaxi);
router.get('/', middlewares_1.checkAuthorizationMiddleware, taxi_2.getAllTaxies);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, taxi_2.getVehicleById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, taxi_2.updateTaxi);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, taxi_2.deleteTaxi);
router.get('/kyc/vehicle-brands', taxi_2.getVehicleBrands);
router.get('/kyc/vehicle-models', taxi_2.getVehicleModels);
exports.default = router;
