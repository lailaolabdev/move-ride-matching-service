"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loyalty_1 = require("../validators/loyalty");
const loyalty_2 = require("../controllers/loyalty");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, loyalty_1.validateCreateLoyalty, loyalty_2.createLoyalty);
router.get('/', middlewares_1.checkAuthorizationMiddleware, loyalty_2.getAllLoyalty);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, loyalty_2.getLoyaltyById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, loyalty_2.updateLoyalty);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, loyalty_2.deleteLoyalty);
exports.default = router;
