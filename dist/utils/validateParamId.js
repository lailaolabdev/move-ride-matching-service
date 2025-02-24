"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParamID = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
const validateParamID = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: config_1.messages.BAD_REQUEST,
            detail: "Missing required fields: id",
        });
        return;
    }
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            code: config_1.messages.BAD_REQUEST.code,
            message: config_1.messages.BAD_REQUEST,
            detail: "Incorrect id",
        });
        return;
    }
    next();
};
exports.validateParamID = validateParamID;
