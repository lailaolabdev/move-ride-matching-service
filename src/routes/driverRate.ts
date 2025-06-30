import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
  createDriverRate,
  deleteDriverRate,
  getAllDriverRates,
  getDriverRateById,
  updateDriverRate
} from '../controllers/driverRate';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createDriverRate);

router.get('/', checkAuthorizationMiddleware, getAllDriverRates);

router.get('/:id', getDriverRateById);

router.put('/:id', checkAuthorizationMiddleware, updateDriverRate);

router.delete('/:id', checkAuthorizationMiddleware, deleteDriverRate);

export default router;