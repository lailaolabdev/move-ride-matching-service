"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDriverCashBody = void 0;
const validateDriverCashBody = (body) => {
    const { amount, driver } = body;
    const returnBody = {};
    if (driver)
        returnBody.driver = driver;
    if (amount)
        returnBody.amount = amount;
    return returnBody;
};
exports.validateDriverCashBody = validateDriverCashBody;
