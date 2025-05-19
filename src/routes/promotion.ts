import express from "express";
import {
  createPromotion,
  deletePromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
} from "../controllers/promotion";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createPromotion);

router.get("/", checkAuthorizationMiddleware, getAllPromotions);

router.get("/:id", getPromotionById);

router.put("/:id", checkAuthorizationMiddleware, updatePromotion);

router.delete("/:id", checkAuthorizationMiddleware, deletePromotion);

export default router;
