import { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreateDriverLocation = (req: Request, res: Response, next: NextFunction) => {
    const { latitude, longitude, area } = req.body;

    if (!latitude) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: latitude'
        });
        return;
    }

    if (!longitude) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: longitude'
        });
        return;
    }

    if (!area) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: area'
        });
        return;
    }

    next();
}
