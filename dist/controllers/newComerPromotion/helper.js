"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNewComerPromotion = void 0;
const filterNewComerPromotion = (name, status, startDate, endDate, country) => {
    const filter = {};
    if (name)
        filter.name = { $regex: name, $options: "i" };
    if (status !== undefined)
        filter.status = status === "true";
    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }
    if (country)
        filter.country = country;
    return filter;
};
exports.filterNewComerPromotion = filterNewComerPromotion;
