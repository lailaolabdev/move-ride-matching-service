import promotionModel, { IPromotion } from "../models/promotion";

// CREATE Promotion
export const createPromotionService = async ({
    name,
    discount,
    usingType,
    period,
    country
}: {
    name: string;
    discount: number;
    usingType: 'ONCE_TIME_TYPE' | 'PERIOD_TYPE';
    period?: {
        startDate: string;
        endDate: string;
    };
    country: string;
}): Promise<IPromotion | null> => {
    try {
        const promotion = new promotionModel({
            name,
            discount,
            usingType,
            period,
            country,
        });

        const savedPromotion = await promotion.save();
        return savedPromotion;
    } catch (error) {
        throw error;
    }
};

// READ All Promotions
export const getAllPromotionsService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await promotionModel.countDocuments();
        const promotions = await promotionModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, promotions };
    } catch (error) {
        throw error;
    }
};

// READ Promotion by ID
export const getPromotionByIdService = async (
    id: string
): Promise<IPromotion | null> => {
    try {
        const promotion = await promotionModel.findById(id);
        return promotion;
    } catch (error) {
        throw error;
    }
};

// UPDATE Promotion
export const updatePromotionService = async ({
    id,
    name,
    discount,
    usingType,
    period,
    status,
    country
}: {
    id: string;
    name: string;
    discount: number;
    usingType: 'ONCE_TIME_TYPE' | 'PERIOD_TYPE';
    period?: {
        startDate: string;
        endDate: string;
    };
    status: boolean;
    country: string;
}): Promise<IPromotion | null> => {
    try {
        const updatedPromotion = await promotionModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    discount,
                    usingType,
                    period,
                    status,
                    country,
                },
            },
            { new: true }
        );
        return updatedPromotion;
    } catch (error) {
        console.log("Error updating promotion: ", error);
        throw error;
    }
};

// DELETE Promotion
export const deletePromotionService = async (
    id: string
): Promise<IPromotion | null> => {
    try {
        const deletedPromotion = await promotionModel.findByIdAndDelete(id);
        return deletedPromotion;
    } catch (error) {
        console.log("Error deleting promotion: ", error);
        throw error;
    }
};