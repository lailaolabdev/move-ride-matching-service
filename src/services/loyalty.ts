import { Request } from 'express'
import { ILoyalty, loyaltyModel } from '../models/loyalty';

export const createLoyaltyService = async (req: Request) => {
    try {
        const user = (req as any).user.id;

        const {
            image,
            name,
            quantity,
            price,
            countryId,
            countryCode
        } = req.body

        const loyalty = await loyaltyModel.create({
            image,
            name,
            quantity,
            price,
            countryId,
            countryCode,
            createdBy: user
        })

        return loyalty
    } catch (error) {
        console.log("Error creating loyalty: ", error);
        throw error;
    }
}

export const getAllLoyaltyService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await loyaltyModel.countDocuments(filter);
        const Loyalties = await loyaltyModel.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, Loyalties };
    } catch (error) {
        console.log("Error retrieving loyalties: ", error);
        throw error;
    }
};

export const getLoyaltyByIdService = async (id: string): Promise<ILoyalty | null> => {
    try {
        const loyalty = await loyaltyModel.findById(id)

        return loyalty;
    } catch (error) {
        console.log("Error retrieving loyalty by ID: ", error);
        throw error;
    }
};

export const updateLoyaltyService = async (req: Request): Promise<ILoyalty | null> => {
    try {
        const id = req.params.id

        const user = (req as any).user.id;

        const {
            image,
            name,
            quantity,
            price
        } = req.body

        const updatedLoyalty = await loyaltyModel.findByIdAndUpdate(
            id,
            {
                image,
                name,
                quantity,
                price,
                updatedBy: user
            },
            { new: true }
        );

        return updatedLoyalty;
    } catch (error) {
        console.log("Error updating loyalty: ", error);
        throw error;
    }
};

export const deleteLoyaltyService = async (id: string): Promise<ILoyalty | null> => {
    try {
        const deletedLoyalty = await loyaltyModel.findByIdAndDelete(id);

        return deletedLoyalty;
    } catch (error) {
        console.log("Error deleting loyalty: ", error);
        throw error;
    }
};