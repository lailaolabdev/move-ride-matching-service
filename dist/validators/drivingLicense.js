"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateDrivingLicense = void 0;
const config_1 = require("../config");
const validateCreateDrivingLicense = (req, res, next) => {
    const requiredFields = ["name", "country"];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: config_1.messages.BAD_REQUEST.message,
                detail: `Missing required field: ${field}`,
            });
            return;
        }
    }
    next();
};
exports.validateCreateDrivingLicense = validateCreateDrivingLicense;
