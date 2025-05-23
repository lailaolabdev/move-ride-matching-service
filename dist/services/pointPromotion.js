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
exports.deletePointPromotionService = exports.updatePointPromotionService = exports.getPointPromotionByIdService = exports.getAllPointPromotionsService = exports.createPointPromotionService = void 0;
const pointPromotion_1 = __importDefault(require("../models/pointPromotion"));
// CREATE Point Promotion
const createPointPromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, type, minAmount, pointReward, status, startDate, endDate, country }) {
    try {
        const pointPromotion = new pointPromotion_1.default({
            name,
            type,
            minAmount,
            pointReward,
            status,
            startDate,
            endDate,
            country
        });
        const savedPointPromotion = yield pointPromotion.save();
        return savedPointPromotion;
    }
    catch (error) {
        throw error;
    }
});
exports.createPointPromotionService = createPointPromotionService;
// READ All Point Promotions
const getAllPointPromotionsService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield pointPromotion_1.default.countDocuments(filter);
        const pointPromotions = yield pointPromotion_1.default
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, pointPromotions };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllPointPromotionsService = getAllPointPromotionsService;
// READ Point Promotion by ID
const getPointPromotionByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pointPromotion = yield pointPromotion_1.default.findById(id);
        return pointPromotion;
    }
    catch (error) {
        throw error;
    }
});
exports.getPointPromotionByIdService = getPointPromotionByIdService;
// UPDATE Point Promotion
const updatePointPromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, type, minAmount, pointReward, status, startDate, endDate, country }) {
    try {
        const updatedPointPromotion = yield pointPromotion_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                type,
                minAmount,
                pointReward,
                status,
                startDate,
                endDate,
                country
            },
        }, { new: true });
        return updatedPointPromotion;
    }
    catch (error) {
        console.log("Error updating point promotion: ", error);
        throw error;
    }
});
exports.updatePointPromotionService = updatePointPromotionService;
// DELETE Point Promotion
const deletePointPromotionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPointPromotion = yield pointPromotion_1.default.findByIdAndDelete(id);
        return deletedPointPromotion;
    }
    catch (error) {
        console.log("Error deleting point promotion: ", error);
        throw error;
    }
});
exports.deletePointPromotionService = deletePointPromotionService;
