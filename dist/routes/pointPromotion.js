"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pointPromotion_1 = require("../controllers/pointPromotion");
const middlewares_1 = require("../middlewares");
const pointPromotion_2 = require("../validators/pointPromotion");
const router = express_1.default.Router();
router.post("/", middlewares_1.checkAuthorizationMiddleware, pointPromotion_2.validateCreatePointPromotion, pointPromotion_1.createPointPromotion);
router.get("/", middlewares_1.checkAuthorizationMiddleware, pointPromotion_1.getAllPointPromotions);
router.get("/:id", pointPromotion_1.getPointPromotionById);
router.put("/:id", middlewares_1.checkAuthorizationMiddleware, pointPromotion_1.updatePointPromotion);
router.delete("/:id", middlewares_1.checkAuthorizationMiddleware, pointPromotion_1.deletePointPromotion);
exports.default = router;
