"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newComerPromotion_1 = require("../controllers/newComerPromotion");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/", middlewares_1.checkAuthorizationMiddleware, newComerPromotion_1.createNewComerPromotion);
router.get("/", middlewares_1.checkAuthorizationMiddleware, newComerPromotion_1.getAllNewComerPromotions);
router.get("/:id", newComerPromotion_1.getNewComerPromotionById);
router.put("/:id", middlewares_1.checkAuthorizationMiddleware, newComerPromotion_1.updateNewComerPromotion);
router.delete("/:id", middlewares_1.checkAuthorizationMiddleware, newComerPromotion_1.deleteNewComerPromotion);
// New routes for usage tracking
router.get("/usage/check/:userId", newComerPromotion_1.checkNewComerPromotionUsage);
router.post("/usage/record", middlewares_1.checkAuthorizationMiddleware, newComerPromotion_1.recordNewComerPromotionUsage);
router.get("/usage/all", middlewares_1.checkAuthorizationMiddleware, newComerPromotion_1.getAllNewComerPromotionUsage);
exports.default = router;
