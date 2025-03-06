import { Request, Response } from "express";
import { messages } from "../../config";
import {
    createdDrivingLicenseTypeService,
    deleteDrivingLicenseTypeByIdService,
    findDrivingLicenseTypeByIdService,
    findDrivingLicenseTypesService,
    updateDrivingLicenseTypeService,
} from "../../services/drivingLicenseType";
import { drivingLicenseTypeModel } from "../../models/drivingLicenseType";
import { filterDrivingLicenseTypeFields } from "./helper";

export const getDrivingLicenseTypes = async (req: Request, res: Response) => {
    try {
        const filter = filterDrivingLicenseTypeFields(req.query);

        const drivingLicenseTypes = await findDrivingLicenseTypesService(filter);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Get drivingLicenseTypes successfully",
            drivingLicenseTypes,
        });
    } catch (error) {
        console.log("error: ", error);

        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};

export const getDrivingLicenseType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const drivingLicenseType = await findDrivingLicenseTypeByIdService(id);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Get driving license type successfully",
            drivingLicenseType,
        });
    } catch (error) {
        console.log("error: ", error);

        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};

export const createDrivingLicenseType = async (req: Request, res: Response) => {
    try {
        const userData = (req as any).user;

        const { name, logoUrl, country } = req.body;

        const createdBy = userData.id;
        const createdByFullName = userData.fullName;

        const existingDrivingLicenseType = await drivingLicenseTypeModel.findOne({ name, country });

        if (existingDrivingLicenseType) {
            res.status(409).json({
                code: messages.ALREADY_EXIST.code,
                message: "Driving license type " + messages.ALREADY_EXIST.message,
            });

            return;
        }

        const createDrivingLicenseType = await createdDrivingLicenseTypeService({
            name,
            createdBy,
            createdByFullName,
            country,
        });

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Get driving license type successfully",
            DrivingLicenseType: createDrivingLicenseType,
        });
    } catch (error) {
        console.log("error: ", error);

        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};

export const updateDrivingLicenseType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userData = (req as any).user;

        const { name, logoUrl, country } = req.body;

        const updatedBy = userData.id;
        const updatedByFullName = userData.fullName;

        // Is driving license type existing
        const existingDrivingLicenseType = await drivingLicenseTypeModel.findOne({ name, country });

        if (existingDrivingLicenseType) {
            res.status(409).json({
                code: messages.ALREADY_EXIST.code,
                message: "Driving license type " + messages.ALREADY_EXIST.message,
            });

            return;
        }

        // Update driving license type
        const updates = { name, logoUrl, country, updatedBy, updatedByFullName };

        const createDrivingLicenseType = await updateDrivingLicenseTypeService(id, updates);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Get driving license type successfully",
            DrivingLicenseType: createDrivingLicenseType,
        });
    } catch (error) {
        console.log("error: ", error);

        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};

export const deleteDrivingLicenseType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const drivingLicenseType = await deleteDrivingLicenseTypeByIdService(id);

        res.status(200).json({
            code: messages.SUCCESSFULLY.code,
            message: "Delete driving license type successfully",
            drivingLicenseType,
        });
    } catch (error) {
        console.log("error: ", error);

        // await reportServiceOnSlack("getAllStaffs->(01)", (error as Error).message);

        res.status(500).json({
            code: messages.INTERNAL_SERVER_ERROR.code,
            message: messages.INTERNAL_SERVER_ERROR.message,
            detail: (error as Error).message,
        });
        return;
    }
};
