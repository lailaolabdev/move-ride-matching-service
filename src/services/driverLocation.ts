import { Request } from 'express'
import { IDriverLocation, driverLocationModel } from '../models/driverLocation';

export const createDriverLocationService = async (req: Request) => {
    try {
        const user = (req as any).user.id;

        const { latitude, longitude, area } = req.body

        const driverLocation = await driverLocationModel.create({
            driverId: user,
            latitude,
            longitude,
            area
        })

        return driverLocation
    } catch (error) {
        console.log("Error creating driver location: ", error);
        throw error;
    }
}

export const getAllDriverLocationService = async (): Promise<any> => {
    try {
        const total = await driverLocationModel.countDocuments();

        const driverLocation = await driverLocationModel.find()

        return { total, driverLocation };
    } catch (error) {
        console.log("Error retrieving driverLocation: ", error);
        throw error;
    }
};

export const getDriverLocationByIdService = async (id: string): Promise<IDriverLocation | null> => {
    try {
        const driverLocation = await driverLocationModel.findById(id)

        return driverLocation;
    } catch (error) {
        console.log("Error retrieving driverLocation by ID: ", error);
        throw error;
    }
};

export const updateDriverLocationService = async (req: Request): Promise<IDriverLocation | null> => {
    try {
        const driverId = (req as any).user.id;

        const { latitude, longitude, area } = req.body

        const updatedDriverLocation = await driverLocationModel.findOneAndUpdate(
            { driverId },
            { latitude, longitude, area },
            { new: true }
        );

        return updatedDriverLocation;
    } catch (error) {
        console.log("Error updating driver location: ", error);
        throw error;
    }
};

export const deleteDriverLocationService = async (id: string): Promise<IDriverLocation | null> => {
    try {
        const deletedDriverLocation = await driverLocationModel.findByIdAndDelete(id);

        return deletedDriverLocation;
    } catch (error) {
        console.log("Error deleting driver location: ", error);
        throw error;
    }
};