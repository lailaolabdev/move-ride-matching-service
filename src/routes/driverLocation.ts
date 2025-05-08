import express from 'express';
import { updateDriverLocation, } from '../controllers/driverLocation';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.put('/', checkAuthorizationMiddleware, updateDriverLocation);

export default router;
