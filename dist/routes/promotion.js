"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promotion_1 = require("../controllers/promotion");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/", middlewares_1.checkAuthorizationMiddleware, promotion_1.createPromotion);
router.get("/", middlewares_1.checkAuthorizationMiddleware, promotion_1.getAllPromotions);
router.get("/:id", promotion_1.getPromotionById);
router.put("/:id", middlewares_1.checkAuthorizationMiddleware, promotion_1.updatePromotion);
router.delete("/:id", middlewares_1.checkAuthorizationMiddleware, promotion_1.deletePromotion);
exports.default = router;
