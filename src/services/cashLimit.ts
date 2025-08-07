import { cashLimitModel } from "../models/cashLimit";
import { ICashLimit } from "../models/cashLimit";

// CREATE
export const createCashLimitService = async ({
  amount,
  country,
  countryCode
}: {
  amount?: number;
  country: string;
  countryCode: string;
}): Promise<ICashLimit> => {
  try {
    const data = new cashLimitModel({
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
  filter: any = {}
): Promise<{ total: number; data: ICashLimit[] }> => {
  try {
    const total = await cashLimitModel.countDocuments(filter);
    const data = await cashLimitModel
      .find(filter)
      .skip(skip)
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
  amount,
  country,
  countryCode
}: {
  id: string;
  amount?: number;
  country?: string;
  countryCode?: string;
}): Promise<ICashLimit | null> => {
  try {
    const updateData: Partial<ICashLimit> = {
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
