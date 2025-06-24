import { deleteKeysByPattern } from '../config';
import taxiModel from '../models/taxi';
import { ITaxi } from '../models/taxi';

// CREATE
export const createTaxiService = async (
    {
        taxiType,
        vehicleModel,
        vehicleModelName,
        vehicleBrand,
        vehicleBrandName,
        // passengerMin,
        // passengerMax,
        // meteredFare,
        // flatFare,
        createdBy,
        createdByFullName,
        country }:
        {
            taxiType: string;
            vehicleModel: string;
            vehicleModelName: string;
            vehicleBrand: string;
            vehicleBrandName: string;
            // passengerMin: number;
            // passengerMax: number;
            // meteredFare: number;
            // flatFare: number;
            country: string;
            createdBy: string;
            createdByFullName: string;
        }): Promise<ITaxi | null> => {
    try {
        const taxi = new taxiModel({
            taxiType,
            vehicleModel,
            vehicleModelName,
            vehicleBrand,
            vehicleBrandName,
            // passengerMin,
            // passengerMax,
            // meteredFare,
            // flatFare,
            country,
            createdBy,
            createdByFullName,
        });

        if (taxi) {
            await deleteKeysByPattern('taxies*'); // Invalidate the cache (if needed)
        }

        const savedTaxi = await taxi.save();
        return savedTaxi;
    } catch (error) {
        console.log("Error creating vehicle: ", error);
        throw error;
    }
};

// READ (All Vehicles)
export const getAllTaxiService = async (skip: number, limit: number, filter: object): Promise<any> => {
    try {
        const total = await taxiModel.countDocuments(filter);
        const taxies = await taxiModel.find(filter)
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'taxiType',
                select: 'name icon',
            })
            .sort({ createdAt: -1 });

        return { total, taxies };
    } catch (error) {
        console.log("Error retrieving vehicles: ", error);
        throw error;
    }
};

// READ (Vehicle by ID)
export const getTaxiByIdService = async (id: string): Promise<ITaxi | null> => {
    try {
        const taxi = await taxiModel.findById(id)
            .populate({
                path: 'taxiType',
                select: 'name icon',
            });
        return taxi;
    } catch (error) {
        console.log("Error retrieving vehicle by ID: ", error);
        throw error;
    }
};

// UPDATE
export const updateTaxiService = async (
    { id, taxiType, vehicleModel, vehicleBrand,isOpened,
        // passengerMin, passengerMax, meteredFare, flatFare,
        updatedBy, updatedByFullName }:
        {
            id: string;
            taxiType: string;
            vehicleModel?: string;
            vehicleBrand?: string;
            isOpened?: boolean;
            // passengerMin?: number;
            // passengerMax?: number;
            // meteredFare?: number;
            // flatFare?: number;
            updatedBy: string;
            updatedByFullName: string;
        }): Promise<ITaxi | null> => {
    try {
        const updatedTaxi = await taxiModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    taxiType,
                    vehicleModel,
                    vehicleBrand,
                    isOpened,
                    // passengerMin,
                    // passengerMax,
                    // meteredFare,
                    // flatFare,
                    updatedBy,
                    updatedAt: new Date(),
                    updatedByFullName
                },
            },
            { new: true }
        );
        return updatedTaxi;
    } catch (error) {
        console.log("Error updating vehicle: ", error);
        throw error;
    }
};

// DELETE
export const deleteTaxiService = async (id: string): Promise<ITaxi | null> => {
    try {
        const deletedTaxi = await taxiModel.findByIdAndDelete(id);
        return deletedTaxi;
    } catch (error) {
        console.log("Error deleting vehicle: ", error);
        throw error;
    }
};
