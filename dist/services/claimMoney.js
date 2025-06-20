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
exports.updateClaimMoney = exports.getClaimMoney = exports.createClaimMoney = void 0;
const axios_1 = __importDefault(require("axios"));
const createClaimMoney = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield axios_1.default.post(`${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money`, {
            driverId: data.driverId,
            driverRegistrationSource: data.driverRegistrationSource,
            taxDeducted: data.taxDeducted,
            income: data.income || 0
        }, {
            headers: {
                Authorization: data.token,
            },
        });
        return (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.claim;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createClaimMoney = createClaimMoney;
const getClaimMoney = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield axios_1.default.get(`${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money/${data.driverId}/driver?status=${data.status}`, {
            headers: {
                Authorization: data.token,
            },
        });
        return (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.claim;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getClaimMoney = getClaimMoney;
const updateClaimMoney = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield axios_1.default.put(`${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money/${data.id}`, {
            income: data.income
        }, {
            headers: {
                Authorization: data.token,
            },
        });
        return (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.claim;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateClaimMoney = updateClaimMoney;
