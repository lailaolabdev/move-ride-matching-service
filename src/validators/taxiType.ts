import { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreateTaxiType = (req: Request, res: Response, next: NextFunction) => {
    const { name, icon, price, seats } = req.body;
    if (!name) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: name'
        });
        return;
    }
    if (!icon) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: icon'
        });
        return;
    }

    if (!price) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: price'
        });
        return;
    }

    if (!seats) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: seats'
        });
        return;
    }

    next();
}
