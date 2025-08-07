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
exports.deleteCashLimit = exports.updateCashLimit = exports.getCashLimitById = exports.getAllCashLimits = exports.createCashLimit = void 0;
const cashLimit_1 = require("../../services/cashLimit");
const index_1 = require("../../config/index");
// CREATE Cash Limit
const createCashLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, country, countryCode } = req.body;
        const newCashLimit = yield (0, cashLimit_1.createCashLimitService)({
            amount,
            country,
            countryCode,
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Cash limit created successfully",
            data: newCashLimit,
        });
    }
    catch (error) {
        console.error("Error creating cash limit:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createCashLimit = createCashLimit;
// GET ALL Cash Limits
const getAllCashLimits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, country, countryCode } = req.query;
        const parsedSkip = parseInt(skip, 10) || 0;
        const filter = {};
        if (country)
            filter.country = country;
        if (countryCode)
            filter.countryCode = countryCode;
        const result = yield (0, cashLimit_1.getAllCashLimitsService)(parsedSkip, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Cash limits fetched successfully",
            total: result.total,
            data: result.data,
        });
    }
    catch (error) {
        console.error("Error fetching cash limits:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getAllCashLimits = getAllCashLimits;
// GET Cash Limit by ID
const getCashLimitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cashLimit = yield (0, cashLimit_1.getCashLimitByIdService)(req.params.id);
        if (!cashLimit) {
            return res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Cash limit not found",
            });
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Cash limit fetched successfully",
            data: cashLimit,
        });
    }
    catch (error) {
        console.error("Error fetching cash limit by ID:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getCashLimitById = getCashLimitById;
// UPDATE Cash Limit
const updateCashLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { amount, country, countryCode } = req.body;
        const updated = yield (0, cashLimit_1.updateCashLimitService)({
            id,
            amount,
            country,
            countryCode,
        });
        if (!updated) {
            return res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Cash limit not found",
            });
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Cash limit updated successfully",
            data: updated,
        });
    }
    catch (error) {
        console.error("Error updating cash limit:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateCashLimit = updateCashLimit;
// DELETE Cash Limit
const deleteCashLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield (0, cashLimit_1.deleteCashLimitService)(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Cash limit not found",
            });
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Cash limit deleted successfully",
            data: deleted,
        });
    }
    catch (error) {
        console.error("Error deleting cash limit:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteCashLimit = deleteCashLimit;
