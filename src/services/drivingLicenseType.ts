import { messages } from "../config";
import { drivingLicenseTypeModel, IDrivingLicenseType } from "../models/drivingLicenseType";
import dotenv from "dotenv";

dotenv.config();

interface ICreateDrivingLicenseType {
    name: string;
    createdBy: string;
    createdByFullName: string;
    country: string;
}

interface IUpdateDrivingLicenseType extends ICreateDrivingLicenseType {
    updatedBy: string;
    updatedByFullName: string;
}

export const findDrivingLicenseTypesService = async (filter: any) => {
    try {
        const drivingLicenseTypes = await drivingLicenseTypeModel.find(filter);

        return drivingLicenseTypes;
    } catch (error) {
        console.error("Error in findDrivingLicenseTypesService:", error);
        throw new Error("Failed to retrieve drivingLicenseType data");
    }
};

export const findDrivingLicenseTypeByIdService = async (id: string) => {
    try {
        const drivingLicenseType = await drivingLicenseTypeModel.findById(id);

        return drivingLicenseType;
    } catch (error) {
        console.log("findDrivingLicenseTypeByIdService: ", error);
        throw new Error("Error in findDrivingLicenseTypeByIdService");
    }
};

export const createdDrivingLicenseTypeService = async ({
    name,
    createdBy,
    createdByFullName,
    country,
}: ICreateDrivingLicenseType): Promise<IDrivingLicenseType | null> => {
    const newDrivingLicenseType = new drivingLicenseTypeModel({
        name,
        createdBy,
        createdByFullName,
        country,
    });

    const savedDrivingLicenseType = await newDrivingLicenseType.save();

    return savedDrivingLicenseType;
};

export const updateDrivingLicenseTypeService = async (id: string, updates: Partial<IUpdateDrivingLicenseType>) => {
    const updatedDrivingLicenseType = await drivingLicenseTypeModel.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedDrivingLicenseType) {
        throw {
            code: messages.NOT_FOUND.code,
            message: "Driving license type not found",
        };
    }
    return updatedDrivingLicenseType;
};

export const deleteDrivingLicenseTypeByIdService = async (id: string) => {
    try {
        const deletedDrivingLicenseType = await drivingLicenseTypeModel.findByIdAndDelete(id);

        return deletedDrivingLicenseType;
    } catch (error) {
        console.log("deleteDrivingLicenseTypeByIdService: ", error);
        throw new Error("Error in deleteDrivingLicenseTypeByIdService");
    }
};
