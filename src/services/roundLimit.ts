import { roundLimitModel } from "../models/roundLimit";
import { IRoundLimit } from "../models/roundLimit";

// CREATE
export const createRoundLimitService = async ({
  round,
  country,
  countryCode
}: {
  round?: number;
  country: string;
  countryCode: string;
}): Promise<IRoundLimit> => {
  try {
    const data = new roundLimitModel({
      round: round ?? 0,
      country,
      countryCode
    });
    return await data.save();
  } catch (error) {
    throw new Error(`Failed to create round limit: ${error}`);
  }
};

// READ ALL
export const getAllRoundLimitsService = async (
  skip = 0,
  filter: any = {}
): Promise<{ total: number; data: IRoundLimit[] }> => {
  try {
    const total = await roundLimitModel.countDocuments(filter);
    const data = await roundLimitModel
      .find(filter)
      .skip(skip)
      .sort({ createdAt: -1 });

    return { total, data };
  } catch (error) {
    throw new Error(`Failed to fetch round limits: ${error}`);
  }
};

// READ BY ID
export const getRoundLimitByIdService = async (
  id: string
): Promise<IRoundLimit | null> => {
  try {
    return await roundLimitModel.findById(id);
  } catch (error) {
    throw new Error(`Failed to get round limit by ID: ${error}`);
  }
};

// UPDATE
export const updateRoundLimitService = async ({
  id,
  round,
  country,
  countryCode
}: {
  id: string;
  round?: number;
  country?: string;
  countryCode?: string;
}): Promise<IRoundLimit | null> => {
  try {
    const updateData: Partial<IRoundLimit> = {
      ...(round !== undefined && { round }),
      ...(country !== undefined && { country }),
      ...(countryCode !== undefined && { countryCode })
    };

    return await roundLimitModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  } catch (error) {
    throw new Error(`Failed to update round limit: ${error}`);
  }
};

// DELETE
export const deleteRoundLimitService = async (
  id: string
): Promise<IRoundLimit | null> => {
  try {
    return await roundLimitModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete round limit: ${error}`);
  }
};