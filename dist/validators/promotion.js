"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatePromotion = void 0;
const config_1 = require("../config");
const festivalPromotion_1 = require("../models/festivalPromotion");
const validateCreatePromotion = (req, res, next) => {
    const { name, discount, usingType, periodStartTime, periodEndTime, country } = req.body;
    if (!name || typeof name !== "string") {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: "Invalid or missing field: name",
        });
        return;
    }
    if (discount === undefined ||
        typeof discount !== "number" ||
        discount < 0 ||
        discount > 100) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: "Invalid or missing field: discount (must be a number between 0 and 100)",
        });
        return;
    }
    if (usingType) {
        if (typeof usingType !== "string" ||
            !Object.values(festivalPromotion_1.usingTypeEnum).includes(usingType)) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: `Invalid or missing field: usingType (must be one of ${Object.values(festivalPromotion_1.usingTypeEnum).join(", ")})`,
            });
            return;
        }
    }
    if (periodStartTime && periodEndTime) {
        if (typeof periodStartTime !== "string" || typeof periodEndTime !== "string") {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "Invalid field: periodStartTime and periodEndTime must be strings",
            });
            return;
        }
        const start = new Date(periodStartTime);
        const end = new Date(periodEndTime);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "Invalid date format in periodStartTime or periodEndTime",
            });
            return;
        }
        if (end < start) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "periodEndTime cannot be earlier than periodStartTime",
            });
            return;
        }
    }
    if (!country || typeof country !== "string") {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: "Invalid or missing field: country",
        });
        return;
    }
    next();
};
exports.validateCreatePromotion = validateCreatePromotion;
