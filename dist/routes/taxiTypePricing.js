"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxiTypePricing_1 = require("../controllers/taxiTypePricing");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/", middlewares_1.checkAuthorizationMiddleware, taxiTypePricing_1.createTaxiTypePricing);
router.get("/", middlewares_1.checkAuthorizationMiddleware, taxiTypePricing_1.getAllTaxiTypePricing);
router.get("/:id", taxiTypePricing_1.getTaxiTypePricingById);
router.put("/:id", middlewares_1.checkAuthorizationMiddleware, taxiTypePricing_1.updateTaxiTypePricing);
router.delete("/:id", middlewares_1.checkAuthorizationMiddleware, taxiTypePricing_1.deleteTaxiTypePricing);
exports.default = router;
