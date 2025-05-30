import express from 'express';
import {
  createRating,
  deleteRating,
  getAllRatings,
  getRatingById,
  updateRating,
} from '../controllers/rating';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createRating);

router.get('/', checkAuthorizationMiddleware, getAllRatings);

router.get('/:id', checkAuthorizationMiddleware, getRatingById);

router.put('/:id', checkAuthorizationMiddleware, updateRating);

router.delete('/:id', checkAuthorizationMiddleware, deleteRating);

export default router;