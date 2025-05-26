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
exports.deleteLoyaltyClaimService = exports.updateLoyaltyClaimService = exports.getLoyaltyClaimByIdService = exports.getAllLoyaltyClaimService = exports.createLoyaltyClaimService = void 0;
const loyaltyClaim_1 = require("../models/loyaltyClaim");
const createLoyaltyClaimService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { loyaltyId, acceptedType, address, countryId, countryCode } = req.body;
        const loyaltyClaim = yield loyaltyClaim_1.loyaltyClaimModel.create({
            userId,
            loyaltyId,
            acceptedType,
            address,
            countryId,
            countryCode
        });
        return loyaltyClaim;
    }
    catch (error) {
        console.log("Error creating loyalty claim: ", error);
        throw error;
    }
});
exports.createLoyaltyClaimService = createLoyaltyClaimService;
const getAllLoyaltyClaimService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield loyaltyClaim_1.loyaltyClaimModel.countDocuments(filter);
        const loyalties = yield loyaltyClaim_1.loyaltyClaimModel.aggregate([
            { $match: filter },
            { $skip: skip },
            { $limit: limit },
            {
                $addFields: {
                    userId: { $toObjectId: '$userId' },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'loyalties',
                    localField: 'loyaltyId',
                    foreignField: '_id',
                    as: 'loyalty',
                },
            },
            {
                $unwind: '$loyalty'
            },
            {
                $project: {
                    _id: 1,
                    loyaltyId: 1,
                    acceptedType: 1,
                    address: 1,
                    status: 1,
                    countryCode: 1,
                    'user.firstName': 1,
                    'user.lastName': 1,
                    'user.email': 1,
                    'user.phone': 1,
                    'loyalty.name': 1,
                    'loyalty.price': 1,
                    createdAt: 1,
                }
            }
        ]);
        return { total, loyalties };
    }
    catch (error) {
        console.log("Error retrieving loyalty claim: ", error);
        throw error;
    }
});
exports.getAllLoyaltyClaimService = getAllLoyaltyClaimService;
const getLoyaltyClaimByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loyalty = yield loyaltyClaim_1.loyaltyClaimModel.findById(id);
        return loyalty;
    }
    catch (error) {
        console.log("Error retrieving loyalty claim by ID: ", error);
        throw error;
    }
});
exports.getLoyaltyClaimByIdService = getLoyaltyClaimByIdService;
const updateLoyaltyClaimService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const updatedLoyaltyClaim = yield loyaltyClaim_1.loyaltyClaimModel.findByIdAndUpdate(id, { status }, { new: true });
        return updatedLoyaltyClaim;
    }
    catch (error) {
        console.log("Error updating loyalty claim: ", error);
        throw error;
    }
});
exports.updateLoyaltyClaimService = updateLoyaltyClaimService;
const deleteLoyaltyClaimService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedLoyaltyClaim = yield loyaltyClaim_1.loyaltyClaimModel.findByIdAndDelete(id);
        return deletedLoyaltyClaim;
    }
    catch (error) {
        console.log("Error deleting loyalty claim: ", error);
        throw error;
    }
});
exports.deleteLoyaltyClaimService = deleteLoyaltyClaimService;
