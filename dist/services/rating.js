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
exports.getRatingWithInfoService = exports.deleteRatingService = exports.updateRatingService = exports.getRatingByIdService = exports.getAllRatingsService = exports.createRatingService = void 0;
const rating_1 = require("../models/rating");
const mongoose_1 = require("mongoose");
// Create a new rating
const createRatingService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, rating } = req.body;
        const newRating = yield rating_1.ratingModel.create({
            userId,
            rating
        });
        return newRating;
    }
    catch (error) {
        console.log('Error creating rating:', error);
        throw error;
    }
});
exports.createRatingService = createRatingService;
// Get all ratings (with optional pagination and filter)
const getAllRatingsService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield rating_1.ratingModel.countDocuments(filter);
        const ratings = yield rating_1.ratingModel.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, ratings };
    }
    catch (error) {
        console.log('Error retrieving ratings:', error);
        throw error;
    }
});
exports.getAllRatingsService = getAllRatingsService;
// Get rating by ID
const getRatingByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield rating_1.ratingModel.findById(id);
    }
    catch (error) {
        console.log('Error retrieving rating by ID:', error);
        throw error;
    }
});
exports.getRatingByIdService = getRatingByIdService;
// Update rating by ID
const updateRatingService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating } = req.body;
        const id = req.params.id;
        const updatedRating = yield rating_1.ratingModel.findByIdAndUpdate(id, { rating }, { new: true });
        return updatedRating;
    }
    catch (error) {
        console.log('Error updating rating:', error);
        throw error;
    }
});
exports.updateRatingService = updateRatingService;
// Delete rating by ID
const deleteRatingService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield rating_1.ratingModel.findByIdAndDelete(id);
    }
    catch (error) {
        console.log('Error deleting rating:', error);
        throw error;
    }
});
exports.deleteRatingService = deleteRatingService;
const getRatingWithInfoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverInfo = yield rating_1.ratingModel.aggregate([
            {
                $match: {
                    userId: new mongoose_1.Types.ObjectId(id)
                }
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
                $project: {
                    _id: 1,
                    rating: 1,
                    fullName: "$user.fullName",
                    profileImage: "$user.profileImage",
                }
            }
        ]);
        return driverInfo.length ? driverInfo[0] : {};
    }
    catch (error) {
        console.log('Error deleting rating:', error);
        throw error;
    }
});
exports.getRatingWithInfoService = getRatingWithInfoService;
