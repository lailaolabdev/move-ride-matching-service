import express from "express";
import {
  createPointPromotion,
  deletePointPromotion,
  getAllPointPromotions,
  getPointPromotionById,
  updatePointPromotion,
} from "../controllers/pointPromotion";
import { checkAuthorizationMiddleware } from "../middlewares";
import { validateCreatePointPromotion, validateUpdatePointPromotion } from "../validators/pointPromotion";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, validateCreatePointPromotion, createPointPromotion);

router.get("/", checkAuthorizationMiddleware, getAllPointPromotions);

router.get("/:id", getPointPromotionById);

router.put("/:id", checkAuthorizationMiddleware, updatePointPromotion);

router.delete("/:id", checkAuthorizationMiddleware, deletePointPromotion);

export default router;