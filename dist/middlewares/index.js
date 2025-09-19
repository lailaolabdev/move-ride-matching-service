"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorizationAdminRole = exports.checkAuthorizationStaffRole = exports.checkAuthorizationManagerRole = exports.checkAuthorizationMiddleware = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkAuthorizationMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (token) {
            const accessToken = token.replace("Bearer ", "");
            console.log("accessToken: ", accessToken);
            const payloadData = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            req.user = payloadData;
        }
        else {
            res.status(401).json({
                code: config_1.messages.UNAUTHORIZED.code,
                message: config_1.messages.UNAUTHORIZED.message,
                detail: "Unauthorized",
            });
            return;
        }
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                code: config_1.messages.UNAUTHORIZED.code,
                message: config_1.messages.UNAUTHORIZED.message,
                detail: "Your session has expired. Please log in again.",
            });
            return;
        }
        res.status(401).json({
            code: config_1.messages.UNAUTHORIZED.code,
            message: config_1.messages.UNAUTHORIZED.message,
            detail: "Invalid or malformed token.",
        });
    }
};
exports.checkAuthorizationMiddleware = checkAuthorizationMiddleware;
const checkAuthorizationManagerRole = (req, res, next) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const user = req.user;
    if (user.role !== "TAXI_MANAGER") {
        res.status(403).json({
            code: config_1.messages.FORBIDDEN.code,
            message: config_1.messages.FORBIDDEN.message,
            detail: "Permission denied",
        });
        return;
    }
    next();
};
exports.checkAuthorizationManagerRole = checkAuthorizationManagerRole;
const checkAuthorizationStaffRole = (req, res, next) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const user = req.user;
    if (user.role !== "TAXI_STAFF" || user.role !== "TAXI_MANAGER") {
        res.status(403).json({
            code: config_1.messages.FORBIDDEN.code,
            message: config_1.messages.FORBIDDEN.message,
            detail: "Permission denied",
        });
        return;
    }
    next();
};
exports.checkAuthorizationStaffRole = checkAuthorizationStaffRole;
const checkAuthorizationAdminRole = (req, res, next) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const user = req.user;
    if (user.role !== "TAXI_ADMIN" &&
        user.role !== "TAXI_STAFF" &&
        user.role !== "TAXI_MANAGER" &&
        user.role !== "SUPER_ADMIN") {
        res.status(403).json({
            code: config_1.messages.FORBIDDEN.code,
            message: config_1.messages.FORBIDDEN.message,
            detail: "Permission denied",
        });
        return;
    }
    next();
};
exports.checkAuthorizationAdminRole = checkAuthorizationAdminRole;
