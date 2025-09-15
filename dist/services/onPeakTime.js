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
exports.getOnPeakTimeService = void 0;
const axios_1 = __importDefault(require("axios"));
const timezone_1 = require("../utils/timezone");
const getOnPeakTimeService = (token, country) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const onPeakTime = yield axios_1.default.get(`${process.env.CHARGING_SERVICE_URL}/v1/api/on-peak-times?platform=TAXI&country=${country}`, { headers: { Authorization: token } });
        if (!((_b = (_a = onPeakTime === null || onPeakTime === void 0 ? void 0 : onPeakTime.data) === null || _a === void 0 ? void 0 : _a.onPeakTimes) === null || _b === void 0 ? void 0 : _b.length)) {
            return false;
        }
        const getCurrentPeakTime = yield getCurrentPeakSchedule((_c = onPeakTime === null || onPeakTime === void 0 ? void 0 : onPeakTime.data) === null || _c === void 0 ? void 0 : _c.onPeakTimes);
        return getCurrentPeakTime;
    }
    catch (error) {
        console.error('Error fetching on-peak time:', error);
        return false;
    }
});
exports.getOnPeakTimeService = getOnPeakTimeService;
const getCurrentPeakSchedule = (schedules) => __awaiter(void 0, void 0, void 0, function* () {
    const now = (0, timezone_1.getLocalTime)(7); // Thailand = UTC+7
    const dayStr = (0, timezone_1.getDayString)(now);
    const timeStr = (0, timezone_1.formatTime)(now);
    return schedules.find((schedule) => {
        return (schedule.dates.includes(dayStr) &&
            timeStr >= schedule.startTime &&
            timeStr <= schedule.endTime);
    });
});
