import express from 'express';
import { validateCreateTaxi } from '../validators/taxi';
import {
  createTaxi,
  deleteTaxi,
  getAllTaxies,
  getVehicleBrands,
  getVehicleById,
  getVehicleModels,
  updateTaxi
} from '../controllers/taxi';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, validateCreateTaxi, createTaxi);
router.get('/', checkAuthorizationMiddleware, getAllTaxies);
router.get('/:id', checkAuthorizationMiddleware, getVehicleById);
router.put('/:id', checkAuthorizationMiddleware, updateTaxi);
router.delete('/:id', checkAuthorizationMiddleware, deleteTaxi);
router.get('/kyc/vehicle-brands', getVehicleBrands)
router.get('/kyc/vehicle-models', getVehicleModels)

export default router;
