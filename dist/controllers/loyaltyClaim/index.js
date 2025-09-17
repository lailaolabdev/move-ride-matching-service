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
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const createLoyaltyClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_2.default.startSession();
    try {
        const userId = req.user.id;
        const { loyaltyId } = req.body;
        // Fetch user data
        const user = yield axios_1.default.get(`${process.env.USER_SERVICE_URL}/v1/api/users/${userId}`);
        const userData = (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.user;
        if (!userData) {
            throw {
                code: config_1.messages.USER_NOT_FOUND.code,
                message: config_1.messages.USER_NOT_FOUND.message
            };
        }
        let loyaltyData;
        let loyaltyPrice = 0;
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            // Check if loyalty exists
            const loyalty = yield loyalty_1.loyaltyModel.findById(loyaltyId).session(session);
            if (!loyalty) {
                throw {
                    code: config_1.messages.LOYALTY_NOT_FOUND.code,
                    message: config_1.messages.LOYALTY_NOT_FOUND.message
                };
            }
            // Check if user has enough points
            const userPoint = Number((_a = userData.point) !== null && _a !== void 0 ? _a : 0);
            loyaltyPrice = Number((_b = loyalty.price) !== null && _b !== void 0 ? _b : 0);
            if (userPoint < loyaltyPrice) {
                throw {
                    code: config_1.messages.USER_NOT_ENOUGH_POINT.code,
                    message: config_1.messages.USER_NOT_ENOUGH_POINT.message
                };
            }
            // Check if loyalty has enough quantity
            if (loyalty.quantity <= 0) {
                throw {
                    code: config_1.messages.LOYALTY_NOT_ENOUGH_QUANTITY.code,
                    message: config_1.messages.LOYALTY_NOT_ENOUGH_QUANTITY.message
                };
            }
            // Reduce loyalty quantity
            yield loyalty_1.loyaltyModel.findByIdAndUpdate(loyaltyId, {
                quantity: loyalty.quantity - 1
            }, { session });
            // Create loyalty claim within the transaction
            loyaltyData = yield (0, loyaltyClaim_1.createLoyaltyClaimService)(req, userData.phone, loyalty.name, loyalty.price, session);
        }));
        // Reduce user points after successful transaction
        yield axios_1.default.patch(`${process.env.USER_SERVICE_URL}/v1/api/users/${userId}/point/add`, {
            point: userData.point - loyaltyPrice
        }, {
            headers: {
                Authorization: `${req.headers["authorization"]}`,
            }
        });
        res.status(201).json({
            code: config_1.messages.CREATE_SUCCESSFUL.code,
            message: "Loyalty claim created successfully",
            loyalty: loyaltyData
        });
    }
    catch (error) {
        console.log("createLoyaltyClaim Error: ", error);
        // Handle specific error cases
        if (error.code === config_1.messages.USER_NOT_FOUND.code) {
            res.status(404).json({
                code: config_1.messages.USER_NOT_FOUND.code,
                message: config_1.messages.USER_NOT_FOUND.message
            });
        }
        else if (error.code === config_1.messages.LOYALTY_NOT_FOUND.code) {
            res.status(404).json({
                code: config_1.messages.LOYALTY_NOT_FOUND.code,
                message: config_1.messages.LOYALTY_NOT_FOUND.message
            });
        }
        else if (error.code === config_1.messages.USER_NOT_ENOUGH_POINT.code) {
            res.status(409).json({
                code: config_1.messages.USER_NOT_ENOUGH_POINT.code,
                message: config_1.messages.USER_NOT_ENOUGH_POINT.message
            });
        }
        else if (error.code === config_1.messages.LOYALTY_NOT_ENOUGH_QUANTITY.code) {
            res.status(409).json({
                code: config_1.messages.LOYALTY_NOT_ENOUGH_QUANTITY.code,
                message: config_1.messages.LOYALTY_NOT_ENOUGH_QUANTITY.message
            });
        }
        else {
            res.status(500).json({
                code: config_1.messages.INTERNAL_SERVER_ERROR.code,
                message: config_1.messages.INTERNAL_SERVER_ERROR.message,
                detail: error.message,
            });
        }
    }
    finally {
        yield session.endSession();
    }
});
exports.createLoyaltyClaim = createLoyaltyClaim;
const getAllLoyaltyClaim = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const role = req.user.role;
        const { skip = 0, limit = 10, status, country, startDate, endDate } = req.query;
        const parseSkip = parseInt(skip, 10);
        const parsedLimit = parseInt(limit, 10);
        const filter = {};
        if (role === "CUSTOMER" || role === "DRIVER") {
            if (userId)
                filter.userId = new mongoose_1.Types.ObjectId(userId);
        }
        if (status)
            filter.status = status;
        if (country)
            filter.country = country;
        if (startDate || endDate) {
            const createdAtFilter = {};
            if (startDate) {
                const startLao = new Date(startDate);
                // Convert to UTC by subtracting 7 hours immediately
                startLao.setHours(startLao.getHours() - 7);
                startLao.setMinutes(0);
                startLao.setSeconds(0);
                startLao.setMilliseconds(0);
                createdAtFilter.$gte = startLao;
            }
            if (endDate) {
                const endLao = new Date(endDate);
                // Convert to UTC by subtracting 7 hours immediately
                endLao.setHours(endLao.getHours() - 7 + 23);
                endLao.setMinutes(59);
                endLao.setSeconds(59);
                endLao.setMilliseconds(999);
                createdAtFilter.$lte = endLao;
            }
            filter.createdAt = createdAtFilter;
        }
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
