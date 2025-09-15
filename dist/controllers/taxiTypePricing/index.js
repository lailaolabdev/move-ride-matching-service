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
exports.deleteTaxiTypePricing = exports.updateTaxiTypePricing = exports.getTaxiTypePricingById = exports.getAllTaxiTypePricing = exports.createTaxiTypePricing = void 0;
const taxiTypePricing_1 = require("../../services/taxiTypePricing");
const index_1 = require("../../config/index"); // Assuming you have a messages file for status codes
const taxiTypePricing_2 = __importDefault(require("../../models/taxiTypePricing"));
// CREATE Taxi Type
const createTaxiTypePricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxiTypeId, minDistance, maxDistance, meterPrice, flatFarePrice, country, countryCode } = req.body;
        // ✅ Validation: minDistance must be less than maxDistance
        if (minDistance >= maxDistance) {
            res.status(400).json({
                code: index_1.messages.BAD_REQUEST.code,
                message: index_1.messages.BAD_REQUEST.message,
                detail: "minDistance must be less than maxDistance"
            });
            return;
        }
        const existingTaxiTypePricing = yield taxiTypePricing_2.default.find({
            taxiTypeId,
            countryCode,
            country
        });
        for (let i = 0; i < existingTaxiTypePricing.length; i++) {
            const taxiTypePricing = existingTaxiTypePricing[i];
            if (taxiTypePricing.minDistance < maxDistance) {
                res.status(400).json({
                    code: index_1.messages.BAD_REQUEST.code,
                    message: index_1.messages.BAD_REQUEST.message,
                    detail: "Taxi Type Pricing overlaps with existing entry"
                });
                return;
            }
        }
        const taxiTypePricing = yield (0, taxiTypePricing_1.createTaxiTypePricingService)({
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            countryCode
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Taxi Type created successfully",
            taxiTypePricing,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.createTaxiTypePricing = createTaxiTypePricing;
// READ All Taxi Types
const getAllTaxiTypePricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxiTypeId, skip, limit } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = {};
        if (taxiTypeId)
            filter.taxiTypeId = taxiTypeId;
        const taxiTypePricings = yield (0, taxiTypePricing_1.getAllTaxiTypePricingService)(parseSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Types fetched successfully",
            taxiTypePricings,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.getAllTaxiTypePricing = getAllTaxiTypePricing;
// READ Taxi Type by ID
const getTaxiTypePricingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiTypePricing = yield (0, taxiTypePricing_1.getTaxiTypePricingByIdService)(req.params.id);
        if (!taxiTypePricing) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Type fetched successfully",
            taxiTypePricing,
        });
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.getTaxiTypePricingById = getTaxiTypePricingById;
// UPDATE Taxi Type
const updateTaxiTypePricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { taxiTypeId, minDistance, maxDistance, meterPrice, flatFarePrice, country, countryCode } = req.body;
        const updatedTaxiTypePricing = yield (0, taxiTypePricing_1.updateTaxiTypePricingService)({
            id,
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            countryCode
        });
        if (!updatedTaxiTypePricing) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Type updated successfully",
            updatedTaxiTypePricing,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.updateTaxiTypePricing = updateTaxiTypePricing;
// DELETE Taxi Type
const deleteTaxiTypePricing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTaxiTypePricing = yield (0, taxiTypePricing_1.deleteTaxiTypePricingService)(req.params.id);
        if (!deletedTaxiTypePricing) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Type deleted successfully",
            deletedTaxiTypePricing,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.deleteTaxiTypePricing = deleteTaxiTypePricing;
