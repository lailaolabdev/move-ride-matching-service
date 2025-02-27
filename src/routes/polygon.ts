import express from 'express';
import { validateCreatePolygon } from '../validators/polygon';
import { createPolygon, deletePolygon, getAllPolygon, getPolygonById, updatePolygon, } from '../controllers/polygon';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, validateCreatePolygon, createPolygon);
router.get('/', checkAuthorizationMiddleware, getAllPolygon);
router.get('/:id', checkAuthorizationMiddleware, getPolygonById);
router.put('/:id', checkAuthorizationMiddleware, updatePolygon);
router.delete('/:id', checkAuthorizationMiddleware, deletePolygon);

export default router;
