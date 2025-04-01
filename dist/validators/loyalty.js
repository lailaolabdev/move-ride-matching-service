"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateLoyalty = void 0;
const config_1 = require("../config");
const validateCreateLoyalty = (req, res, next) => {
    const { image, name, quantity, price } = req.body;
    if (!image) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: image'
        });
        return;
    }
    if (!name) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: name'
        });
        return;
    }
    if (!quantity) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: quantity'
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
    next();
};
exports.validateCreateLoyalty = validateCreateLoyalty;
