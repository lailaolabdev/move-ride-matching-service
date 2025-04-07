import express from 'express';
import { getNearbyDrivers } from '../controllers/nearByDriver';
import { checkAuthorizationMiddleware } from '../middlewares';

const router = express.Router();

router.get('/', checkAuthorizationMiddleware, getNearbyDrivers);

export default router;
