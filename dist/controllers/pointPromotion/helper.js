"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPointPromotion = void 0;
const filterPointPromotion = (name, type, status, startDate, endDate, country, minAmount, pointReward, createdStartDate, createdEndDate) => {
    const filter = {};
    if (name)
        filter.name = { $regex: name, $options: "i" };
    if (type)
        filter.type = type;
    if (status !== undefined)
        filter.status = status === "true";
    if (country)
        filter.country = country;
    if (minAmount !== undefined) {
        filter.minAmount = { $gte: Number(minAmount) };
    }
    if (pointReward !== undefined) {
        filter.pointReward = { $gte: Number(pointReward) };
    }
    // Filter by promotion start and end dates
    if (startDate) {
        filter.startDate = { $gte: new Date(startDate) };
    }
    if (endDate) {
        filter.endDate = { $lte: new Date(endDate) };
    }
    // Filter by creation date range
    if (createdStartDate && createdEndDate) {
        filter.createdAt = {
            $gte: new Date(createdStartDate),
            $lte: new Date(createdEndDate),
        };
    }
    return filter;
};
exports.filterPointPromotion = filterPointPromotion;
