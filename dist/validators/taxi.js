"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTaxi = void 0;
const config_1 = require("../config");
const validateCreateTaxi = (req, res, next) => {
    const { taxiType, vehicleModel, vehicleBrand, passengerMin, passengerMax, meteredFare, flatFare, country } = req.body;
    if (!taxiType) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: taxiType'
        });
        return;
    }
    if (!vehicleModel) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: vehicleModel'
        });
        return;
    }
    if (!vehicleBrand) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: vehicleBrand'
        });
        return;
    }
    // if (passengerMin === undefined) {
    //     res.status(400).json({
    //         code: messages.BAD_REQUEST.code,
    //         message: 'Missing required field: passengerMin'
    //     });
    //     return;
    // }
    // if (passengerMax === undefined) {
    //     res.status(400).json({
    //         code: messages.BAD_REQUEST.code,
    //         message: 'Missing required field: passengerMax'
    //     });
    //     return;
    // }
    // if (meteredFare === undefined) {
    //     res.status(400).json({
    //         code: messages.BAD_REQUEST.code,
    //         message: 'Missing required field: meteredFare'
    //     });
    //     return;
    // }
    // if (flatFare === undefined) {
    //     res.status(400).json({
    //         code: messages.BAD_REQUEST.code,
    //         message: 'Missing required field: flatFare'
    //     });
    //     return;
    // }
    if (country === undefined) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: 'Missing required field: country'
        });
        return;
    }
    next();
};
exports.validateCreateTaxi = validateCreateTaxi;
