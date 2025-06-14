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
exports.getRatingWithInfo = exports.deleteRating = exports.updateRating = exports.getRatingById = exports.getAllRatings = exports.createRating = void 0;
const rating_1 = require("../../services/rating");
const config_1 = require("../../config");
const rating_2 = require("../../models/rating");
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const existingRating = yield rating_2.ratingModel.findOne({ userId });
        if (existingRating) {
            res.status(400).json({
                code: config_1.messages.ALREADY_EXIST.code,
                messages: `Rating ${config_1.messages.ALREADY_EXIST.message}`,
            });
            return;
        }
        const rating = yield (0, rating_1.createRatingService)(req);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: "Rating created successfully",
            rating,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createRating = createRating;
const getAllRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, userId } = req.query;
        const parseSkip = parseInt(skip, 10) || 0;
        const parsedLimit = parseInt(limit, 10) || 10;
        const filter = {};
        if (userId)
            filter.userId = userId;
        const ratings = yield (0, rating_1.getAllRatingsService)(parseSkip, parsedLimit, filter);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, message: "Ratings fetched successfully" }, ratings));
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getAllRatings = getAllRatings;
const getRatingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield (0, rating_1.getRatingByIdService)(req.params.id);
        if (!rating) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Rating not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Rating fetched successfully",
            rating,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getRatingById = getRatingById;
const updateRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRating = yield (0, rating_1.updateRatingService)(req);
        if (!updatedRating) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Rating not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Rating updated successfully",
            rating: updatedRating,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateRating = updateRating;
const deleteRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedRating = yield (0, rating_1.deleteRatingService)(req.params.id);
        if (!deletedRating) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Rating not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Rating deleted successfully",
            rating: deletedRating,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteRating = deleteRating;
const getRatingWithInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rating = yield (0, rating_1.getRatingWithInfoService)(req.params.id);
        if (!rating) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Driver info not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "driver info fetched successfully",
            rating,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getRatingWithInfo = getRatingWithInfo;
