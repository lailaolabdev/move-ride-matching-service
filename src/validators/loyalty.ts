import { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreateLoyalty = (req: Request, res: Response, next: NextFunction) => {
    const {
        image,
        name,
        quantity,
        price } = req.body;

    if (!image) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: image'
        });
        return;
    }

    if (!name) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: name'
        });
        return;
    }

    if (!quantity) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing required field: quantity'
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

    next();
}
