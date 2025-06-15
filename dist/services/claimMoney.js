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
exports.createClaimMoney = void 0;
const axios_1 = __importDefault(require("axios"));
const createClaimMoney = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.post(`${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money`, {
            driverId: data.driverId,
            registrationSource: data.registrationSource,
            taxDeducted: data.taxDeducted,
        }, {
            headers: {
                Authorization: data.token,
            },
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createClaimMoney = createClaimMoney;
