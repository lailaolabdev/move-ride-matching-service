
import mongoose from 'mongoose';
import vehicleDriverModel, { IVehicleDriver } from '../models/vehicleDriver';

// CREATE
export const createVehicleDriverService = async (
    {
        taxi,
        taxiType,
        vehicleModel,
        vehicleBrand,
        driver,
        driverFullName,
        frontVehicleImage,
        backVehicleImage,
        licensePlate,
        createdBy,
        createdByFullName
    }:
        {
            taxi: string,
            taxiType: string,
            vehicleModel: string,
            vehicleBrand: string,
            driver: string,
            driverFullName: string,
            frontVehicleImage: string,
            backVehicleImage: string,
            licensePlate: string,
            createdBy: string,
            createdByFullName: string
        }): Promise<IVehicleDriver | null> => {
    try {
        const newVehicleDriver = new vehicleDriverModel({
            taxi,
            taxiType,
            vehicleModel,
            vehicleBrand,
            driver,
            driverFullName,
            frontVehicleImage,
            backVehicleImage,
            licensePlate,
            createdBy,
            createdByFullName
        });
        const savedVehicleDriver = await newVehicleDriver.save();
        return savedVehicleDriver;
    } catch (error) {
        console.log("Error creating taxi type: ", error);
        throw error;
    }
};

// READ (All Taxi Types)
export const getAllVehicleDriversService = async (filter: any, skip: number, limit: number): Promise<any> => {
    try {
        console.log("filter: ", filter);

        const pipeline: any[] = [];

        // Lookup to join Taxi and then join TaxiType
        pipeline.push(
            {
                $lookup: {
                    from: 'taxis', // Match the exact collection name in MongoDB
                    localField: 'taxi',
                    foreignField: '_id',
                    as: 'taxi'
                }
            },
            { $unwind: { path: "$taxi", preserveNullAndEmptyArrays: true } }, // Prevent missing taxi from removing record
            {
                $lookup: {
                    from: 'taxitypes', // Match the exact collection name in MongoDB
                    localField: 'taxi.taxiType',
                    foreignField: '_id',
                    as: 'taxiType'
                }
            },
            { $unwind: { path: "$taxiType", preserveNullAndEmptyArrays: true } } // Prevent missing taxiType from removing record
        );

        // Apply filtering based on taxiType AFTER lookups
        if (filter.taxiType) {
            pipeline.push({
                $match: { "taxiType._id": new mongoose.Types.ObjectId(filter.taxiType) }
            });
        }

        // **Project only required fields**
        pipeline.push({
            $project: {
                _id: 1,
                driver: 1,
                driverFullName: 1,
                licensePlate: 1,
                createdAt: 1,
                createdBy: 1,
                createdByFullName: 1,
                updatedAt: 1,
                updatedBy: 1,
                updatedByFullName: 1,
                taxi: {
                    _id: 1,
                    vehicleModel: 1,
                    vehicleBrand: 1,
                    passengerMin: 1,
                    passengerMax: 1,
                    meteredFare: 1,
                    flatFare: 1
                },
                taxiType: {
                    _id: 1,
                    name: 1,
                    icon: 1
                }
            }
        });

        // Optional filtering for other fields
        const matchConditions: any = {};
        if (filter.driver) matchConditions.driver = filter.driver;
        if (filter.licensePlate) matchConditions.licensePlate = filter.licensePlate;

        if (Object.keys(matchConditions).length > 0) {
            pipeline.push({ $match: matchConditions });
        }

        // Pagination and Sorting
        pipeline.push({ $sort: { createdAt: -1 } });
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });

        // Execute Aggregation Pipeline
        const vehicleDrivers = await vehicleDriverModel.aggregate(pipeline);

        // Get total count of matching documents (excluding pagination)
        const totalPipeline = [...pipeline];
        totalPipeline.push({ $count: "total" });
        const totalResult = await vehicleDriverModel.aggregate(totalPipeline);
        const total = totalResult.length > 0 ? totalResult[0].total : 0;

        return { total, vehicleDrivers };
    } catch (error) {
        console.error("Error retrieving vehicle drivers: ", error);
        throw error;
    }
};

// READ (Taxi Type by ID)
export const getVehicleDriverByIdService = async (id: string): Promise<IVehicleDriver | null> => {
    try {
        const vehicleDriver = await vehicleDriverModel.findById(id)
            .populate({
                path: 'taxi',
                select: 'vehicleModel vehicleBrand passengerMin passengerMax meteredFare flatFare taxiType taxi', // Select relevant fields
                populate: {
                    path: 'taxiType',
                    select: 'name icon' // Select relevant fields from taxiType
                }
            });
        return vehicleDriver;
    } catch (error) {
        console.log("Error retrieving taxi type by ID: ", error);
        throw error;
    }
};

// READ (Taxi Type by ID)
export const getVehicleDriverByDriverIdService = async (id: string): Promise<IVehicleDriver | null> => {
    try {
        const vehicleDriver = await vehicleDriverModel.findOne({ driver: id })
            .select("-_id -createdBy -createdByFullName -createdAt -updatedAt -__v")

        return vehicleDriver;
    } catch (error) {
        console.log("Error retrieving taxi type by ID: ", error);
        throw error;
    }
};

// UPDATE
export const updateVehicleDriverService = async (
    {
        taxi,
        driver,
        driverFullName,
        frontVehicleImage,
        backVehicleImage,
        licensePlate,
        updatedBy,
        updatedByFullName,
        taxiType,
        vehicleModel,
        vehicleBrand
    }:
        {
            taxi: string,
            driver: string,
            driverFullName: string,
            frontVehicleImage: string,
            backVehicleImage: string,
            licensePlate: string,
            updatedBy: string,
            updatedByFullName: string,
            taxiType: string,
            vehicleModel: string,
            vehicleBrand: string
        }): Promise<IVehicleDriver | null> => {
    try {
        const vehicleDriver = await vehicleDriverModel.findOneAndUpdate(
            { driver },
            {
                $set: {
                    taxi,
                    driver,
                    driverFullName,
                    frontVehicleImage,
                    backVehicleImage,
                    licensePlate,
                    updatedBy,
                    updatedByFullName,
                    updatedAt: new Date(),
                    taxiType,
                    vehicleModel,
                    vehicleBrand
                },
            },
            { new: true }
        );
        return vehicleDriver;
    } catch (error) {
        console.log("Error updating taxi type: ", error);
        throw error;
    }
};

// DELETE
export const deleteVehicleDriverService = async (id: string): Promise<IVehicleDriver | null> => {
    try {
        const vehicleDriver = await vehicleDriverModel.findByIdAndDelete(id);
        return vehicleDriver;
    } catch (error) {
        console.log("Error deleting taxi type: ", error);
        throw error;
    }
};
