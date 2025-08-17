"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDriverCashBody = void 0;
const validateDriverCashBody = (body) => {
    const { amount } = body;
    const returnBody = {};
    if (amount)
        returnBody.amount = amount;
    return returnBody;
};
exports.validateDriverCashBody = validateDriverCashBody;
