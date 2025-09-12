import newComerPromotionModel, { INewComerPromotion } from "../models/newComerPromotion";
import newComerPromotionUsageModel, { INewComerPromotionUsage } from "../models/newComerPromotionUsage";

// CREATE NewComer Promotion
export const createNewComerPromotionService = async ({
    name,
    discount,
    country
}: {
    name: string;
    discount: number;
    country: string;
}): Promise<INewComerPromotion | null> => {
    try {
        const newComerPromotion = new newComerPromotionModel({
            name,
            discount,
            country,
        });

        const savedNewComerPromotion = await newComerPromotion.save();
        return savedNewComerPromotion;
    } catch (error) {
        throw error;
    }
};

// READ All NewComer Promotions
export const getAllNewComerPromotionsService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await newComerPromotionModel.countDocuments(filter);
        const newComerPromotions = await newComerPromotionModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, newComerPromotions };
    } catch (error) {
        throw error;
    }
};

// READ NewComer Promotion by ID
export const getNewComerPromotionByIdService = async (
    id: string
): Promise<INewComerPromotion | null> => {
    try {
        const newComerPromotion = await newComerPromotionModel.findById(id);
        return newComerPromotion;
    } catch (error) {
        throw error;
    }
};

// UPDATE NewComer Promotion
export const updateNewComerPromotionService = async ({
    id,
    name,
    discount,
    status,
    country
}: {
    id: string;
    name: string;
    discount: number;
    status?: boolean;
    country: string;
}): Promise<INewComerPromotion | null> => {
    try {
        const updateData: any = {
            name,
            discount,
            country,
        };
        
        // Only include status if it's provided (not undefined)
        if (status !== undefined) {
            updateData.status = status;
        }

        const updatedNewComerPromotion = await newComerPromotionModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        return updatedNewComerPromotion;
    } catch (error) {
        console.log("Error updating newcomer promotion: ", error);
        throw error;
    }
};

// DELETE NewComer Promotion
export const deleteNewComerPromotionService = async (
    id: string
): Promise<INewComerPromotion | null> => {
    try {
        const deletedNewComerPromotion = await newComerPromotionModel.findByIdAndDelete(id);
        return deletedNewComerPromotion;
    } catch (error) {
        console.log("Error deleting newcomer promotion: ", error);
        throw error;
    }
};

// CHECK if user has already used newcomer promotion
export const checkNewComerPromotionUsageService = async ({
    userId,
    country
}: {
    userId: string;
    country: string;
}): Promise<{ hasUsed: boolean; usageDetails: INewComerPromotionUsage | null }> => {
    try {
        const usageRecord = await newComerPromotionUsageModel
            .findOne({ userId, country })
            .populate('newComerPromotionId');
        
        return {
            hasUsed: !!usageRecord,
            usageDetails: usageRecord
        };
    } catch (error) {
        console.log("Error checking newcomer promotion usage: ", error);
        throw error;
    }
};

// RECORD newcomer promotion usage
export const recordNewComerPromotionUsageService = async ({
    userId,
    newComerPromotionId,
    country
}: {
    userId: string;
    newComerPromotionId: string;
    country: string;
}): Promise<INewComerPromotionUsage | null> => {
    try {
        const usageRecord = new newComerPromotionUsageModel({
            userId,
            newComerPromotionId,
            country
        });

        const savedUsageRecord = await usageRecord.save();
        return savedUsageRecord;
    } catch (error) {
        console.log("Error recording newcomer promotion usage: ", error);
        throw error;
    }
};

// GET all newcomer promotion usage records (for admin purposes)
export const getAllNewComerPromotionUsageService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<{ total: number; usageRecords: INewComerPromotionUsage[] }> => {
    try {
        const total = await newComerPromotionUsageModel.countDocuments(filter);
        const usageRecords = await newComerPromotionUsageModel
            .find(filter)
            .populate('userId', 'name email') // Adjust fields as needed
            .populate('newComerPromotionId')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, usageRecords };
    } catch (error) {
        console.log("Error fetching newcomer promotion usage records: ", error);
        throw error;
    }
};
