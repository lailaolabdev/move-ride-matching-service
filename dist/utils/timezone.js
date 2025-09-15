"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToEndDate = exports.convertToStartDate = exports.getBangkokTodayUTC = exports.formatTime = exports.getDayString = exports.getLocalTime = void 0;
// Function to get current time in UTC+7
const getLocalTime = (offsetHours = 7) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offsetHours));
};
exports.getLocalTime = getLocalTime;
// Function to get day in "MON", "TUE", etc.
const getDayString = (date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
};
exports.getDayString = getDayString;
// Function to format time to HH:mm
const formatTime = (date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
};
exports.formatTime = formatTime;
const getBangkokTodayUTC = () => {
    const bangkokOffset = 7 * 60; // 7 hours in minutes
    const now = new Date();
    const bangkokNow = new Date(now.getTime() + bangkokOffset * 60000);
    // Get Bangkok's start of day
    const bangkokStartOfDay = new Date(bangkokNow);
    bangkokStartOfDay.setHours(0, 0, 0, 0);
    // Get Bangkok's end of day
    const bangkokEndOfDay = new Date(bangkokNow);
    bangkokEndOfDay.setHours(23, 59, 59, 999);
    // Convert Bangkok's start and end of day back to UTC
    const startOfDayUTC = new Date(bangkokStartOfDay.getTime() - bangkokOffset * 60000);
    const endOfDayUTC = new Date(bangkokEndOfDay.getTime() - bangkokOffset * 60000);
    return { startOfDayUTC, endOfDayUTC };
};
exports.getBangkokTodayUTC = getBangkokTodayUTC;
const convertToStartDate = (date) => {
    const bangkokOffset = 7 * 60; // 7 hours in minutes
    const bangkokStart = new Date(date);
    bangkokStart.setHours(0, 0, 0, 0);
    const startUTC = new Date(bangkokStart.getTime() - bangkokOffset * 60000);
    return startUTC;
};
exports.convertToStartDate = convertToStartDate;
const convertToEndDate = (date) => {
    const bangkokOffset = 7 * 60;
    const bangkokEnd = new Date(date);
    bangkokEnd.setHours(23, 59, 59, 999);
    const endUTC = new Date(bangkokEnd.getTime() - bangkokOffset * 60000);
    return endUTC;
};
exports.convertToEndDate = convertToEndDate;
