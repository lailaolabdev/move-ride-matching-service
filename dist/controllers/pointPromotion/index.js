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
exports.deletePointPromotion = exports.updatePointPromotion = exports.getPointPromotionById = exports.getAllPointPromotions = exports.createPointPromotion = void 0;
const pointPromotion_1 = require("../../services/pointPromotion");
const index_1 = require("../../config/index");
const helper_1 = require("./helper");
// CREATE
const createPointPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, minAmount, pointReward, status, startDate, endDate, country } = req.body;
        const pointPromotion = yield (0, pointPromotion_1.createPointPromotionService)({
            name,
            type,
            minAmount,
            pointReward,
            status,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            country
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Point promotion created successfully",
            pointPromotion,
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
exports.createPointPromotion = createPointPromotion;
// READ ALL
const getAllPointPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, name, type, status, country, minAmount, pointReward, startDate, endDate, createdStartDate, createdEndDate } = req.query;
        const parsedSkip = parseInt(skip, 10) || 0;
        const parsedLimit = parseInt(limit, 10) || 10;
        const filter = (0, helper_1.filterPointPromotion)(name, type, status, startDate, endDate, country, minAmount, pointReward, createdStartDate, createdEndDate);
        const pointPromotions = yield (0, pointPromotion_1.getAllPointPromotionsService)(parsedSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Point promotions fetched successfully",
            pointPromotions,
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
exports.getAllPointPromotions = getAllPointPromotions;
// READ BY ID
const getPointPromotionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pointPromotion = yield (0, pointPromotion_1.getPointPromotionByIdService)(req.params.id);
        if (!pointPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Point promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Point promotion fetched successfully",
            pointPromotion,
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
exports.getPointPromotionById = getPointPromotionById;
// UPDATE
const updatePointPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, type, minAmount, pointReward, status, startDate, endDate, country } = req.body;
        const updatedPointPromotion = yield (0, pointPromotion_1.updatePointPromotionService)({
            id,
            name,
            type,
            minAmount,
            pointReward,
            status,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined
        });
        if (!updatedPointPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Point promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Point promotion updated successfully",
            updatedPointPromotion,
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
exports.updatePointPromotion = updatePointPromotion;
// DELETE
const deletePointPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPointPromotion = yield (0, pointPromotion_1.deletePointPromotionService)(req.params.id);
        if (!deletedPointPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Point promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Point promotion deleted successfully",
            deletedPointPromotion,
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
exports.deletePointPromotion = deletePointPromotion;
