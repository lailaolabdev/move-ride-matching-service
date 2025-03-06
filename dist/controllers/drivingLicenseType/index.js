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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDrivingLicenseType = exports.updateDrivingLicenseType = exports.createDrivingLicenseType = exports.getDrivingLicenseType = exports.getDrivingLicenseTypes = void 0;
const config_1 = require("../../config");
const drivingLicenseType_1 = require("../../services/drivingLicenseType");
const drivingLicenseType_2 = require("../../models/drivingLicenseType");
const helper_1 = require("./helper");
const getDrivingLicenseTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = (0, helper_1.filterDrivingLicenseTypeFields)(req.query);
        const drivingLicenseTypes = yield (0, drivingLicenseType_1.findDrivingLicenseTypesService)(filter);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Get drivingLicenseTypes successfully",
            drivingLicenseTypes,
        });
    }
    catch (error) {
        console.log("error: ", error);
        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.getDrivingLicenseTypes = getDrivingLicenseTypes;
const getDrivingLicenseType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const drivingLicenseType = yield (0, drivingLicenseType_1.findDrivingLicenseTypeByIdService)(id);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Get driving license type successfully",
            drivingLicenseType,
        });
    }
    catch (error) {
        console.log("error: ", error);
        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.getDrivingLicenseType = getDrivingLicenseType;
const createDrivingLicenseType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        const { name, logoUrl, country } = req.body;
        const createdBy = userData.id;
        const createdByFullName = userData.fullName;
        const existingDrivingLicenseType = yield drivingLicenseType_2.drivingLicenseTypeModel.findOne({ name, country });
        if (existingDrivingLicenseType) {
            res.status(409).json({
                code: config_1.messages.ALREADY_EXIST.code,
                message: "Driving license type " + config_1.messages.ALREADY_EXIST.message,
            });
            return;
        }
        const createDrivingLicenseType = yield (0, drivingLicenseType_1.createdDrivingLicenseTypeService)({
            name,
            createdBy,
            createdByFullName,
            country,
        });
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Get driving license type successfully",
            DrivingLicenseType: createDrivingLicenseType,
        });
    }
    catch (error) {
        console.log("error: ", error);
        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.createDrivingLicenseType = createDrivingLicenseType;
const updateDrivingLicenseType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userData = req.user;
        const { name, logoUrl, country } = req.body;
        const updatedBy = userData.id;
        const updatedByFullName = userData.fullName;
        // Is driving license type existing
        const existingDrivingLicenseType = yield drivingLicenseType_2.drivingLicenseTypeModel.findOne({ name, country });
        if (existingDrivingLicenseType) {
            res.status(409).json({
                code: config_1.messages.ALREADY_EXIST.code,
                message: "Driving license type " + config_1.messages.ALREADY_EXIST.message,
            });
            return;
        }
        // Update driving license type
        const updates = { name, logoUrl, country, updatedBy, updatedByFullName };
        const createDrivingLicenseType = yield (0, drivingLicenseType_1.updateDrivingLicenseTypeService)(id, updates);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Get driving license type successfully",
            DrivingLicenseType: createDrivingLicenseType,
        });
    }
    catch (error) {
        console.log("error: ", error);
        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.updateDrivingLicenseType = updateDrivingLicenseType;
const deleteDrivingLicenseType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const drivingLicenseType = yield (0, drivingLicenseType_1.deleteDrivingLicenseTypeByIdService)(id);
        res.status(200).json({
            code: config_1.messages.SUCCESSFULLY.code,
            message: "Delete driving license type successfully",
            drivingLicenseType,
        });
    }
    catch (error) {
        console.log("error: ", error);
        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);
        res.status(500).json({
            code: config_1.messages.INTERNAL_SERVER_ERROR.code,
            message: config_1.messages.INTERNAL_SERVER_ERROR.message,
            detail: error.message,
        });
        return;
    }
});
exports.deleteDrivingLicenseType = deleteDrivingLicenseType;
