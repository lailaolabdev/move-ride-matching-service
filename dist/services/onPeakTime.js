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
const getOnPeakTimeService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const onPeakTime = yield axios_1.default.get(`${process.env.CHARGING_SERVICE_URL}/v1/api/on-peak-times?platform=TAXI`, {
            headers: {
                Authorization: token,
            },
        });
        if (!((_a = onPeakTime === null || onPeakTime === void 0 ? void 0 : onPeakTime.data) === null || _a === void 0 ? void 0 : _a.onPeakTimes)) {
            return false;
        }
        const mockData = [
            {
                _id: '67eced9998c0558b7fdb0010',
                dates: ['TUE', 'WED', 'THU', 'FRI', 'SUN', 'SAT'],
                startTime: '08:55',
                endTime: '19:55',
                credit: 20,
                country: '67c6c076d9ba8fe6164eac43',
                countryCode: 'TH',
                createdBy: '67cfa92df077831b059f543a',
                createdByFullName: 'manager test',
                createdAt: '2025-04-02T07:56:09.577Z',
                updatedAt: '2025-04-02T07:56:09.577Z'
            },
            {
                _id: '67ea70395678fa9371f11703',
                dates: ['MON'],
                startTime: '06:00',
                endTime: '23:36',
                credit: 100,
                country: '67c6c076d9ba8fe6164eac43',
                countryCode: 'TH',
                createdBy: '67cfa92df077831b059f543a',
                createdByFullName: 'manager test',
                createdAt: '2025-03-31T10:36:41.359Z',
                updatedAt: '2025-03-31T10:36:41.359Z'
            }
        ];
        const getCurrentPeakTime = yield getCurrentPeakSchedule(mockData);
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
