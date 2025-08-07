import { aroundLimitModel } from "../models/aroundLimit";
import { IAroundLimit } from "../models/aroundLimit";

// CREATE
export const createAroundLimitService = async ({
  around,
  country,
  countryCode
}: {
  around?: number;
  country: string;
  countryCode: string;
}): Promise<IAroundLimit> => {
  try {
    const data = new aroundLimitModel({
      around: around ?? 0,
      country,
      countryCode
    });
    return await data.save();
  } catch (error) {
    throw new Error(`Failed to create around limit: ${error}`);
  }
};

// READ ALL
export const getAllAroundLimitsService = async (
  skip = 0,
  filter: any = {}
): Promise<{ total: number; data: IAroundLimit[] }> => {
  try {
    const total = await aroundLimitModel.countDocuments(filter);
    const data = await aroundLimitModel
      .find(filter)
      .skip(skip)
      .sort({ createdAt: -1 });

    return { total, data };
  } catch (error) {
    throw new Error(`Failed to fetch around limits: ${error}`);
  }
};

// READ BY ID
export const getAroundLimitByIdService = async (
  id: string
): Promise<IAroundLimit | null> => {
  try {
    return await aroundLimitModel.findById(id);
  } catch (error) {
    throw new Error(`Failed to get around limit by ID: ${error}`);
  }
};

// UPDATE
export const updateAroundLimitService = async ({
  id,
  around,
  country,
  countryCode
}: {
  id: string;
  around?: number;
  country?: string;
  countryCode?: string;
}): Promise<IAroundLimit | null> => {
  try {
    const updateData: Partial<IAroundLimit> = {
      ...(around !== undefined && { around }),
      ...(country !== undefined && { country }),
      ...(countryCode !== undefined && { countryCode })
    };

    return await aroundLimitModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  } catch (error) {
    throw new Error(`Failed to update around limit: ${error}`);
  }
};

// DELETE
export const deleteAroundLimitService = async (
  id: string
): Promise<IAroundLimit | null> => {
  try {
    return await aroundLimitModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete around limit: ${error}`);
  }
};
