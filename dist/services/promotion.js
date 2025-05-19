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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePromotionService = exports.updatePromotionService = exports.getPromotionByIdService = exports.getAllPromotionsService = exports.createPromotionService = void 0;
const promotion_1 = __importDefault(require("../models/promotion"));
// CREATE Promotion
const createPromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, discount, usingType, period, country }) {
    try {
        const promotion = new promotion_1.default({
            name,
            discount,
            usingType,
            period,
            country,
        });
        const savedPromotion = yield promotion.save();
        return savedPromotion;
    }
    catch (error) {
        throw error;
    }
});
exports.createPromotionService = createPromotionService;
// READ All Promotions
const getAllPromotionsService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield promotion_1.default.countDocuments();
        const promotions = yield promotion_1.default
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, promotions };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllPromotionsService = getAllPromotionsService;
// READ Promotion by ID
const getPromotionByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotion = yield promotion_1.default.findById(id);
        return promotion;
    }
    catch (error) {
        throw error;
    }
});
exports.getPromotionByIdService = getPromotionByIdService;
// UPDATE Promotion
const updatePromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, discount, usingType, period, status, country }) {
    try {
        const updatedPromotion = yield promotion_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                discount,
                usingType,
                period,
                status,
                country,
            },
        }, { new: true });
        return updatedPromotion;
    }
    catch (error) {
        console.log("Error updating promotion: ", error);
        throw error;
    }
});
exports.updatePromotionService = updatePromotionService;
// DELETE Promotion
const deletePromotionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPromotion = yield promotion_1.default.findByIdAndDelete(id);
        return deletedPromotion;
    }
    catch (error) {
        console.log("Error deleting promotion: ", error);
        throw error;
    }
});
exports.deletePromotionService = deletePromotionService;
