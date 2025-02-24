import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose"
import { messages } from "../config";

export const validateParamID = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id

    if (!id) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: messages.BAD_REQUEST,
            detail: "Missing required fields: id",
        });

        return;
    }

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({
            code: messages.BAD_REQUEST.code,
            message: messages.BAD_REQUEST,
            detail: "Incorrect id",
        });

        return;
    }

    next()
};