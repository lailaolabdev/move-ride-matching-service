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
exports.deleteFestivalPromotionService = exports.updateFestivalPromotionService = exports.getFestivalPromotionByIdService = exports.getAllFestivalPromotionsService = exports.createFestivalPromotionService = void 0;
const festivalPromotion_1 = __importDefault(require("../models/festivalPromotion"));
// CREATE Festival Promotion
const createFestivalPromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, discount, usingType, period, country }) {
    try {
        const festivalPromotion = new festivalPromotion_1.default({
            name,
            discount,
            usingType,
            period,
            country,
        });
        const savedFestivalPromotion = yield festivalPromotion.save();
        return savedFestivalPromotion;
    }
    catch (error) {
        throw error;
    }
});
exports.createFestivalPromotionService = createFestivalPromotionService;
// READ All Festival Promotions
const getAllFestivalPromotionsService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield festivalPromotion_1.default.countDocuments();
        const festivalPromotions = yield festivalPromotion_1.default
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, festivalPromotions };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllFestivalPromotionsService = getAllFestivalPromotionsService;
// READ Festival Promotion by ID
const getFestivalPromotionByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const festivalPromotion = yield festivalPromotion_1.default.findById(id);
        return festivalPromotion;
    }
    catch (error) {
        throw error;
    }
});
exports.getFestivalPromotionByIdService = getFestivalPromotionByIdService;
// UPDATE Festival Promotion
const updateFestivalPromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, discount, usingType, period, status, country }) {
    try {
        const updatedFestivalPromotion = yield festivalPromotion_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                discount,
                usingType,
                period,
                status,
                country,
            },
        }, { new: true });
        return updatedFestivalPromotion;
    }
    catch (error) {
        console.log("Error updating festival promotion: ", error);
        throw error;
    }
});
exports.updateFestivalPromotionService = updateFestivalPromotionService;
// DELETE Festival Promotion
const deleteFestivalPromotionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedFestivalPromotion = yield festivalPromotion_1.default.findByIdAndDelete(id);
        return deletedFestivalPromotion;
    }
    catch (error) {
        console.log("Error deleting festival promotion: ", error);
        throw error;
    }
});
exports.deleteFestivalPromotionService = deleteFestivalPromotionService;
