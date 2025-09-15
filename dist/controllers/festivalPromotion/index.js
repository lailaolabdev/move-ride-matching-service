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
exports.updateFestivalPromotionByDate = exports.deleteFestivalPromotion = exports.updateFestivalPromotion = exports.getFestivalPromotionById = exports.getAllFestivalPromotions = exports.createFestivalPromotion = void 0;
const festivalPromotion_1 = require("../../services/festivalPromotion");
const index_1 = require("../../config/index");
const helper_1 = require("./helper"); // You may rename this to filterFestivalPromotion if applicable
// CREATE
const createFestivalPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, discount, usingType, periodStartTime, periodEndTime, country } = req.body;
        const festivalPromotion = yield (0, festivalPromotion_1.createFestivalPromotionService)({
            name,
            discount,
            usingType,
            periodStartTime: new Date(periodStartTime),
            periodEndTime: new Date(periodEndTime),
            country,
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Festival promotion created successfully",
            festivalPromotion,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createFestivalPromotion = createFestivalPromotion;
// READ ALL
const getAllFestivalPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, name, usingType, startDate, endDate, status, country, periodStartTime, periodEndTime } = req.query;
        const parsedSkip = parseInt(skip, 10) || 0;
        const parsedLimit = parseInt(limit, 10) || 10;
        const filter = (0, helper_1.filterPromotion)(name, usingType, startDate, endDate, status, country, periodStartTime, periodEndTime);
        const festivalPromotions = yield (0, festivalPromotion_1.getAllFestivalPromotionsService)(parsedSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Festival promotions fetched successfully",
            festivalPromotions,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getAllFestivalPromotions = getAllFestivalPromotions;
// READ BY ID
const getFestivalPromotionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const festivalPromotion = yield (0, festivalPromotion_1.getFestivalPromotionByIdService)(req.params.id);
        if (!festivalPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Festival promotion fetched successfully",
            festivalPromotion,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getFestivalPromotionById = getFestivalPromotionById;
// UPDATE
const updateFestivalPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, discount, usingType, periodStartTime, periodEndTime, status, country } = req.body;
        const updatedFestivalPromotion = yield (0, festivalPromotion_1.updateFestivalPromotionService)({
            id,
            name,
            discount,
            usingType,
            periodStartTime: periodStartTime ? new Date(periodStartTime) : undefined,
            periodEndTime: periodEndTime ? new Date(periodEndTime) : undefined,
            status,
            country,
        });
        if (!updatedFestivalPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Festival promotion updated successfully",
            updatedFestivalPromotion,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateFestivalPromotion = updateFestivalPromotion;
// DELETE
const deleteFestivalPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedFestivalPromotion = yield (0, festivalPromotion_1.deleteFestivalPromotionService)(req.params.id);
        if (!deletedFestivalPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Festival promotion deleted successfully",
            deletedFestivalPromotion,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteFestivalPromotion = deleteFestivalPromotion;
// UPDATE Promotion when it less than current date
const updateFestivalPromotionByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, country } = req.body;
        const updatedFestivalPromotion = yield (0, festivalPromotion_1.updateFestivalPromotionByDateService)({
            date,
            country
        });
        if (!updatedFestivalPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Festival promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Festival promotion updated successfully",
            updatedFestivalPromotion,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateFestivalPromotionByDate = updateFestivalPromotionByDate;
