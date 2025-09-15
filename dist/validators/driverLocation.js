"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateDriverLocation = void 0;
const config_1 = require("../config");
const validateCreateDriverLocation = (req, res, next) => {
    const { location } = req.body;
    if (!location) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: location'
        });
        return;
    }
    next();
};
exports.validateCreateDriverLocation = validateCreateDriverLocation;
