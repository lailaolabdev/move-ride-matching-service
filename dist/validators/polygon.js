"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatePolygon = void 0;
const config_1 = require("../config");
const validateCreatePolygon = (req, res, next) => {
    const { name, coordinates, price, color } = req.body;
    if (!name) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: name'
        });
        return;
    }
    if (!coordinates) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: coordinates'
        });
        return;
    }
    if (!price) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: price'
        });
        return;
    }
    if (!color) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: color'
        });
        return;
    }
    next();
};
exports.validateCreatePolygon = validateCreatePolygon;
