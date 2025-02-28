"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxiType_1 = require("../validators/taxiType");
const taxiType_2 = require("../controllers/taxiType");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, taxiType_1.validateCreateTaxiType, taxiType_2.createTaxiType);
router.get('/', middlewares_1.checkAuthorizationMiddleware, taxiType_2.getAllTaxiTypes);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, taxiType_2.getTaxiTypeById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, taxiType_2.updateTaxiType);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, taxiType_2.deleteTaxiType);
exports.default = router;
