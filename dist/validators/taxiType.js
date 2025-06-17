"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTaxiType = void 0;
const config_1 = require("../config");
const validateCreateTaxiType = (req, res, next) => {
    const { name, icon, seats, country } = req.body;
    if (!name) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: name'
        });
        return;
    }
    if (!icon) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: icon'
        });
        return;
    }
    if (seats === undefined) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: seats'
        });
        return;
    }
    if (!country) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: country'
        });
        return;
    }
    next();
};
exports.validateCreateTaxiType = validateCreateTaxiType;
