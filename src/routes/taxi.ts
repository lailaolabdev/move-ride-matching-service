import express from 'express';
import { validateCreateTaxi } from '../validators/taxi';
import { createTaxi, deleteTaxi, getAllTaxies, getVehicleById, updateTaxi,  } from '../controllers/taxi';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, validateCreateTaxi, createTaxi);
router.get('/', checkAuthorizationMiddleware, getAllTaxies);
router.get('/:id', checkAuthorizationMiddleware, getVehicleById);
router.put('/:id', checkAuthorizationMiddleware, updateTaxi);
router.delete('/:id', checkAuthorizationMiddleware, deleteTaxi);

export default router;
