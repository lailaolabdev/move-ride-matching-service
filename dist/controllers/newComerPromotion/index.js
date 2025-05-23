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
exports.deleteNewComerPromotion = exports.updateNewComerPromotion = exports.getNewComerPromotionById = exports.getAllNewComerPromotions = exports.createNewComerPromotion = void 0;
const newComerPromotion_1 = require("../../services/newComerPromotion");
const index_1 = require("../../config/index");
const helper_1 = require("../festivalPromotion/helper"); // Rename if specific to newcomer
// CREATE
const createNewComerPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, discount, country } = req.body;
        const newComerPromotion = yield (0, newComerPromotion_1.createNewComerPromotionService)({
            name,
            discount,
            country,
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Newcomer promotion created successfully",
            newComerPromotion,
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
exports.createNewComerPromotion = createNewComerPromotion;
// READ ALL
const getAllNewComerPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, name, usingType, startDate, endDate } = req.query;
        const parsedSkip = parseInt(skip, 10) || 0;
        const parsedLimit = parseInt(limit, 10) || 10;
        const filter = (0, helper_1.filterPromotion)(name);
        const newComerPromotions = yield (0, newComerPromotion_1.getAllNewComerPromotionsService)(parsedSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Newcomer promotions fetched successfully",
            newComerPromotions,
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
exports.getAllNewComerPromotions = getAllNewComerPromotions;
// READ BY ID
const getNewComerPromotionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComerPromotion = yield (0, newComerPromotion_1.getNewComerPromotionByIdService)(req.params.id);
        if (!newComerPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Newcomer promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Newcomer promotion fetched successfully",
            newComerPromotion,
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
exports.getNewComerPromotionById = getNewComerPromotionById;
// UPDATE
const updateNewComerPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, discount, status, country } = req.body;
        const updatedNewComerPromotion = yield (0, newComerPromotion_1.updateNewComerPromotionService)({
            id,
            name,
            discount,
            status,
            country,
        });
        if (!updatedNewComerPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Newcomer promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Newcomer promotion updated successfully",
            updatedNewComerPromotion,
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
exports.updateNewComerPromotion = updateNewComerPromotion;
// DELETE
const deleteNewComerPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedNewComerPromotion = yield (0, newComerPromotion_1.deleteNewComerPromotionService)(req.params.id);
        if (!deletedNewComerPromotion) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Newcomer promotion not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Newcomer promotion deleted successfully",
            deletedNewComerPromotion,
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
exports.deleteNewComerPromotion = deleteNewComerPromotion;
