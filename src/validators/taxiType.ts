import  { Request, Response, NextFunction } from 'express';
import { messages } from '../config';

export const validateCreateTaxiType = (req: Request, res: Response, next: NextFunction) => {
    const { name, icon } = req.body;
    if (!name) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: name'
        });
        return;
    }
    if(!icon) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: 'Missing requird field: icon'
        });
        return;
    }
    next();
}
