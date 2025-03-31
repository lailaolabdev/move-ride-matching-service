import express from 'express';
import { validateCreateVehicleDriver } from '../validators/vehicleDriver';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
    createVehicleDriver,
    deleteVehicleDriver,
    getAllVehicleDrivers,
    getVehicleDriver,
    getVehicleDriverByDriverId,
    updateVehicleDriver
} from '../controllers/vehicleDriver';

const router = express.Router();

router.get('/', checkAuthorizationMiddleware, getAllVehicleDrivers);
router.get('/:id', checkAuthorizationMiddleware, getVehicleDriver);
router.get('/driver/:id', getVehicleDriverByDriverId);
router.post('/', checkAuthorizationMiddleware, validateCreateVehicleDriver, createVehicleDriver);
router.put('/', checkAuthorizationMiddleware, updateVehicleDriver);
router.delete('/:id', checkAuthorizationMiddleware, deleteVehicleDriver);


export default router;