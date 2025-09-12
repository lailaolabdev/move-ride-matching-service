import express from "express";
import {
  createFestivalPromotion,
  deleteFestivalPromotion,
  getAllFestivalPromotions,
  getFestivalPromotionById,
  updateFestivalPromotion,
  updateFestivalPromotionByDate,
} from "../controllers/festivalPromotion";
import { checkAuthorizationMiddleware } from "../middlewares";
import { validateCreatePromotion } from "../validators/promotion";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, validateCreatePromotion, createFestivalPromotion);

router.get("/", checkAuthorizationMiddleware, getAllFestivalPromotions);

router.get("/:id", getFestivalPromotionById);

router.put("/:id", checkAuthorizationMiddleware, updateFestivalPromotion);

router.delete("/:id", checkAuthorizationMiddleware, deleteFestivalPromotion);

router.put("/update/festival-promotion-status", updateFestivalPromotionByDate);

export default router;