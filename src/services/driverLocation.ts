import { Request } from 'express'
import { IDriverLocation, driverLocationModel } from '../models/driverLocation';

export const createDriverLocationService = async (req: Request) => {
    try {
        const user = (req as any).user.id;

        const { location } = req.body

        const driverLocation = await driverLocationModel.create({
            driverId: user,
            location
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
        const driverLocation = await driverLocationModel.findOne({ driverId: id })

        return driverLocation;
    } catch (error) {
        console.log("Error retrieving driverLocation by ID: ", error);
        throw error;
    }
};

export const updateDriverLocationService = async (req: Request): Promise<IDriverLocation | null> => {
    try {
        const driverId = (req as any).user.id;

        const { location } = req.body

        console.log(location);


        const updatedDriverLocation = await driverLocationModel.findOneAndUpdate(
            { driverId },
            { location },
            { new: true, runValidators: true }
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