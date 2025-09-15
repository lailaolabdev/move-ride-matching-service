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
exports.getVehicleModels = exports.getVehicleBrands = exports.deleteTaxi = exports.updateTaxi = exports.getVehicleById = exports.getAllTaxies = exports.createTaxi = void 0;
const taxi_1 = require("../../services/taxi");
const config_1 = require("../../config");
const helper_1 = require("./helper");
// CREATE Taxi
const createTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { taxiType, vehicleModel, vehicleModelName, vehicleBrand, vehicleBrandName, 
        // passengerMin,
        // passengerMax,
        // meteredFare,
        // flatFare,
        country } = req.body;
        const taxi = yield (0, taxi_1.createTaxiService)({
            taxiType,
            vehicleModel,
            vehicleModelName,
            vehicleBrand,
            vehicleBrandName,
            // passengerMin,
            // passengerMax,
            // meteredFare,
            // flatFare,
            country,
            createdBy: user.id,
            createdByFullName: user.fullName
        });
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: 'Vehicle created successfully',
            taxi
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.createTaxi = createTaxi;
// READ All Vehicles
const getAllTaxies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = yield (0, helper_1.filterTaxis)(req.query);
        const taxies = yield (0, taxi_1.getAllTaxiService)(parseSkip, parsedLimit, filter);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: 'Vehicles fetched successfully',
            taxies
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.getAllTaxies = getAllTaxies;
// READ Vehicle by ID
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxi = yield (0, taxi_1.getTaxiByIdService)(req.params.id);
        if (!taxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: 'Vehicle not found'
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: 'Vehicle fetched successfully',
            taxi
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.getVehicleById = getVehicleById;
// UPDATE Vehicle
const updateTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const updatedTaxi = yield (0, taxi_1.updateTaxiService)({
            id: req.params.id,
            taxiType: req.body.taxiType,
            vehicleModel: req.body.vehicleModel,
            vehicleBrand: req.body.vehicleBrand,
            isOpened: req.body.isOpened,
            // passengerMin: req.body.passengerMin,
            // passengerMax: req.body.passengerMax,
            // meteredFare: req.body.meteredFare,
            // flatFare: req.body.flatFare,
            updatedBy: user.id,
            updatedByFullName: user.fullName
        });
        if (!updatedTaxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: 'Vehicle not found'
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: 'Vehicle updated successfully',
            taxi: updatedTaxi
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.updateTaxi = updateTaxi;
// DELETE Vehicle
const deleteTaxi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTaxi = yield (0, taxi_1.deleteTaxiService)(req.params.id);
        if (!deletedTaxi) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: 'Vehicle not found'
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: 'Vehicle deleted successfully',
            taxi: deletedTaxi
        });
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.deleteTaxi = deleteTaxi;
const getVehicleBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleBrands = yield (0, taxi_1.getVehicleBrandsService)();
        res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { vehicleBrands }));
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.getVehicleBrands = getVehicleBrands;
const getVehicleModels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleBrands = yield (0, taxi_1.getVehicleModelsService)();
        res.status(200).json(Object.assign(Object.assign({}, config_1.messages.SUCCESSFULLY), { vehicleBrands }));
        return;
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message
        });
        return;
    }
});
exports.getVehicleModels = getVehicleModels;
