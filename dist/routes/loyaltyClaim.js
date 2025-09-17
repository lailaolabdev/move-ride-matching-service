"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const loyaltyClaim_1 = require("../controllers/loyaltyClaim");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, loyaltyClaim_1.createLoyaltyClaim);
router.get('/', middlewares_1.checkAuthorizationMiddleware, loyaltyClaim_1.getAllLoyaltyClaim);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, loyaltyClaim_1.getLoyaltyClaimById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, middlewares_1.checkAuthorizationAdminRole, loyaltyClaim_1.updateLoyaltyClaim);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, loyaltyClaim_1.deleteLoyaltyClaim);
exports.default = router;
