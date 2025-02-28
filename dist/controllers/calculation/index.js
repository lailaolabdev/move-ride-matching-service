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
exports.calculateUserDistanceAndDuration = void 0;
const config_1 = require("../../config");
const calculation_1 = require("../../services/calculation");
const calculateUserDistanceAndDuration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { origin, destination } = req.body;
        // Demo car type
        const carType = [
            {
                image: "",
                id: "001",
                carType: "suv",
                price: 5 // Per kilometer
            },
            {
                id: "002",
                image: "",
                carType: "car",
                price: 6 // Per kilometer
            },
            {
                id: "003",
                image: "",
                carType: "mini truck",
                price: 7 // Per kilometer
            },
        ];
        if (!carType) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: `Car Type ${config_1.messages.NOT_FOUND.message}`,
            });
        }
        // Calculate distance and duration
        const calculate = yield (0, calculation_1.calculateUserDistanceAndDurationService)(origin, destination);
        if (!calculate) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: `Calculate not found ${config_1.messages.NOT_FOUND.message}`,
            });
        }
        const calculation = [];
        const delayPrice = 7;
        const priceInPolygonPerKm = 7;
        for (let i = 0; i < carType.length; i++) {
            calculation.push(Object.assign(Object.assign({ id: carType[i].id, image: carType[i].image, cartType: carType[i].carType }, calculate), { totalPrice: (carType[i].price * calculate.totalDistance) + (priceInPolygonPerKm * calculate.distanceInPolygon) + (delayPrice * calculate.delayDuration) }));
        }
        res.status(200).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: config_1.messages.CREATE_SUCCESSFUL.message,
            calculation
        });
    }
    catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.calculateUserDistanceAndDuration = calculateUserDistanceAndDuration;
