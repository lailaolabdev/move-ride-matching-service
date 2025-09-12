import pointPromotionModel, { IPointPromotion } from "../models/pointPromotion";

// CREATE Point Promotion
export const createPointPromotionService = async ({
    name,
    type,
    minAmount,
    pointReward,
    status,
    startDate,
    endDate,
    country
}: {
    name: string;
    type: "REGISTER" | "PAYMENT";
    minAmount?: number;
    pointReward: number;
    status?: boolean;
    startDate?: Date;
    endDate?: Date;
    country: string;
}): Promise<IPointPromotion | null> => {
    try {
        const pointPromotionData: any = {
            name,
            type,
            pointReward,
            country
        };

        // Add optional fields if provided
        if (minAmount !== undefined) {
            pointPromotionData.minAmount = minAmount;
        }
        if (status !== undefined) {
            pointPromotionData.status = status;
        }
        if (startDate) {
            pointPromotionData.startDate = startDate;
        }
        if (endDate) {
            pointPromotionData.endDate = endDate;
        }

        const pointPromotion = new pointPromotionModel(pointPromotionData);
        const savedPointPromotion = await pointPromotion.save();

        return savedPointPromotion;
    } catch (error) {
        throw error;
    }
};

// READ All Point Promotions
export const getAllPointPromotionsService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<{ total: number; pointPromotions: IPointPromotion[] }> => {
    try {
        const total = await pointPromotionModel.countDocuments(filter);
        const pointPromotions = await pointPromotionModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, pointPromotions };
    } catch (error) {
        throw error;
    }
};

// READ Point Promotion by ID
export const getPointPromotionByIdService = async (
    id: string
): Promise<IPointPromotion | null> => {
    try {
        const pointPromotion = await pointPromotionModel.findById(id);
        return pointPromotion;
    } catch (error) {
        throw error;
    }
};

// UPDATE Point Promotion
export const updatePointPromotionService = async ({
    id,
    name,
    type,
    minAmount,
    pointReward,
    status,
    startDate,
    endDate,
    country
}: {
    id: string;
    name: string;
    type: "REGISTER" | "PAYMENT";
    minAmount?: number;
    pointReward: number;
    status?: boolean;
    startDate?: Date;
    endDate?: Date;
    country: string;
}): Promise<IPointPromotion | null> => {
    try {
        const updateData: any = {
            name,
            type,
            pointReward,
            country
        };

        // Add optional fields if provided
        if (minAmount !== undefined) {
            updateData.minAmount = minAmount;
        }
        if (status !== undefined) {
            updateData.status = status;
        }
        if (startDate) {
            updateData.startDate = startDate;
        }
        if (endDate) {
            updateData.endDate = endDate;
        }

        const updatedPointPromotion = await pointPromotionModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        return updatedPointPromotion;
    } catch (error) {
        console.log("Error updating point promotion: ", error);
        throw error;
    }
};

// DELETE Point Promotion
export const deletePointPromotionService = async (
    id: string
): Promise<IPointPromotion | null> => {
    try {
        const deletedPointPromotion = await pointPromotionModel.findByIdAndDelete(id);
        return deletedPointPromotion;
    } catch (error) {
        console.log("Error deleting point promotion: ", error);
        throw error;
    }
};
