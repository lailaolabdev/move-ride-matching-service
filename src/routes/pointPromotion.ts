import express from "express";
import {
  createPointPromotion,
  deletePointPromotion,
  getAllPointPromotions,
  getPointPromotionById,
  updatePointPromotion,
} from "../controllers/pointPromotion"; // Ensure this file exists and is correctly named
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createPointPromotion);

router.get("/", checkAuthorizationMiddleware, getAllPointPromotions);

router.get("/:id", getPointPromotionById);

router.put("/:id", checkAuthorizationMiddleware, updatePointPromotion);

router.delete("/:id", checkAuthorizationMiddleware, deletePointPromotion);

export default router;