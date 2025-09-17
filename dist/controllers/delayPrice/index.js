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
exports.deleteDelayPrice = exports.updateDelayPrice = exports.getDelayPriceById = exports.getAllDelayPrices = exports.createDelayPrice = void 0;
const delayPrice_1 = require("../../services/delayPrice");
const index_1 = require("../../config/index");
// CREATE Delay Price
const createDelayPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = req.user;
        const { price, country, countryCode } = req.body;
        const delayPriceExists = yield (0, delayPrice_1.getAllDelayPricesService)(0, 0, { country, countryCode });
        if (((_a = delayPriceExists === null || delayPriceExists === void 0 ? void 0 : delayPriceExists.prices) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            res.status(400).json({
                code: index_1.messages.DELAY_PRICE_ALREADY_EXIST.code,
                message: index_1.messages.DELAY_PRICE_ALREADY_EXIST.message,
            });
            return;
        }
        const delayPrice = yield (0, delayPrice_1.createDelayPriceService)({
            price,
            country,
            countryCode,
            createdBy: user.id,
            createdByFullName: user.fullName,
        });
        res.status(201).json({
            code: index_1.messages.CREATE_SUCCESSFUL.code,
            message: "Delay price created successfully",
            delayPrice,
        });
    }
    catch (error) {
        console.error("Error creating delay price:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.createDelayPrice = createDelayPrice;
// READ All Delay Prices
const getAllDelayPrices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit, country, countryCode } = req.query;
        const parsedSkip = parseInt(skip, 10) || 0;
        const parsedLimit = parseInt(limit, 10) || 20;
        const filter = {};
        if (country)
            filter.country = country;
        if (countryCode)
            filter.countryCode = countryCode;
        const delayPrices = yield (0, delayPrice_1.getAllDelayPricesService)(parsedSkip, parsedLimit, filter);
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Delay prices fetched successfully",
            delayPrices,
        });
    }
    catch (error) {
        console.error("Error fetching delay prices:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getAllDelayPrices = getAllDelayPrices;
// READ Delay Price by ID
const getDelayPriceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delayPrice = yield (0, delayPrice_1.getDelayPriceByIdService)(req.params.id);
        if (!delayPrice) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Delay price not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Delay price fetched successfully",
            delayPrice,
        });
    }
    catch (error) {
        console.error("Error fetching delay price by ID:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.getDelayPriceById = getDelayPriceById;
// UPDATE Delay Price
const updateDelayPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const user = req.user;
        const { price, country, countryCode } = req.body;
        const delayPriceExists = yield (0, delayPrice_1.getAllDelayPricesService)(0, 0, { country, countryCode });
        if (((_a = delayPriceExists === null || delayPriceExists === void 0 ? void 0 : delayPriceExists.prices) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            res.status(400).json({
                code: index_1.messages.DELAY_PRICE_ALREADY_EXIST.code,
                message: index_1.messages.DELAY_PRICE_ALREADY_EXIST.message,
            });
            return;
        }
        const updatedDelayPrice = yield (0, delayPrice_1.updateDelayPriceService)({
            id,
            price,
            country,
            countryCode,
            updatedBy: user.id,
            updatedByFullName: user.fullName,
        });
        if (!updatedDelayPrice) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Delay price not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Delay price updated successfully",
            updatedDelayPrice,
        });
    }
    catch (error) {
        console.error("Error updating delay price:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.updateDelayPrice = updateDelayPrice;
// DELETE Delay Price
const deleteDelayPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDelayPrice = yield (0, delayPrice_1.deleteDelayPriceService)(req.params.id);
        if (!deletedDelayPrice) {
            res.status(404).json({
                code: index_1.messages.NOT_FOUND.code,
                message: "Delay price not found",
            });
            return;
        }
        res.status(200).json({
            code: index_1.messages.SUCCESSFULLY.code,
            message: "Delay price deleted successfully",
            deletedDelayPrice,
        });
    }
    catch (error) {
        console.error("Error deleting delay price:", error);
        res.status(500).json({
            code: index_1.messages.INTERNAL_SERVER_ERROR.code,
            message: index_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
    }
});
exports.deleteDelayPrice = deleteDelayPrice;
