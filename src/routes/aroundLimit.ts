import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
  createAroundLimit,
  getAllAroundLimits,
  getAroundLimitById,
  updateAroundLimit,
  deleteAroundLimit
} from '../controllers/aroundLimit';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createAroundLimit);

router.get('/', checkAuthorizationMiddleware, getAllAroundLimits);

router.get('/:id', checkAuthorizationMiddleware, getAroundLimitById);

router.put('/:id', checkAuthorizationMiddleware, updateAroundLimit);

router.delete('/:id', checkAuthorizationMiddleware, deleteAroundLimit);

export default router;