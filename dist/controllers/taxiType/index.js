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
exports.deleteTaxiType = exports.updateTaxiType = exports.getTaxiTypeById = exports.getAllTaxiType = exports.createTaxiType = void 0;
const taxiType_1 = require("../../services/taxiType");
const index_1 = require("../../config/index"); // Assuming you have a messages file for status codes
// CREATE Taxi Type
const createTaxiType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user; // Assuming user data is added to the request object (e.g., via authentication middleware)
        const { name, icon, 
        // seats,
        country } = req.body;
        const taxiType = yield (0, taxiType_1.createTaxiTypeService)({
            name,
            icon,
            // seats,
            country,
            createdBy: user.id,
            createdByFullName: user.fullName
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Taxi Type created successfully",
            taxiType,
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
exports.createTaxiType = createTaxiType;
// READ All Taxi Types
const getAllTaxiType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxiTypeId, skip, limit, name } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = {};
        if (taxiTypeId)
            filter.taxiTypeId = taxiTypeId;
        if (name)
            filter.name = { $regex: name, $options: 'i' };
        const taxiTypes = yield (0, taxiType_1.getAllTaxiTypeService)(parseSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Types fetched successfully",
            taxiTypes,
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
exports.getAllTaxiType = getAllTaxiType;
// READ Taxi Type by ID
const getTaxiTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiType = yield (0, taxiType_1.getTaxiTypeByIdService)(req.params.id);
        if (!taxiType) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Type fetched successfully",
            taxiType,
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
exports.getTaxiTypeById = getTaxiTypeById;
// UPDATE Taxi Type
const updateTaxiType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        const { name, icon, seats, minDistance, maxDistance, meterPrice, flatFarePrice, country } = req.body;
        const updatedTaxiType = yield (0, taxiType_1.updateTaxiTypeService)({
            id,
            name,
            icon,
            seats,
            country,
            updatedBy: user.id,
            updatedByFullName: user.fullName
        });
        if (!updatedTaxiType) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Type updated successfully",
            updatedTaxiType,
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
exports.updateTaxiType = updateTaxiType;
// DELETE Taxi Type
const deleteTaxiType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTaxiType = yield (0, taxiType_1.deleteTaxiTypeService)(req.params.id);
        if (!deletedTaxiType) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Taxi Type not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Taxi Type deleted successfully",
            deletedTaxiType,
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
exports.deleteTaxiType = deleteTaxiType;
