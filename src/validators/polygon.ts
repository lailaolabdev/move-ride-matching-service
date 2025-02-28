import { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreatePolygon = (req: Request, res: Response, next: NextFunction) => {
    const { name, coordinates, price, color } = req.body;

    if (!name) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: name'
        });
        return;
    }
    if (!coordinates) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: coordinates'
        });
        return;
    }
    if (!price) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: price'
        });
        return;
    }
    if (!color) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: color'
        });
        return;
    }

    next();
}
