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
exports.getAllNewComerPromotionUsageService = exports.recordNewComerPromotionUsageService = exports.checkNewComerPromotionUsageService = exports.deleteNewComerPromotionService = exports.updateNewComerPromotionService = exports.getNewComerPromotionByIdService = exports.getAllNewComerPromotionsService = exports.createNewComerPromotionService = void 0;
const newComerPromotion_1 = __importDefault(require("../models/newComerPromotion"));
const newComerPromotionUsage_1 = __importDefault(require("../models/newComerPromotionUsage"));
// CREATE NewComer Promotion
const createNewComerPromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, discount, country }) {
    try {
        const newComerPromotion = new newComerPromotion_1.default({
            name,
            discount,
            country,
        });
        const savedNewComerPromotion = yield newComerPromotion.save();
        return savedNewComerPromotion;
    }
    catch (error) {
        throw error;
    }
});
exports.createNewComerPromotionService = createNewComerPromotionService;
// READ All NewComer Promotions
const getAllNewComerPromotionsService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield newComerPromotion_1.default.countDocuments(filter);
        const newComerPromotions = yield newComerPromotion_1.default
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, newComerPromotions };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllNewComerPromotionsService = getAllNewComerPromotionsService;
// READ NewComer Promotion by ID
const getNewComerPromotionByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComerPromotion = yield newComerPromotion_1.default.findById(id);
        return newComerPromotion;
    }
    catch (error) {
        throw error;
    }
});
exports.getNewComerPromotionByIdService = getNewComerPromotionByIdService;
// UPDATE NewComer Promotion
const updateNewComerPromotionService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, discount, status, country }) {
    try {
        const updateData = {
            name,
            discount,
            country,
        };
        // Only include status if it's provided (not undefined)
        if (status !== undefined) {
            updateData.status = status;
        }
        const updatedNewComerPromotion = yield newComerPromotion_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        return updatedNewComerPromotion;
    }
    catch (error) {
        console.log("Error updating newcomer promotion: ", error);
        throw error;
    }
});
exports.updateNewComerPromotionService = updateNewComerPromotionService;
// DELETE NewComer Promotion
const deleteNewComerPromotionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedNewComerPromotion = yield newComerPromotion_1.default.findByIdAndDelete(id);
        return deletedNewComerPromotion;
    }
    catch (error) {
        console.log("Error deleting newcomer promotion: ", error);
        throw error;
    }
});
exports.deleteNewComerPromotionService = deleteNewComerPromotionService;
// CHECK if user has already used newcomer promotion
const checkNewComerPromotionUsageService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, country }) {
    try {
        const usageRecord = yield newComerPromotionUsage_1.default
            .findOne({ userId, country })
            .populate('newComerPromotionId');
        return {
            hasUsed: !!usageRecord,
            usageDetails: usageRecord
        };
    }
    catch (error) {
        console.log("Error checking newcomer promotion usage: ", error);
        throw error;
    }
});
exports.checkNewComerPromotionUsageService = checkNewComerPromotionUsageService;
// RECORD newcomer promotion usage
const recordNewComerPromotionUsageService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, newComerPromotionId, country }) {
    try {
        const usageRecord = new newComerPromotionUsage_1.default({
            userId,
            newComerPromotionId,
            country
        });
        const savedUsageRecord = yield usageRecord.save();
        return savedUsageRecord;
    }
    catch (error) {
        console.log("Error recording newcomer promotion usage: ", error);
        throw error;
    }
});
exports.recordNewComerPromotionUsageService = recordNewComerPromotionUsageService;
// GET all newcomer promotion usage records (for admin purposes)
const getAllNewComerPromotionUsageService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield newComerPromotionUsage_1.default.countDocuments(filter);
        const usageRecords = yield newComerPromotionUsage_1.default
            .find(filter)
            .populate('userId', 'name email') // Adjust fields as needed
            .populate('newComerPromotionId')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, usageRecords };
    }
    catch (error) {
        console.log("Error fetching newcomer promotion usage records: ", error);
        throw error;
    }
});
exports.getAllNewComerPromotionUsageService = getAllNewComerPromotionUsageService;
