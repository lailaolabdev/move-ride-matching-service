import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
  createRoundLimit,
  getAllRoundLimits,
  getRoundLimitById,
  updateRoundLimit,
  deleteRoundLimit
} from '../controllers/roundLimit';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createRoundLimit);

router.get('/', checkAuthorizationMiddleware, getAllRoundLimits);

router.get('/:id', checkAuthorizationMiddleware, getRoundLimitById);

router.put('/:id', checkAuthorizationMiddleware, updateRoundLimit);

router.delete('/:id', checkAuthorizationMiddleware, deleteRoundLimit);

export default router;