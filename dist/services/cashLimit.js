"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCashLimitService = exports.updateCashLimitService = exports.getCashLimitByIdService = exports.getAllCashLimitsService = exports.createCashLimitService = void 0;
const cashLimit_1 = require("../models/cashLimit");
// CREATE
const createCashLimitService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ amount, country, countryCode }) {
    try {
        const data = new cashLimit_1.cashLimitModel({
            amount: amount || 0,
            country,
            countryCode
        });
        return yield data.save();
    }
    catch (error) {
        throw new Error(`Failed to create cash limit: ${error}`);
    }
});
exports.createCashLimitService = createCashLimitService;
// READ ALL
const getAllCashLimitsService = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (skip = 0, filter = {}) {
    try {
        const total = yield cashLimit_1.cashLimitModel.countDocuments(filter);
        const data = yield cashLimit_1.cashLimitModel
            .find(filter)
            .skip(skip)
            .sort({ createdAt: -1 });
        return { total, data };
    }
    catch (error) {
        throw new Error(`Failed to fetch cash limits: ${error}`);
    }
});
exports.getAllCashLimitsService = getAllCashLimitsService;
// READ BY ID
const getCashLimitByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cashLimit_1.cashLimitModel.findById(id);
    }
    catch (error) {
        throw new Error(`Failed to get cash limit by ID: ${error}`);
    }
});
exports.getCashLimitByIdService = getCashLimitByIdService;
// UPDATE
const updateCashLimitService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, amount, country, countryCode }) {
    try {
        const updateData = Object.assign(Object.assign(Object.assign({}, (amount !== undefined && { amount })), (country !== undefined && { country })), (countryCode !== undefined && { countryCode }));
        return yield cashLimit_1.cashLimitModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    }
    catch (error) {
        throw new Error(`Failed to update cash limit: ${error}`);
    }
});
exports.updateCashLimitService = updateCashLimitService;
// DELETE
const deleteCashLimitService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield cashLimit_1.cashLimitModel.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error(`Failed to delete cash limit: ${error}`);
    }
});
exports.deleteCashLimitService = deleteCashLimitService;
