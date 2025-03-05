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
exports.deletePolygon = exports.updatePolygon = exports.getPolygonById = exports.getAllPolygon = exports.createPolygon = void 0;
const polygon_1 = require("../../services/polygon");
const config_1 = require("../../config");
const polygon_2 = __importDefault(require("../../models/polygon"));
const createPolygon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const polygon = yield polygon_2.default.findOne({ name });
        if (polygon) {
            res.status(400).json({
                code: config_1.messages.ALREADY_EXIST.code,
                messages: `Polygon ${config_1.messages.ALREADY_EXIST.message}`
            });
            return;
        }
        const createdPolygon = yield (0, polygon_1.createPolygonService)(req);
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: "Polygon created successfully",
            createdPolygon,
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
exports.createPolygon = createPolygon;
const getAllPolygon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const polygons = yield (0, polygon_1.getAllPolygonService)(parseSkip, parsedLimit);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Vehicles fetched successfully",
            polygons,
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
exports.getAllPolygon = getAllPolygon;
const getPolygonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxi = yield (0, polygon_1.getPolygonByIdService)(req.params.id);
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
exports.getPolygonById = getPolygonById;
const updatePolygon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPolygon = yield (0, polygon_1.updatePolygonService)(req);
        if (!updatedPolygon) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Vehicle not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Vehicle updated successfully",
            taxi: updatedPolygon,
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
exports.updatePolygon = updatePolygon;
const deletePolygon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPolygon = yield (0, polygon_1.deletePolygonService)(req.params.id);
        if (!deletedPolygon) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Vehicle not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Vehicle deleted successfully",
            taxi: exports.deletePolygon,
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.deletePolygon = deletePolygon;
