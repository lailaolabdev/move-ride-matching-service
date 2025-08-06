import driverCashModel, { IDriverCash } from '../models/driverCash';

// Create
export const createDriverCashService = async (driverId: String, body: any): Promise<IDriverCash> => {
    try {
        const driverCash = await driverCashModel.create({
            driver: driverId,
            ...body
        });

        return driverCash;
    } catch (error) {
        console.error("Error creating driver cash: ", error);
        throw error;
    }
};

// Get All
export const getAllDriverCashService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<{ total: number, driverCashList: IDriverCash[] }> => {
    try {
        const total = await driverCashModel.countDocuments(filter);
        const driverCashList = await driverCashModel.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, driverCashList };
    } catch (error) {
        console.error("Error retrieving driver cash: ", error);
        throw error;
    }
};

// Get by ID
export const getDriverCashByIdService = async (id: string): Promise<IDriverCash | null> => {
    try {
        return await driverCashModel.findById(id);
    } catch (error) {
        console.error("Error retrieving driver cash by ID: ", error);
        throw error;
    }
};

// Get by ID
export const getDriverCashByDriverIdService = async (id: string): Promise<IDriverCash | null> => {
    try {
        return await driverCashModel.findOne({ driver: id });
    } catch (error) {
        console.error("Error retrieving driver cash by driver ID: ", error);
        throw error;
    }
};

// Update
export const updateDriverCashServiceById = async (id: String, body: any): Promise<IDriverCash | null> => {
    try {
        const updatedDriverCash = await driverCashModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );

        return updatedDriverCash;
    } catch (error) {
        console.error("Error updating driver cash: ", error);
        throw error;
    }
};

// Update
export const updateDriverCashServiceByDriverId = async (driverId: String, body: any): Promise<IDriverCash | null> => {
    try {
        const updatedDriverCash = await driverCashModel.findOneAndUpdate(
            { driver: driverId },
            { $set: body },
            { new: true }
        );

        return updatedDriverCash;
    } catch (error) {
        console.error("Error updating driver cash: ", error);
        throw error;
    }
};

// Delete
export const deleteDriverCashService = async (id: string): Promise<IDriverCash | null> => {
    try {
        return await driverCashModel.findByIdAndDelete(id);
    } catch (error) {
        console.error("Error deleting driver cash: ", error);
        throw error;
    }
};
