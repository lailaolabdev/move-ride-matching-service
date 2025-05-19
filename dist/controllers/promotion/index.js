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
exports.deletePromotion = exports.updatePromotion = exports.getPromotionById = exports.getAllPromotions = exports.createPromotion = void 0;
const promotion_1 = require("../../services/promotion");
const index_1 = require("../../config/index");
const helper_1 = require("./helper");
// CREATE
const createPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, discount, usingType, period, country } = req.body;
        const promotion = yield (0, promotion_1.createPromotionService)({
            name,
            discount,
            usingType,
            period,
            country,
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Promotion created successfully",
            promotion,
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
exports.createPromotion = createPromotion;
// READ ALL
const getAllPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, name, usingType, startDate, endDate } = req.query;
        const parsedSkip = parseInt(skip, 10) || 0;
        const parsedLimit = parseInt(limit, 10) || 10;
        const filter = (0, helper_1.filterPromotion)(name, usingType, startDate, endDate);
        const promotions = yield (0, promotion_1.getAllPromotionsService)(parsedSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Promotions fetched successfully",
            promotions,
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
exports.getAllPromotions = getAllPromotions;
// READ BY ID
const getPromotionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotion = yield (0, promotion_1.getPromotionByIdService)(req.params.id);
        if (!promotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Promotion fetched successfully",
            promotion,
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
exports.getPromotionById = getPromotionById;
// UPDATE
const updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, discount, usingType, period, status, country } = req.body;
        const updatedPromotion = yield (0, promotion_1.updatePromotionService)({
            id,
            name,
            discount,
            usingType,
            period,
            status,
            country,
        });
        if (!updatedPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Promotion updated successfully",
            updatedPromotion,
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
exports.updatePromotion = updatePromotion;
// DELETE
const deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPromotion = yield (0, promotion_1.deletePromotionService)(req.params.id);
        if (!deletedPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Promotion deleted successfully",
            deletedPromotion,
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
exports.deletePromotion = deletePromotion;
