"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDriverCashBody = void 0;
const validateDriverCashBody = (body) => {
    const { amount, limit } = body;
    const returnBody = {};
    if (amount)
        returnBody.amount = amount;
    if (limit)
        returnBody.limit = limit;
    return returnBody;
};
exports.validateDriverCashBody = validateDriverCashBody;
