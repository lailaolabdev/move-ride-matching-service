"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = exports.getDayString = exports.getLocalTime = void 0;
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
