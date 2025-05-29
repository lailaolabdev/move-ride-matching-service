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
exports.deleteTaxiTypePricingService = exports.updateTaxiTypePricingService = exports.getTaxiTypePricingByIdService = exports.getAllTaxiTypePricingService = exports.createTaxiTypePricingService = void 0;
const taxiTypePricing_1 = __importDefault(require("../models/taxiTypePricing"));
// CREATE
const createTaxiTypePricingService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ taxiTypeId, minDistance, maxDistance, meterPrice, flatFarePrice, country }) {
    try {
        const taxiTypePricing = new taxiTypePricing_1.default({
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country
        });
        const savedTaxiTypePricing = yield taxiTypePricing.save();
        return savedTaxiTypePricing;
    }
    catch (error) {
        throw error;
    }
});
exports.createTaxiTypePricingService = createTaxiTypePricingService;
// READ (All Taxi Types)
const getAllTaxiTypePricingService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield taxiTypePricing_1.default.countDocuments();
        const taxiTypePricing = yield taxiTypePricing_1.default
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, taxiTypePricing };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllTaxiTypePricingService = getAllTaxiTypePricingService;
// READ (Taxi Type by ID)
const getTaxiTypePricingByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiTypePricing = yield taxiTypePricing_1.default.findById(id);
        return taxiTypePricing;
    }
    catch (error) {
        throw error;
    }
});
exports.getTaxiTypePricingByIdService = getTaxiTypePricingByIdService;
// UPDATE
const updateTaxiTypePricingService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, taxiTypeId, minDistance, maxDistance, meterPrice, flatFarePrice, country }) {
    try {
        const updatedTaxiTypePricing = yield taxiTypePricing_1.default.findByIdAndUpdate(id, {
            $set: {
                taxiTypeId,
                minDistance,
                maxDistance,
                meterPrice,
                flatFarePrice,
                country
            },
        }, { new: true });
        return updatedTaxiTypePricing;
    }
    catch (error) {
        console.log("Error updating taxi type: ", error);
        throw error;
    }
});
exports.updateTaxiTypePricingService = updateTaxiTypePricingService;
// DELETE
const deleteTaxiTypePricingService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTaxiTypePricing = yield taxiTypePricing_1.default.findByIdAndDelete(id);
        return deleteTaxiTypePricing;
    }
    catch (error) {
        console.log("Error deleting taxi type: ", error);
        throw error;
    }
});
exports.deleteTaxiTypePricingService = deleteTaxiTypePricingService;
