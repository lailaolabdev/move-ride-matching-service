import { Request } from 'express'
import { ILoyaltyClaim, loyaltyClaimModel } from '../models/loyaltyClaim';
import { ClientSession } from 'mongoose';

export const createLoyaltyClaimService = async (req: Request, userPhone: string, loyaltyName: string, loyaltyPrice: number, session?: ClientSession) => {
    try {
        const userId = (req as any).user.id;
        const userFullName = (req as any).user.fullName;

        const { loyaltyId, acceptedType, address, country, userPhone: reqUserPhone, loyaltyName: reqLoyaltyName, loyaltyPrice: reqLoyaltyPrice, userFullName: reqUserFullName } = req.body
        console.log("req.body: ", req.body);

        const loyaltyClaim = await loyaltyClaimModel.create([{
            userId,
            loyaltyId,
            userFullName: reqUserFullName || userFullName,
            userPhone: reqUserPhone || userPhone,
            loyaltyName: reqLoyaltyName || loyaltyName, 
            loyaltyPrice: reqLoyaltyPrice || loyaltyPrice,
            acceptedType,
            address,
            country,
            createdBy: userId,
            createdByFullName: userFullName
        }], { session });

        return loyaltyClaim[0];
    } catch (error) {
        console.log("Error creating loyalty claim: ", error);
        throw error;
    }
}

export const getAllLoyaltyClaimService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await loyaltyClaimModel.countDocuments(filter);

        const loyalties = await loyaltyClaimModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .lean();

        return { total, loyalties };
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
        const userId = (req as any).user.id;
        const userFullName = (req as any).user.fullName;

        const { status } = req.body

        // Prepare the update object
        const updateData: any = {
            status,
            updatedBy: userId,
            updatedByFullName: userFullName
        };

        // Set timestamp and user fields based on status
        const currentDate = new Date();
        
        if (status === "APPROVED") {
            updateData.approvedAt = currentDate;
            updateData.approvedBy = userId;
        } else if (status === "REJECTED") {
            updateData.rejectedAt = currentDate;
            updateData.rejectedBy = userId;
        } else if (status === "DELIVERED") {
            updateData.deliveredAt = currentDate;
            updateData.deliveredBy = userId;
        }

        const updatedLoyaltyClaim = await loyaltyClaimModel.findByIdAndUpdate(
            id,
            updateData,
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