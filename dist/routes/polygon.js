"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const polygon_1 = require("../validators/polygon");
const polygon_2 = require("../controllers/polygon");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post('/', middlewares_1.checkAuthorizationMiddleware, polygon_1.validateCreatePolygon, polygon_2.createPolygon);
router.get('/', middlewares_1.checkAuthorizationMiddleware, polygon_2.getAllPolygon);
router.get('/:id', middlewares_1.checkAuthorizationMiddleware, polygon_2.getPolygonById);
router.put('/:id', middlewares_1.checkAuthorizationMiddleware, polygon_2.updatePolygon);
router.delete('/:id', middlewares_1.checkAuthorizationMiddleware, polygon_2.deletePolygon);
exports.default = router;
