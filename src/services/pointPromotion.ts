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
    type: "register" | "payment";
    minAmount?: number;
    pointReward: number;
    status?: boolean;
    startDate?: string;
    endDate?: string;
    country: string;
}): Promise<IPointPromotion | null> => {
    try {
        const pointPromotion = new pointPromotionModel({
            name,
            type,
            minAmount,
            pointReward,
            status,
            startDate,
            endDate,
            country
        });

        const savedPointPromotion: any = await pointPromotion.save();

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
        const pointPromotions: any[] = await pointPromotionModel
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
        const pointPromotion: IPointPromotion | null = await pointPromotionModel.findById(id);
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
    type: "register" | "payment";
    minAmount?: number;
    pointReward: number;
    status: boolean;
    startDate?: string;
    endDate?: string;
    country: string;
}): Promise<IPointPromotion | null> => {
    try {
        const updatedPointPromotion: IPointPromotion | null = await pointPromotionModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    type,
                    minAmount,
                    pointReward,
                    status,
                    startDate,
                    endDate,
                    country
                },
            },
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
        const deletedPointPromotion: IPointPromotion | null = await pointPromotionModel.findByIdAndDelete(id);
        return deletedPointPromotion;
    } catch (error) {
        console.log("Error deleting point promotion: ", error);
        throw error;
    }
};
