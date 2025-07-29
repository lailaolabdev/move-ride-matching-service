import { driverRateModel } from "../models/driverRate";
import { IDriverRate } from "../models/driverRate";

// CREATE
export const createDriverRateService = async ({
  registrationSource,
  minDistance,
  maxDistance,
  percentage,
  createdBy,
  createdByFullName,
  country,
  countryCode
}: {
  registrationSource: string;
  minDistance: number;
  maxDistance: number;
  percentage: number;
  createdBy: string;
  createdByFullName: string;
  country: string;
  countryCode: string;
}): Promise<IDriverRate | null> => {
  try {
    const rate = new driverRateModel({
      registrationSource,
      minDistance,
      maxDistance,
      percentage,
      createdBy,
      createdByFullName,
      country,
      countryCode
    });

    const savedRate = await rate.save();
    return savedRate;
  } catch (error) {
    throw error;
  }
};

// READ ALL
export const getAllDriverRatesService = async (
  skip: number,
  limit: number,
  filter: any
): Promise<any> => {
  try {
    const total = await driverRateModel.countDocuments(filter);
    const rates = await driverRateModel
      .find(filter)
      .populate("registrationSource")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { total, rates };
  } catch (error) {
    throw error;
  }
};

// READ BY ID
export const getDriverRateByIdService = async (
  id: string
): Promise<IDriverRate | null> => {
  try {
    return await driverRateModel.findById(id).populate("registrationSource");
  } catch (error) {
    throw error;
  }
};

// UPDATE
export const updateDriverRateService = async ({
  id,
  registrationSource,
  minDistance,
  maxDistance,
  percentage,
  updatedBy,
  updatedByFullName,
}: {
  id: string;
  registrationSource: string;
  minDistance: number;
  maxDistance: number;
  percentage: number;
  updatedBy: string;
  updatedByFullName: string;
}): Promise<IDriverRate | null> => {
  try {
    return await driverRateModel.findByIdAndUpdate(
      id,
      {
        $set: {
          registrationSource,
          minDistance,
          maxDistance,
          percentage,
          updatedBy,
          updatedByFullName
        }
      },
      { new: true }
    ).populate("registrationSource");
  } catch (error) {
    throw error;
  }
};

// DELETE
export const deleteDriverRateService = async (
  id: string
): Promise<IDriverRate | null> => {
  try {
    return await driverRateModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};