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
exports.deleteDrivingLicenseTypeByIdService = exports.updateDrivingLicenseTypeService = exports.createdDrivingLicenseTypeService = exports.findDrivingLicenseTypeByIdService = exports.findDrivingLicenseTypesService = void 0;
const config_1 = require("../config");
const drivingLicenseType_1 = require("../models/drivingLicenseType");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const findDrivingLicenseTypesService = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivingLicenseTypes = yield drivingLicenseType_1.drivingLicenseTypeModel.find(filter);
        return drivingLicenseTypes;
    }
    catch (error) {
        console.error("Error in findDrivingLicenseTypesService:", error);
        throw new Error("Failed to retrieve drivingLicenseType data");
    }
});
exports.findDrivingLicenseTypesService = findDrivingLicenseTypesService;
const findDrivingLicenseTypeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivingLicenseType = yield drivingLicenseType_1.drivingLicenseTypeModel.findById(id);
        return drivingLicenseType;
    }
    catch (error) {
        console.log("findDrivingLicenseTypeByIdService: ", error);
        throw new Error("Error in findDrivingLicenseTypeByIdService");
    }
});
exports.findDrivingLicenseTypeByIdService = findDrivingLicenseTypeByIdService;
const createdDrivingLicenseTypeService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, createdBy, createdByFullName, country, }) {
    const newDrivingLicenseType = new drivingLicenseType_1.drivingLicenseTypeModel({
        name,
        createdBy,
        createdByFullName,
        country,
    });
    const savedDrivingLicenseType = yield newDrivingLicenseType.save();
    return savedDrivingLicenseType;
});
exports.createdDrivingLicenseTypeService = createdDrivingLicenseTypeService;
const updateDrivingLicenseTypeService = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDrivingLicenseType = yield drivingLicenseType_1.drivingLicenseTypeModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedDrivingLicenseType) {
        throw {
            code: config_1.messages.NOT_FOUND.code,
            message: "Driving license type not found",
        };
    }
    return updatedDrivingLicenseType;
});
exports.updateDrivingLicenseTypeService = updateDrivingLicenseTypeService;
const deleteDrivingLicenseTypeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDrivingLicenseType = yield drivingLicenseType_1.drivingLicenseTypeModel.findByIdAndDelete(id);
        return deletedDrivingLicenseType;
    }
    catch (error) {
        console.log("deleteDrivingLicenseTypeByIdService: ", error);
        throw new Error("Error in deleteDrivingLicenseTypeByIdService");
    }
});
exports.deleteDrivingLicenseTypeByIdService = deleteDrivingLicenseTypeByIdService;
