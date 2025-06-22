"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const voiceCall_1 = require("../controllers/voiceCall");
const router = express_1.default.Router();
router.get('/token', middlewares_1.checkAuthorizationMiddleware, voiceCall_1.registerVoiceCallToken);
router.post('/', voiceCall_1.voiceCall);
exports.default = router;
