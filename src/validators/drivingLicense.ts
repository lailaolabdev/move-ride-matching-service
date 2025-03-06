import type { Request, Response, NextFunction } from "express";
import { messages } from "../config";

export const validateCreateDrivingLicense = (req: Request, res: Response, next: NextFunction) => {
    const requiredFields = ["name", "country"];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                message: messages.BAD_REQUEST.message,
                detail: `Missing required field: ${field}`,
            });

            return;
        }
    }

    next();
};
