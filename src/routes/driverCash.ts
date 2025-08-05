
import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import {
    createDriverCash,
    deleteDriverCash,
    getAllDriverCash,
    getDriverCashById,
    updateDriverCash
} from '../controllers/driverCash';

const router = express.Router();

router.post("/", checkAuthorizationMiddleware, createDriverCash);
router.get("/", checkAuthorizationMiddleware, getAllDriverCash);
router.get("/:id", checkAuthorizationMiddleware, getDriverCashById);
router.put("/:id", checkAuthorizationMiddleware, updateDriverCash);
router.delete("/:id", checkAuthorizationMiddleware, deleteDriverCash);

export default router;