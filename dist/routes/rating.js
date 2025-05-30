"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rating_1 = require("../controllers/rating");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, rating_1.createRating);
router.get('/', middlewares_1.checkAuthorizationMiddleware, rating_1.getAllRatings);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, rating_1.getRatingById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, rating_1.updateRating);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, rating_1.deleteRating);
exports.default = router;
