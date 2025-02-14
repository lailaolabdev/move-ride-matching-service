import { deleteKeysByPattern } from '../config';
import taxiTypeModel from '../models/taxiType';
import { ITaxiType } from '../models/taxiType';

// CREATE
export const createTaxiTypeService = async (
    {
        name,
        icon,
        createdBy,
        createdByFullName
    }:
        {
            name: string,
            icon: string,
            createdBy: string,
            createdByFullName: string
        }): Promise<ITaxiType | null> => {
    try {
        const taxiType = new taxiTypeModel({
            name,
            icon,
            createdBy,
            createdByFullName,
        });

        if (taxiType) {
            await deleteKeysByPattern('taxiTypes*'); // Invalidate the cache (if needed)
        }

        const savedTaxiType = await taxiType.save();
        return savedTaxiType;
    } catch (error) {
        console.log("Error creating taxi type: ", error);
        throw error;
    }
};

// READ (All Taxi Types)
export const getAllTaxiTypesService = async (skip: number, limit: number): Promise<any> => {
    try {
        const total = await taxiTypeModel.countDocuments();
        const taxiTypes = await taxiTypeModel.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        return { total, taxiTypes };
    } catch (error) {
        console.log("Error retrieving taxi types: ", error);
        throw error;
    }
};

// READ (Taxi Type by ID)
export const getTaxiTypeByIdService = async (id: string): Promise<ITaxiType | null> => {
    try {
        const taxiType = await taxiTypeModel.findById(id);
        return taxiType;
    } catch (error) {
        console.log("Error retrieving taxi type by ID: ", error);
        throw error;
    }
};

// UPDATE
export const updateTaxiTypeService = async (
    {
        id,
        name,
        icon,
        updatedBy,
        updatedByFullName
    }:
        {
            id: string,
            name?: string,
            icon?: string,
            updatedBy: string,
            updatedByFullName: string
        }): Promise<ITaxiType | null> => {
    try {
        const updatedTaxiType = await taxiTypeModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    icon,
                    updatedBy,
                    updatedAt: new Date(),
                    updatedByFullName
                },
            },
            { new: true }
        );
        return updatedTaxiType;
    } catch (error) {
        console.log("Error updating taxi type: ", error);
        throw error;
    }
};

// DELETE
export const deleteTaxiTypeService = async (id: string): Promise<ITaxiType | null> => {
    try {
        const deleteTaxiType = await taxiTypeModel.findByIdAndDelete(id);
        return deleteTaxiType;
    } catch (error) {
        console.log("Error deleting taxi type: ", error);
        throw error;
    }
};
