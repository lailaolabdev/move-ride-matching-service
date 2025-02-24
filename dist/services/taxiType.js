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
exports.deleteTaxiTypeService = exports.updateTaxiTypeService = exports.getTaxiTypeByIdService = exports.getAllTaxiTypesService = exports.createTaxiTypeService = void 0;
const config_1 = require("../config");
const taxiType_1 = __importDefault(require("../models/taxiType"));
// CREATE
const createTaxiTypeService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, icon, createdBy, createdByFullName }) {
    try {
        const taxiType = new taxiType_1.default({
            name,
            icon,
            createdBy,
            createdByFullName,
        });
        if (taxiType) {
            yield (0, config_1.deleteKeysByPattern)('taxiTypes*'); // Invalidate the cache (if needed)
        }
        const savedTaxiType = yield taxiType.save();
        return savedTaxiType;
    }
    catch (error) {
        console.log("Error creating taxi type: ", error);
        throw error;
    }
});
exports.createTaxiTypeService = createTaxiTypeService;
// READ (All Taxi Types)
const getAllTaxiTypesService = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield taxiType_1.default.countDocuments();
        const taxiTypes = yield taxiType_1.default.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, taxiTypes };
    }
    catch (error) {
        console.log("Error retrieving taxi types: ", error);
        throw error;
    }
});
exports.getAllTaxiTypesService = getAllTaxiTypesService;
// READ (Taxi Type by ID)
const getTaxiTypeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiType = yield taxiType_1.default.findById(id);
        return taxiType;
    }
    catch (error) {
        console.log("Error retrieving taxi type by ID: ", error);
        throw error;
    }
});
exports.getTaxiTypeByIdService = getTaxiTypeByIdService;
// UPDATE
const updateTaxiTypeService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, name, icon, updatedBy, updatedByFullName }) {
    try {
        const updatedTaxiType = yield taxiType_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                icon,
                updatedBy,
                updatedAt: new Date(),
                updatedByFullName
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
