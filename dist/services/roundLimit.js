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
exports.deleteRoundLimitService = exports.updateRoundLimitService = exports.getRoundLimitByIdService = exports.getAllRoundLimitsService = exports.createRoundLimitService = void 0;
const roundLimit_1 = require("../models/roundLimit");
// CREATE
const createRoundLimitService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ round, country, countryCode }) {
    try {
        const data = new roundLimit_1.roundLimitModel({
            round: round !== null && round !== void 0 ? round : 0,
            country,
            countryCode
        });
        return yield data.save();
    }
    catch (error) {
        throw new Error(`Failed to create round limit: ${error}`);
    }
});
exports.createRoundLimitService = createRoundLimitService;
// READ ALL
const getAllRoundLimitsService = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (skip = 0, filter = {}) {
    try {
        const total = yield roundLimit_1.roundLimitModel.countDocuments(filter);
        const data = yield roundLimit_1.roundLimitModel
            .find(filter)
            .skip(skip)
            .sort({ createdAt: -1 });
        return { total, data };
    }
    catch (error) {
        throw new Error(`Failed to fetch round limits: ${error}`);
    }
});
exports.getAllRoundLimitsService = getAllRoundLimitsService;
// READ BY ID
const getRoundLimitByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield roundLimit_1.roundLimitModel.findById(id);
    }
    catch (error) {
        throw new Error(`Failed to get round limit by ID: ${error}`);
    }
});
exports.getRoundLimitByIdService = getRoundLimitByIdService;
// UPDATE
const updateRoundLimitService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, round, country, countryCode }) {
    try {
        const updateData = Object.assign(Object.assign(Object.assign({}, (round !== undefined && { round })), (country !== undefined && { country })), (countryCode !== undefined && { countryCode }));
        return yield roundLimit_1.roundLimitModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    }
    catch (error) {
        throw new Error(`Failed to update round limit: ${error}`);
    }
});
exports.updateRoundLimitService = updateRoundLimitService;
// DELETE
const deleteRoundLimitService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield roundLimit_1.roundLimitModel.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error(`Failed to delete round limit: ${error}`);
    }
});
exports.deleteRoundLimitService = deleteRoundLimitService;
