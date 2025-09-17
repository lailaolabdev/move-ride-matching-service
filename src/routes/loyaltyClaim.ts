import express from 'express';
import { checkAuthorizationAdminRole, checkAuthorizationMiddleware } from '../middlewares';
import {
    createLoyaltyClaim,
    deleteLoyaltyClaim,
    getAllLoyaltyClaim,
    getLoyaltyClaimById,
    updateLoyaltyClaim,
} from '../controllers/loyaltyClaim';

const router = express.Router();

router.post('/', checkAuthorizationMiddleware, createLoyaltyClaim);

router.get('/', checkAuthorizationMiddleware, getAllLoyaltyClaim);

router.get('/:id', checkAuthorizationMiddleware, getLoyaltyClaimById);

router.put('/:id', checkAuthorizationMiddleware, checkAuthorizationAdminRole, updateLoyaltyClaim);

router.delete('/:id', checkAuthorizationMiddleware, deleteLoyaltyClaim);

export default router;
