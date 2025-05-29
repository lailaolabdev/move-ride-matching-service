import taxiTypePricingModel from "../models/taxiTypePricing";
import { ITaxiTypePricing } from "../models/taxiTypePricing";

// CREATE
export const createTaxiTypePricingService = async ({
    taxiTypeId,
    minDistance,
    maxDistance,
    meterPrice,
    flatFarePrice,
    country
}: {
    taxiTypeId: string;
    minDistance: number;
    maxDistance: number;
    meterPrice: number;
    flatFarePrice: number;
    country: string;
}): Promise<ITaxiTypePricing | null> => {
    try {
        const taxiTypePricing = new taxiTypePricingModel({
            taxiTypeId,
            minDistance,
            maxDistance,
            meterPrice,
            flatFarePrice,
            country
        });

        const savedTaxiTypePricing = await taxiTypePricing.save();

        return savedTaxiTypePricing;
    } catch (error) {
        throw error;
    }
};

// READ (All Taxi Types)
export const getAllTaxiTypePricingService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await taxiTypePricingModel.countDocuments(filter);
        const taxiTypePricing = await taxiTypePricingModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, taxiTypePricing };
    } catch (error) {
        throw error;
    }
};

// READ (Taxi Type by ID)
export const getTaxiTypePricingByIdService = async (
    id: string
): Promise<ITaxiTypePricing | null> => {
    try {
        const taxiTypePricing = await taxiTypePricingModel.findById(id);

        return taxiTypePricing;
    } catch (error) {
        throw error;
    }
};

// UPDATE
export const updateTaxiTypePricingService = async ({
    id,
    taxiTypeId,
    minDistance,
    maxDistance,
    meterPrice,
    flatFarePrice,
    country
}: {
    id: string;
    taxiTypeId: string;
    minDistance: number;
    maxDistance: number;
    meterPrice: number;
    flatFarePrice: number;
    country: string;
}): Promise<ITaxiTypePricing | null> => {
    try {
        const updatedTaxiTypePricing =
            await taxiTypePricingModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        taxiTypeId,
                        minDistance,
                        maxDistance,
                        meterPrice,
                        flatFarePrice,
                        country
                    },
                },
                { new: true }
            );

        return updatedTaxiTypePricing;
    } catch (error) {
        console.log("Error updating taxi type: ", error);
        throw error;
    }
};

// DELETE
export const deleteTaxiTypePricingService = async (
    id: string
): Promise<ITaxiTypePricing | null> => {
    try {
        const deleteTaxiTypePricing =
            await taxiTypePricingModel.findByIdAndDelete(id);
        return deleteTaxiTypePricing;
    } catch (error) {
        console.log("Error deleting taxi type: ", error);
        throw error;
    }
};
