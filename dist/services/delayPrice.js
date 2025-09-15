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
exports.deleteDelayPriceService = exports.updateDelayPriceService = exports.getDelayPriceByIdService = exports.getAllDelayPricesService = exports.createDelayPriceService = void 0;
const delayPrice_1 = require("../models/delayPrice"); // You may want to rename this to `delayPriceModel`
// CREATE
const createDelayPriceService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ price, createdBy, createdByFullName, country, countryCode, }) {
    try {
        const delayPrice = new delayPrice_1.driverRateModel({
            price,
            createdBy,
            createdByFullName,
            country,
            countryCode,
        });
        const savedDelayPrice = yield delayPrice.save();
        return savedDelayPrice;
    }
    catch (error) {
        throw error;
    }
});
exports.createDelayPriceService = createDelayPriceService;
// READ ALL
const getAllDelayPricesService = (skip, limit, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield delayPrice_1.driverRateModel.countDocuments(filter);
        const prices = yield delayPrice_1.driverRateModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, prices };
    }
    catch (error) {
        throw error;
    }
});
exports.getAllDelayPricesService = getAllDelayPricesService;
// READ BY ID
const getDelayPriceByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield delayPrice_1.driverRateModel.findById(id);
    }
    catch (error) {
        throw error;
    }
});
exports.getDelayPriceByIdService = getDelayPriceByIdService;
// UPDATE
const updateDelayPriceService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, price, updatedBy, updatedByFullName, country, countryCode, }) {
    try {
        return yield delayPrice_1.driverRateModel.findByIdAndUpdate(id, {
            $set: {
                price,
                updatedBy,
                updatedByFullName,
                country,
                countryCode,
            },
        }, { new: true });
    }
    catch (error) {
        throw error;
    }
});
exports.updateDelayPriceService = updateDelayPriceService;
// DELETE
const deleteDelayPriceService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield delayPrice_1.driverRateModel.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
});
exports.deleteDelayPriceService = deleteDelayPriceService;
