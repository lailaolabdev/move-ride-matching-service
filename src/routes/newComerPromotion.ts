import express from "express";
import {
  createNewComerPromotion,
  deleteNewComerPromotion,
  getAllNewComerPromotions,
  getNewComerPromotionById,
  updateNewComerPromotion,
} from "../controllers/newComerPromotion"; // Make sure this file is renamed and exists
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createNewComerPromotion);

router.get("/", checkAuthorizationMiddleware, getAllNewComerPromotions);

router.get("/:id", getNewComerPromotionById);

router.put("/:id", checkAuthorizationMiddleware, updateNewComerPromotion);

router.delete("/:id", checkAuthorizationMiddleware, deleteNewComerPromotion);

export default router;