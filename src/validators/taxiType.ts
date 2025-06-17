import { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreateTaxiType = (req: Request, res: Response, next: NextFunction) => {
    const {
        name,
        icon,
        seats,
        minDistance,
        maxDistance,
        meterPrice,
        country
    } = req.body;

    if (!name) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: name'
        });
        return
    }

    if (!icon) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: icon'
        });
        return
    }

    if (seats === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: seats'
        });
        return
    }

    if (minDistance === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: minDistance'
        });
        return
    }

    if (maxDistance === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: maxDistance'
        });
        return
    }

    if (meterPrice === undefined) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: meterPrice'
        });
        return
    }

    if (!country) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: country'
        });
        return
    }

    next();
}
