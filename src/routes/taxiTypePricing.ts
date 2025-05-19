import express from "express";
import {
  createTaxiTypePricing,
  deleteTaxiTypePricing,
  getAllTaxiTypePricing,
  getTaxiTypePricingById,
  updateTaxiTypePricing,
} from "../controllers/taxiTypePricing";
import { checkAuthorizationMiddleware } from "../middlewares";

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createTaxiTypePricing);

router.get("/", checkAuthorizationMiddleware, getAllTaxiTypePricing);

router.get("/:id", getTaxiTypePricingById);

router.put("/:id", checkAuthorizationMiddleware, updateTaxiTypePricing);

router.delete("/:id", checkAuthorizationMiddleware, deleteTaxiTypePricing);

export default router;
