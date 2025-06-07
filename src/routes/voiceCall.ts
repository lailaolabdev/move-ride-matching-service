import express from 'express';
import { checkAuthorizationMiddleware } from '../middlewares';
import { registerVoiceCallToken, voiceCall } from '../controllers/voiceCall';

const router = express.Router();

router.get('/token', checkAuthorizationMiddleware, registerVoiceCallToken);
router.post('/', checkAuthorizationMiddleware, voiceCall);

export default router;