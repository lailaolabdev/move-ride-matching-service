
import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
    adjustDriverCash,
    createDriverCash,
    deleteDriverCash,
    getAllDriverCash,
    getDriverCashByDriverId,
    getDriverCashById,
    updateDriverCash
} from '../controllers/driverCash';

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createDriverCash);
router.get("/", checkAuthorizationMiddleware, getAllDriverCash);
router.get("/by-driver-id", checkAuthorizationMiddleware, getDriverCashByDriverId);
router.get("/:id", checkAuthorizationMiddleware, getDriverCashById);
router.put("/:id", checkAuthorizationMiddleware, updateDriverCash);
router.delete("/:id", checkAuthorizationMiddleware, deleteDriverCash);
router.post("/adjust-driver-cash", checkAuthorizationMiddleware, adjustDriverCash);

export default router;