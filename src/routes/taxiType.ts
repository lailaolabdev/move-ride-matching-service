import express from 'express';
import { validateCreateTaxiType } from '../validators/taxiType';
import { createTaxiType, deleteTaxiType, getAllTaxiTypes, getTaxiTypeById, updateTaxiType } from '../controllers/taxiType';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, validateCreateTaxiType, createTaxiType);

router.get('/', checkAuthorizationMiddleware, getAllTaxiTypes);

router.get('/:id', checkAuthorizationMiddleware, getTaxiTypeById);

router.put('/:id', checkAuthorizationMiddleware, updateTaxiType);

router.delete('/:id', checkAuthorizationMiddleware, deleteTaxiType);

export default router;