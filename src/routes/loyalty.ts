import express from 'express';
import { validateCreateLoyalty } from '../validators/loyalty';
import { createLoyalty, deleteLoyalty, getAllLoyalty, getLoyaltyById, updateLoyalty, } from '../controllers/loyalty';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, validateCreateLoyalty, createLoyalty);

router.get('/', getAllLoyalty);

router.get('/:id', getLoyaltyById);

router.put('/:id', checkAuthorizationMiddleware, updateLoyalty);

router.delete('/:id', checkAuthorizationMiddleware, deleteLoyalty);

export default router;
