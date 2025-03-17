import type { Request, Response, NextFunction } from "express";
import { messages } from "../config";

export const validateUpdateRatingAndComment = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { rating, comment, chat } = req.body;

        if (!rating) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                messages: messages.BAD_REQUEST.message,
                detail: "Missing request field: rating"
            });
            return;
        }

        if (!comment) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                messages: messages.BAD_REQUEST.message,
                detail: "Missing request field: comment"
            });
            return;
        }

        if (!Array.isArray(chat)) {
            res.status(400).json({
                code: messages.BAD_REQUEST.code,
                message: messages.BAD_REQUEST.message,
                detail: "Missing request field: 'chatId' and 'message'."
            });
            return;
        }

        for (const item of chat) {
            if (
                typeof item !== "object" ||
                !("id" in item) ||
                !("message" in item) ||
                Object.keys(item).length !== 2
            ) {
                res.status(400).json({
                    code: messages.BAD_REQUEST.code,
                    message: messages.BAD_REQUEST.message,
                    detail: "Invalid chat format. Each chat object must have only 'id' and 'message'."
                });
                return;
            }
        }

        next();
    } catch (error) {
        next(error); // Ensure errors are properly handled
    }

};
