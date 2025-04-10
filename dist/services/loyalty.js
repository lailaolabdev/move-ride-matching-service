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
exports.deleteLoyaltyService = exports.updateLoyaltyService = exports.getLoyaltyByIdService = exports.getAllLoyaltyService = exports.createLoyaltyService = void 0;
const loyalty_1 = require("../models/loyalty");
const createLoyaltyService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const { image, name, quantity, price, countryId, countryCode } = req.body;
        const loyalty = yield loyalty_1.loyaltyModel.create({
            image,
            name,
            quantity,
            price,
            countryId,
            countryCode,
            createdBy: user
        });
        return loyalty;
    }
    catch (error) {
        console.log("Error creating loyalty: ", error);
        throw error;
    }
});
exports.createLoyaltyService = createLoyaltyService;
const getAllLoyaltyService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield loyalty_1.loyaltyModel.countDocuments(filter);
        const Loyalties = yield loyalty_1.loyaltyModel.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, Loyalties };
    }
    catch (error) {
        console.log("Error retrieving loyalties: ", error);
        throw error;
    }
});
exports.getAllLoyaltyService = getAllLoyaltyService;
const getLoyaltyByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loyalty = yield loyalty_1.loyaltyModel.findById(id);
        return loyalty;
    }
    catch (error) {
        console.log("Error retrieving loyalty by ID: ", error);
        throw error;
    }
});
exports.getLoyaltyByIdService = getLoyaltyByIdService;
const updateLoyaltyService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = req.user.id;
        const { image, name, quantity, price } = req.body;
        const updatedLoyalty = yield loyalty_1.loyaltyModel.findByIdAndUpdate(id, {
            image,
            name,
            quantity,
            price,
            updatedBy: user
        }, { new: true });
        return updatedLoyalty;
    }
    catch (error) {
        console.log("Error updating loyalty: ", error);
        throw error;
    }
});
exports.updateLoyaltyService = updateLoyaltyService;
const deleteLoyaltyService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedLoyalty = yield loyalty_1.loyaltyModel.findByIdAndDelete(id);
        return deletedLoyalty;
    }
    catch (error) {
        console.log("Error deleting loyalty: ", error);
        throw error;
    }
});
exports.deleteLoyaltyService = deleteLoyaltyService;
