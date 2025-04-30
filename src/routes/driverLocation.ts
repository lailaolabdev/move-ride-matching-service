import express from 'express';
import { validateCreateDriverLocation } from '../validators/driverLocation';
import {
    createDriverLocation,
    deleteDriverLocation,
    getAllDriverLocation,
    getDriverLocationById,
    updateDriverLocation,
} from '../controllers/driverLocation';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, validateCreateDriverLocation, createDriverLocation);

router.get('/', checkAuthorizationMiddleware, getAllDriverLocation);

router.get('/:id', checkAuthorizationMiddleware, getDriverLocationById);

router.put('/', checkAuthorizationMiddleware, updateDriverLocation);

router.delete('/:id', checkAuthorizationMiddleware, deleteDriverLocation);

export default router;
