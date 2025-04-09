import { Request } from 'express'
import { ILoyaltyClaim, loyaltyClaimModel } from '../models/loyaltyClaim';

export const createLoyaltyClaimService = async (req: Request) => {
    try {
        const userId = (req as any).user.id;

        const { loyaltyId, acceptedType, address, countryId, countryCode } = req.body

        const loyaltyClaim = await loyaltyClaimModel.create({
            userId,
            loyaltyId,
            acceptedType,
            address,
            countryId,
            countryCode
        })

        return loyaltyClaim
    } catch (error) {
        console.log("Error creating loyalty claim: ", error);
        throw error;
    }
}

export const getAllLoyaltyClaimService = async (skip: number, limit: number): Promise<any> => {
    try {
        const total = await loyaltyClaimModel.countDocuments();
        const Loyalties = await loyaltyClaimModel.find()
            .skip(skip)
            .limit(limit);

        return { total, Loyalties };
    } catch (error) {
        console.log("Error retrieving loyalty claim: ", error);
        throw error;
    }
};

export const getLoyaltyClaimByIdService = async (id: string): Promise<ILoyaltyClaim | null> => {
    try {
        const loyalty = await loyaltyClaimModel.findById(id)

        return loyalty;
    } catch (error) {
        console.log("Error retrieving loyalty claim by ID: ", error);
        throw error;
    }
};

export const updateLoyaltyClaimService = async (req: Request): Promise<ILoyaltyClaim | null> => {
    try {
        const id = req.params.id

        const { status } = req.body

        const updatedLoyaltyClaim = await loyaltyClaimModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        return updatedLoyaltyClaim;
    } catch (error) {
        console.log("Error updating loyalty claim: ", error);
        throw error;
    }
};

export const deleteLoyaltyClaimService = async (id: string): Promise<ILoyaltyClaim | null> => {
    try {
        const deletedLoyaltyClaim = await loyaltyClaimModel.findByIdAndDelete(id);

        return deletedLoyaltyClaim;
    } catch (error) {
        console.log("Error deleting loyalty claim: ", error);
        throw error;
    }
};