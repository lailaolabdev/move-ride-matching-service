import { cashLimitModel } from "../models/cashLimit";
import { ICashLimit } from "../models/cashLimit";

// CREATE
export const createCashLimitService = async ({
  price,
  limit,
  amount,
  country,
  countryCode
}: {
  price: number;
  limit: number;
  amount?: number;
  country: string;
  countryCode: string;
}): Promise<ICashLimit> => {
  try {
    const data = new cashLimitModel({
      price,
      limit,
      amount: amount || 0,
      country,
      countryCode
    });
    return await data.save();
  } catch (error) {
    throw new Error(`Failed to create cash limit: ${error}`);
  }
};

// READ ALL
export const getAllCashLimitsService = async (
  skip = 0,
  limit = 10,
  filter: any = {}
): Promise<{ total: number; data: ICashLimit[] }> => {
  try {
    const total = await cashLimitModel.countDocuments(filter);
    const data = await cashLimitModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { total, data };
  } catch (error) {
    throw new Error(`Failed to fetch cash limits: ${error}`);
  }
};

// READ BY ID
export const getCashLimitByIdService = async (
  id: string
): Promise<ICashLimit | null> => {
  try {
    return await cashLimitModel.findById(id);
  } catch (error) {
    throw new Error(`Failed to get cash limit by ID: ${error}`);
  }
};

// UPDATE
export const updateCashLimitService = async ({
  id,
  price,
  limit,
  amount,
  country,
  countryCode
}: {
  id: string;
  price?: number;
  limit?: number;
  amount?: number;
  country?: string;
  countryCode?: string;
}): Promise<ICashLimit | null> => {
  try {
    const updateData: Partial<ICashLimit> = {
      ...(price !== undefined && { price }),
      ...(limit !== undefined && { limit }),
      ...(amount !== undefined && { amount }),
      ...(country !== undefined && { country }),
      ...(countryCode !== undefined && { countryCode })
    };

    return await cashLimitModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  } catch (error) {
    throw new Error(`Failed to update cash limit: ${error}`);
  }
};

// DELETE
export const deleteCashLimitService = async (
  id: string
): Promise<ICashLimit | null> => {
  try {
    return await cashLimitModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete cash limit: ${error}`);
  }
};
