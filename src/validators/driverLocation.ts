import { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreateDriverLocation = (req: Request, res: Response, next: NextFunction) => {
    const { location } = req.body;

    if (!location) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: location'
        });
        return;
    }

    next();
}
