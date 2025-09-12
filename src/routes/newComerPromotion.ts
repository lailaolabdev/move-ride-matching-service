import express from "express";
import {
  createNewComerPromotion,
  deleteNewComerPromotion,
  getAllNewComerPromotions,
  getNewComerPromotionById,
  updateNewComerPromotion,
  checkNewComerPromotionUsage,
  recordNewComerPromotionUsage,
  getAllNewComerPromotionUsage,
} from "../controllers/newComerPromotion";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createNewComerPromotion);

router.get("/", checkAuthorizationMiddleware, getAllNewComerPromotions);

router.get("/:id", getNewComerPromotionById);

router.put("/:id", checkAuthorizationMiddleware, updateNewComerPromotion);

router.delete("/:id", checkAuthorizationMiddleware, deleteNewComerPromotion);

// New routes for usage tracking
router.get("/usage/check/:userId", checkNewComerPromotionUsage);

router.post("/usage/record", checkAuthorizationMiddleware, recordNewComerPromotionUsage);

router.get("/usage/all", checkAuthorizationMiddleware, getAllNewComerPromotionUsage);

export default router;