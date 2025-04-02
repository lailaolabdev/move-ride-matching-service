"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateDriverLocation = void 0;
const config_1 = require("../config");
const validateCreateDriverLocation = (req, res, next) => {
    const { latitude, longitude, area } = req.body;
    if (!latitude) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: latitude'
        });
        return;
    }
    if (!longitude) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: longitude'
        });
        return;
    }
    if (!area) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: area'
        });
        return;
    }
    next();
};
exports.validateCreateDriverLocation = validateCreateDriverLocation;
