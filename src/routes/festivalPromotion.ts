import express from "express";
import {
  createFestivalPromotion,
  deleteFestivalPromotion,
  getAllFestivalPromotions,
  getFestivalPromotionById,
  updateFestivalPromotion,
} from "../controllers/festivalPromotion";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createFestivalPromotion);

router.get("/", checkAuthorizationMiddleware, getAllFestivalPromotions);

router.get("/:id", getFestivalPromotionById);

router.put("/:id", checkAuthorizationMiddleware, updateFestivalPromotion);

router.delete("/:id", checkAuthorizationMiddleware, deleteFestivalPromotion);

export default router;