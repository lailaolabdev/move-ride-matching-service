"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPromotion = void 0;
const filterPromotion = (name, usingType, startDate, endDate, status) => {
    const filter = {};
    if (name)
        filter.name = { $regex: name, $options: "i" };
    if (usingType)
        filter.usingType = usingType;
    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }
    if (status !== undefined)
        filter.status = status === "true";
    return filter;
};
exports.filterPromotion = filterPromotion;
