import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
  createCashLimit,
  getAllCashLimits,
  getCashLimitById,
  updateCashLimit,
  deleteCashLimit
} from '../controllers/cashLimit';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createCashLimit);

router.get('/', checkAuthorizationMiddleware, getAllCashLimits);

router.get('/:id', getCashLimitById);

router.put('/:id', checkAuthorizationMiddleware, updateCashLimit);

router.delete('/:id', checkAuthorizationMiddleware, deleteCashLimit);

export default router;