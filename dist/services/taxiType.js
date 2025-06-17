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
exports.getTaxiDistance = exports.deleteTaxiTypeService = exports.updateTaxiTypeService = exports.getTaxiTypeByIdService = exports.getAllTaxiTypeService = exports.createTaxiTypeService = void 0;
const taxiType_1 = __importDefault(require("../models/taxiType"));
// CREATE
const createTaxiTypeService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, icon, seats, minDistance, maxDistance, meterPrice, flatFarePrice, country, createdBy, createdByFullName }) {
    try {
        const taxiType = new taxiType_1.default({
            name,
            icon,
            seats,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            createdBy,
            createdByFullName
        });
        const savedTaxiType = yield taxiType.save();
        return savedTaxiType;
    }
    catch (error) {
        throw error;
    }
});
exports.createTaxiTypeService = createTaxiTypeService;
// READ (All Taxi Types)
const getAllTaxiTypeService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield taxiType_1.default.countDocuments(filter);
        const taxiType = yield taxiType_1.default
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, taxiType };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllTaxiTypeService = getAllTaxiTypeService;
// READ (Taxi Type by ID)
const getTaxiTypeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiType = yield taxiType_1.default.findById(id);
        return taxiType;
    }
    catch (error) {
        throw error;
    }
});
exports.getTaxiTypeByIdService = getTaxiTypeByIdService;
// UPDATE
const updateTaxiTypeService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, icon, seats, minDistance, maxDistance, meterPrice, flatFarePrice, country, updatedBy, updatedByFullName, }) {
    try {
        const updatedTaxiType = yield taxiType_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                icon,
                seats,
                minDistance,
                maxDistance,
                meterPrice,
                flatFarePrice,
                country,
                updatedBy,
                updatedByFullName,
            },
        }, { new: true });
        return updatedTaxiType;
    }
    catch (error) {
        console.log("Error updating taxi type: ", error);
        throw error;
    }
});
exports.updateTaxiTypeService = updateTaxiTypeService;
// DELETE
const deleteTaxiTypeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTaxiType = yield taxiType_1.default.findByIdAndDelete(id);
        return deleteTaxiType;
    }
    catch (error) {
        console.log("Error deleting taxi type: ", error);
        throw error;
    }
});
exports.deleteTaxiTypeService = deleteTaxiTypeService;
const getTaxiDistance = (_a) => __awaiter(void 0, [_a], void 0, function* ({ country, distance }) {
    try {
        return yield taxiType_1.default.aggregate([
            {
                $match: {
                    country: country ? country : "LA",
                    minDistance: { $lte: distance },
                    maxDistance: { $gt: distance },
                },
            },
            {
                $lookup: {
                    from: 'taxitypes', // name of the referenced collection
                    localField: 'taxiTypeId',
                    foreignField: '_id',
                    as: 'taxiType',
                },
            },
            {
                $unwind: '$taxiType', // optional: flatten the array
            },
        ]);
    }
    catch (error) {
    }
});
exports.getTaxiDistance = getTaxiDistance;
