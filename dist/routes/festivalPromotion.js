"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const festivalPromotion_1 = require("../controllers/festivalPromotion");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/", middlewares_1.checkAuthorizationMiddleware, festivalPromotion_1.createFestivalPromotion);
router.get("/", middlewares_1.checkAuthorizationMiddleware, festivalPromotion_1.getAllFestivalPromotions);
router.get("/:id", festivalPromotion_1.getFestivalPromotionById);
router.put("/:id", middlewares_1.checkAuthorizationMiddleware, festivalPromotion_1.updateFestivalPromotion);
router.delete("/:id", middlewares_1.checkAuthorizationMiddleware, festivalPromotion_1.deleteFestivalPromotion);
router.put("/update/festival-promotion-status", festivalPromotion_1.updateFestivalPromotionByDate);
exports.default = router;
