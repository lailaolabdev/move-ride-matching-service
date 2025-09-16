"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPromotion = void 0;
const filterPromotion = (name, usingType, startDate, endDate, status, country, periodStartTime, periodEndTime) => {
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
    if (country)
        filter.country = country;
    // Filter promotions by periodStartTime and periodEndTime range
    // Get promotions that are active during the specified date range (overlapping promotions)
    if (periodStartTime && periodEndTime) {
        const startDate = new Date(periodStartTime);
        const endDate = new Date(periodEndTime);
        // Check if they are the same date (year, month, day)
        if (startDate.toDateString() === endDate.toDateString()) {
            // Set to start of day (00:00:00.000) and end of day (23:59:59.999)
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
        }
        // Find promotions that overlap with the query range:
        // Promotion's periodStartTime should be <= query's periodEndTime
        // Promotion's periodEndTime should be >= query's periodStartTime
        filter.periodStartTime = { $lte: endDate };
        filter.periodEndTime = { $gte: startDate };
    }
    return filter;
};
exports.filterPromotion = filterPromotion;
