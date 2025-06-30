import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
  createDelayPrice,
  deleteDelayPrice,
  getAllDelayPrices,
  getDelayPriceById,
  updateDelayPrice
} from '../controllers/delayPrice';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createDelayPrice);

router.get('/', checkAuthorizationMiddleware, getAllDelayPrices);

router.get('/:id', getDelayPriceById);

router.put('/:id', checkAuthorizationMiddleware, updateDelayPrice);

router.delete('/:id', checkAuthorizationMiddleware, deleteDelayPrice);

export default router;
