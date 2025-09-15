import festivalPromotionModel, { IFestivalPromotion } from "../models/festivalPromotion";

// CREATE Festival Promotion
export const createFestivalPromotionService = async ({
    name,
    discount,
    usingType,
    periodStartTime,
    periodEndTime,
    country
}: {
    name: string;
    discount: number;
    usingType: 'ONCE_TIME_TYPE' | 'PERIOD_TYPE';
    periodStartTime: Date;
    periodEndTime: Date;
    country: string;
}): Promise<IFestivalPromotion | null> => {
    try {
        const festivalPromotionData = {
            name,
            discount,
            usingType,
            periodStartTime,
            periodEndTime,
            country,
        };

        const festivalPromotion = new festivalPromotionModel(festivalPromotionData);

        const savedFestivalPromotion = await festivalPromotion.save();
        return savedFestivalPromotion;
    } catch (error) {
        throw error;
    }
};

// READ All Festival Promotions
export const getAllFestivalPromotionsService = async (
    skip: number,
    limit: number,
    filter: any
): Promise<any> => {
    try {
        const total = await festivalPromotionModel.countDocuments(filter);
        const festivalPromotions = await festivalPromotionModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        return { total, festivalPromotions };
    } catch (error) {
        throw error;
    }
};

// READ Festival Promotion by ID
export const getFestivalPromotionByIdService = async (
    id: string
): Promise<IFestivalPromotion | null> => {
    try {
        const festivalPromotion = await festivalPromotionModel.findById(id);
        return festivalPromotion;
    } catch (error) {
        throw error;
    }
};

// UPDATE Festival Promotion
export const updateFestivalPromotionService = async ({
    id,
    name,
    discount,
    usingType,
    periodStartTime,
    periodEndTime,
    status,
    country
}: {
    id: string;
    name?: string;
    discount?: number;
    usingType?: 'ONCE_TIME_TYPE' | 'PERIOD_TYPE';
    periodStartTime?: Date;
    periodEndTime?: Date;
    status?: boolean;
    country?: string;
}): Promise<IFestivalPromotion | null> => {
    try {
        const updateData: any = {
        };

        if (name) {
            updateData.name = name;
        }
        if (discount) {
            updateData.discount = discount;
        }
        if (usingType) {
            updateData.usingType = usingType;
        }
        if (country) {
            updateData.country = country;
        }

        // Add period dates if provided
        if (periodStartTime) {
            updateData.periodStartTime = periodStartTime;
        }
        if (periodEndTime) {
            updateData.periodEndTime = periodEndTime;
        }

        // Only include status if it's provided (not undefined)
        if (status !== undefined) {
            updateData.status = status;
        }

        const updatedFestivalPromotion = await festivalPromotionModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        return updatedFestivalPromotion;
    } catch (error) {
        console.log("Error updating festival promotion: ", error);
        throw error;
    }
};

// DELETE Festival Promotion
export const deleteFestivalPromotionService = async (
    id: string
): Promise<IFestivalPromotion | null> => {
    try {
        const deletedFestivalPromotion = await festivalPromotionModel.findByIdAndDelete(id);
        return deletedFestivalPromotion;
    } catch (error) {
        console.log("Error deleting festival promotion: ", error);
        throw error;
    }
};

// DELETE Festival Promotion
export const updateFestivalPromotionByDateService = async ({
    date,
    country
}: {
    date: string,
    country: string
}
) => {
    try {
        const festivalPromotion = await festivalPromotionModel.updateMany(
            {
                "periodEndTime": { $lt: new Date(date) },
                country: country,
                status: true,
            },
            { $set: { status: false } }
        );

        return festivalPromotion;
    } catch (error) {
        console.log("Error deleting festival promotion: ", error);
        throw error;
    }
};
