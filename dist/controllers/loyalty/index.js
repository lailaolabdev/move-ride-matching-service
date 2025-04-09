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
exports.deleteLoyalty = exports.updateLoyalty = exports.getLoyaltyById = exports.getAllLoyalty = exports.createLoyalty = void 0;
const loyalty_1 = require("../../services/loyalty");
const config_1 = require("../../config");
const loyalty_2 = require("../../models/loyalty");
const createLoyalty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const existingLoyalty = yield loyalty_2.loyaltyModel.findOne({ name });
        if (existingLoyalty) {
            res.status(400).json({
                code: config_1.messages.ALREADY_EXIST.code,
                messages: `Loyalty ${config_1.messages.ALREADY_EXIST.message}`
            });
            return;
        }
        const loyalty = yield (0, loyalty_1.createLoyaltyService)(req);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: "Loyalty created successfully",
            loyalty,
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
exports.createLoyalty = createLoyalty;
const getAllLoyalty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, country, countryCode } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = {};
        if (country)
            filter.countryId = country;
        if (countryCode)
            filter.countryCode = countryCode;
        const loyalties = yield (0, loyalty_1.getAllLoyaltyService)(parseSkip, parsedLimit, filter);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Loyalty fetched successfully",
            loyalties,
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
exports.getAllLoyalty = getAllLoyalty;
const getLoyaltyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxi = yield (0, loyalty_1.getLoyaltyByIdService)(req.params.id);
        if (!taxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Vehicle not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Vehicle fetched successfully",
            taxi,
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
exports.getLoyaltyById = getLoyaltyById;
const updateLoyalty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedLoyalty = yield (0, loyalty_1.updateLoyaltyService)(req);
        if (!updatedLoyalty) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Vehicle not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Vehicle updated successfully",
            taxi: updatedLoyalty,
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
exports.updateLoyalty = updateLoyalty;
const deleteLoyalty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedLoyalty = yield (0, loyalty_1.deleteLoyaltyService)(req.params.id);
        if (!deletedLoyalty) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Vehicle not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Vehicle deleted successfully",
            taxi: exports.deleteLoyalty,
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
exports.deleteLoyalty = deleteLoyalty;
