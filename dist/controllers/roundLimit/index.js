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
exports.deleteRoundLimit = exports.updateRoundLimit = exports.getRoundLimitById = exports.getAllRoundLimits = exports.createRoundLimit = void 0;
const roundLimit_1 = require("../../services/roundLimit");
const index_1 = require("../../config/index");
// CREATE Round Limit
const createRoundLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { round, country, countryCode } = req.body;
        const newRoundLimit = yield (0, roundLimit_1.createRoundLimitService)({
            round,
            country,
            countryCode,
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Round limit created successfully",
            data: newRoundLimit,
        });
    }
    catch (error) {
        console.error("Error creating round limit:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createRoundLimit = createRoundLimit;
// GET ALL Round Limits
const getAllRoundLimits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, country, countryCode } = req.query;
        const parsedSkip = parseInt(skip, 10) || 0;
        const filter = {};
        if (country)
            filter.country = country;
        if (countryCode)
            filter.countryCode = countryCode;
        const result = yield (0, roundLimit_1.getAllRoundLimitsService)(parsedSkip, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Round limits fetched successfully",
            total: result.total,
            data: result.data,
        });
    }
    catch (error) {
        console.error("Error fetching round limits:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getAllRoundLimits = getAllRoundLimits;
// GET Round Limit by ID
const getRoundLimitById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roundLimit = yield (0, roundLimit_1.getRoundLimitByIdService)(req.params.id);
        if (!roundLimit) {
            return res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Round limit not found",
            });
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Round limit fetched successfully",
            data: roundLimit,
        });
    }
    catch (error) {
        console.error("Error fetching round limit by ID:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getRoundLimitById = getRoundLimitById;
// UPDATE Round Limit
const updateRoundLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { round, country, countryCode } = req.body;
        const updated = yield (0, roundLimit_1.updateRoundLimitService)({
            id,
            round,
            country,
            countryCode,
        });
        if (!updated) {
            return res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Round limit not found",
            });
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Round limit updated successfully",
            data: updated,
        });
    }
    catch (error) {
        console.error("Error updating round limit:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateRoundLimit = updateRoundLimit;
// DELETE Round Limit
const deleteRoundLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield (0, roundLimit_1.deleteRoundLimitService)(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Round limit not found",
            });
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Round limit deleted successfully",
            data: deleted,
        });
    }
    catch (error) {
        console.error("Error deleting round limit:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteRoundLimit = deleteRoundLimit;
