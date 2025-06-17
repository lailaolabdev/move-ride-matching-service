import taxiTypeModel from "../models/taxiType";
import { ITaxiType } from "../models/taxiType";

// CREATE
export const createTaxiTypeService = async ({
    name,
    icon,
    seats,
    minDistance,
    maxDistance,
    meterPrice,
    flatFarePrice,
    country,
    createdBy,
    createdByFullName
}: {
    name: string;
    icon: string;
    seats: number;
    minDistance: number;
    maxDistance: number;
    meterPrice: number;
    flatFarePrice: number;
    country: string;
    createdBy: string;
    createdByFullName: string;
}): Promise<ITaxiType | null> => {
    try {
        const taxiType = new taxiTypeModel({
            name,
            icon,
            seats,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country,
            createdBy,
            createdByFullName
        });

        const savedTaxiType = await taxiType.save();

        return savedTaxiType;
    } catch (error) {
        throw error;
    }
};

// READ (All Taxi Types)
export const getAllTaxiTypeService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await taxiTypeModel.countDocuments(filter);
        const taxiType = await taxiTypeModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, taxiType };
    } catch (error) {
        throw error;
    }
};

// READ (Taxi Type by ID)
export const getTaxiTypeByIdService = async (
    id: string
): Promise<ITaxiType | null> => {
    try {
        const taxiType = await taxiTypeModel.findById(id);

        return taxiType;
    } catch (error) {
        throw error;
    }
};

// UPDATE
export const updateTaxiTypeService = async ({
    id,
    name,
    icon,
    seats,
    minDistance,
    maxDistance,
    meterPrice,
    flatFarePrice,
    country,
    updatedBy,
    updatedByFullName,
}: {
    id: string;
    name: string;
    icon: string;
    seats: number;
    minDistance: number;
    maxDistance: number;
    meterPrice: number;
    flatFarePrice: number;
    country: string;
    updatedBy: string;
    updatedByFullName: string;
}): Promise<ITaxiType | null> => {
    try {
        const updatedTaxiType =
            await taxiTypeModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        name,
                        icon,
                        seats,
                        minDistance,
                        maxDistance,
                        meterPrice,
                        flatFarePrice,
                        country,
                        updatedBy,
                        updatedByFullName,
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
export const deleteTaxiTypeService = async (
    id: string
): Promise<ITaxiType | null> => {
    try {
        const deleteTaxiType =
            await taxiTypeModel.findByIdAndDelete(id);
        return deleteTaxiType;
    } catch (error) {
        console.log("Error deleting taxi type: ", error);
        throw error;
    }
};

export const getTaxiDistance = async ({
    country,
    distance
}: {
    country: string,
    distance: number
}) => {
    try {
        return await taxiTypeModel.aggregate([
            {
                $match: {
                    country: country ? country : "LA",
                    minDistance: { $lte: distance },
                    maxDistance: { $gt: distance },
                },
            },
            {
                $lookup: {
                    from: 'taxitypes', // name of the referenced collection
                    localField: 'taxiTypeId',
                    foreignField: '_id',
                    as: 'taxiType',
                },
            },
            {
                $unwind: '$taxiType', // optional: flatten the array
            },
        ]);

    } catch (error) {

    }
}