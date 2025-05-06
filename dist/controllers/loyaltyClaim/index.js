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
exports.deleteLoyaltyClaim = exports.updateLoyaltyClaim = exports.getLoyaltyClaimById = exports.getAllLoyaltyClaim = exports.createLoyaltyClaim = void 0;
const loyaltyClaim_1 = require("../../services/loyaltyClaim");
const config_1 = require("../../config");
const loyalty_1 = require("../../models/loyalty");
const axios_1 = __importDefault(require("axios"));
const createLoyaltyClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userId = req.user.id;
        const { loyaltyId } = req.body;
        // Check user
        const user = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${userId}`);
        const userData = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.user;
        if (!userData) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "User does not exist",
            });
            return;
        }
        // Check is loyalty exist
        const loyalty = yield loyalty_1.loyaltyModel.findById(loyaltyId);
        if (!loyalty) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Loyalty does not exist",
            });
            return;
        }
        // Check is user point enough or not 
        const userPoint = Number((_b = userData === null || userData === void 0 ? void 0 : userData.point) !== null && _b !== void 0 ? _b : 0);
        const loyaltyPrice = Number((_c = loyalty === null || loyalty === void 0 ? void 0 : loyalty.price) !== null && _c !== void 0 ? _c : 0);
        if (userPoint < loyaltyPrice) {
            res.status(400).json({
                code: config_1.messages.BAD_REQUEST.code,
                message: "User does not have enough points",
            });
            return;
        }
        // Create loyalty
        yield (0, loyaltyClaim_1.createLoyaltyClaimService)(req);
        // Reduce loyalty quantity
        yield loyalty_1.loyaltyModel.findByIdAndUpdate(loyaltyId, {
            quantity: loyalty.quantity - 1
        });
        // Reduce user point
        yield axios_1.default.put(`${process.env.USER_SERVICE_URL}/v1/api/users/${userId}`, {
            point: userData.point - loyalty.price
        }, {
            headers: {
                Authorization: `${req.headers["authorization"]}`,
            }
        });
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: "Loyalty claim created successfully"
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
exports.createLoyaltyClaim = createLoyaltyClaim;
const getAllLoyaltyClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip = 0, limit = 10, status, country, countryCode } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = {};
        if (status)
            filter.status = status;
        if (country)
            filter.countryId = country;
        if (countryCode)
            filter.countryCode = countryCode;
        const loyaltyClaim = yield (0, loyaltyClaim_1.getAllLoyaltyClaimService)(parseSkip, parsedLimit, filter);
        res.status(200).json(Object.assign({ code: config_1.messages.SUCCESSFULLY.code, message: "Loyalty claim fetched successfully" }, loyaltyClaim));
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
exports.getAllLoyaltyClaim = getAllLoyaltyClaim;
const getLoyaltyClaimById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loyaltyClaim = yield (0, loyaltyClaim_1.getLoyaltyClaimByIdService)(req.params.id);
        if (!loyaltyClaim) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Loyalty claim not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Loyalty claim fetched successfully",
            loyaltyClaim,
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
exports.getLoyaltyClaimById = getLoyaltyClaimById;
const updateLoyaltyClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedLoyaltyClaim = yield (0, loyaltyClaim_1.updateLoyaltyClaimService)(req);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Loyalty claim updated successfully",
            loyaltyClaim: updatedLoyaltyClaim,
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
exports.updateLoyaltyClaim = updateLoyaltyClaim;
const deleteLoyaltyClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedLoyaltyClaim = yield (0, loyaltyClaim_1.deleteLoyaltyClaimService)(req.params.id);
        if (!deletedLoyaltyClaim) {
            res.status(404).json({
                code: config_1.messages.NOT_FOUND.code,
                message: "Loyalty claim not found",
            });
            return;
        }
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Loyalty claim deleted successfully",
            loyaltyClaim: deletedLoyaltyClaim,
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
exports.deleteLoyaltyClaim = deleteLoyaltyClaim;
