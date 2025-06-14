import express from 'express';
import {
  createRating,
  deleteRating,
  getAllRatings,
  getRatingById,
  getRatingWithInfo,
  updateRating,
} from '../controllers/rating';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createRating);

router.get('/', checkAuthorizationMiddleware, getAllRatings);

router.get('/:id', checkAuthorizationMiddleware, getRatingById);

router.put('/:id', checkAuthorizationMiddleware, updateRating);

router.delete('/:id', checkAuthorizationMiddleware, deleteRating);

router.get('/:id/with-info', checkAuthorizationMiddleware, getRatingWithInfo);

export default router;