"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPromotion = void 0;
const filterPromotion = (name, usingType, startDate, endDate) => {
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
    return filter;
};
exports.filterPromotion = filterPromotion;
