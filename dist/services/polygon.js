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
exports.deletePolygonService = exports.updatePolygonService = exports.getPolygonByIdService = exports.getAllPolygonService = exports.createPolygonService = void 0;
const polygon_1 = __importDefault(require("../models/polygon"));
const createPolygonService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const { name, coordinates, price, color } = req.body;
        const savedPolygon = yield polygon_1.default.create({
            name,
            coordinates,
            price,
            color,
            createdBy: user,
        });
        return savedPolygon;
    }
    catch (error) {
        console.log("Error creating vehicle: ", error);
        throw error;
    }
});
exports.createPolygonService = createPolygonService;
const getAllPolygonService = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield polygon_1.default.countDocuments();
        const polygons = yield polygon_1.default.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, polygons };
    }
    catch (error) {
        console.log("Error retrieving vehicles: ", error);
        throw error;
    }
});
exports.getAllPolygonService = getAllPolygonService;
const getPolygonByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const polygon = yield polygon_1.default.findById(id);
        return polygon;
    }
    catch (error) {
        console.log("Error retrieving vehicle by ID: ", error);
        throw error;
    }
});
exports.getPolygonByIdService = getPolygonByIdService;
const updatePolygonService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const id = req.params.id;
        const { name, coordinates, price, color, } = req.body;
        const updatedPolygon = yield polygon_1.default.findByIdAndUpdate(id, {
            name,
            coordinates,
            price,
            color,
            updatedBy: user,
        }, { new: true });
        return updatedPolygon;
    }
    catch (error) {
        console.log("Error updating polygon: ", error);
        throw error;
    }
});
exports.updatePolygonService = updatePolygonService;
const deletePolygonService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPolygon = yield polygon_1.default.findByIdAndDelete(id);
        return deletedPolygon;
    }
    catch (error) {
        console.log("Error deleting vehicle: ", error);
        throw error;
    }
});
exports.deletePolygonService = deletePolygonService;
