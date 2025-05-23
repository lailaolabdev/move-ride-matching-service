import newComerPromotionModel, { INewComerPromotion } from "../models/newComerPromotion";

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
    status: boolean;
    country: string;
}): Promise<INewComerPromotion | null> => {
    try {
        const updatedNewComerPromotion = await newComerPromotionModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    discount,
                    status,
                    country,
                },
            },
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
