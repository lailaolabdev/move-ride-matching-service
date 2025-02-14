import { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreateTaxi = (req: Request, res: Response, next: NextFunction) => {
    const { taxiType, vehicleModel, vehicleBrand, passengerMin, passengerMax, meteredFare, flatFare } = req.body;

    if (!taxiType) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: taxiType'
        });
        return;
    }
    if (!vehicleModel) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: vehicleModel'
        });
        return;
    }
    if (!vehicleBrand) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: vehicleBrand'
        });
        return;
    }
    if (passengerMin === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: passengerMin'
        });
        return;
    }
    if (passengerMax === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: passengerMax'
        });
        return;
    }
    if (meteredFare === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: meteredFare'
        });
        return;
    }
    if (flatFare === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: flatFare'
        });
        return;
    }

    next();
}
