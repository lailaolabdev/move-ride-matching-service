"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeline = void 0;
const pipeline = ({ startDate, endDate }) => {
    const matchStage = {};
    const pipeline = [];
    // If startDate and endDate are provided, add a $match stage to filter by date range
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        matchStage.createdAt = {
            $gte: start,
            $lte: end,
        };
    }
    // Add $match stage if date range is provided
    if (Object.keys(matchStage).length > 0) {
        pipeline.push({ $match: matchStage });
    }
    // Add $group stage to calculate the total price
    pipeline.push({
        $group: {
            _id: null,
            totalPrice: { $sum: "$totalPrice" },
        },
    });
    return pipeline;
};
exports.pipeline = pipeline;
