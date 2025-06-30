import { driverRateModel } from "../models/delayPrice"; // You may want to rename this to `delayPriceModel`
import { IDelayPrice } from "../models/delayPrice";

// CREATE
export const createDelayPriceService = async ({
  price,
  createdBy,
  createdByFullName,
  country,
  countryCode,
}: {
  price: number;
  createdBy: string;
  createdByFullName: string;
  country: string;
  countryCode: string;
}): Promise<IDelayPrice | null> => {
  try {
    const delayPrice = new driverRateModel({
      price,
      createdBy,
      createdByFullName,
      country,
      countryCode,
    });

    const savedDelayPrice = await delayPrice.save();
    return savedDelayPrice;
  } catch (error) {
    throw error;
  }
};

// READ ALL
export const getAllDelayPricesService = async (
  skip: number,
  limit: number,
  filter: any
): Promise<any> => {
  try {
    const total = await driverRateModel.countDocuments(filter);
    const prices = await driverRateModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return { total, prices };
  } catch (error) {
    throw error;
  }
};

// READ BY ID
export const getDelayPriceByIdService = async (
  id: string
): Promise<IDelayPrice | null> => {
  try {
    return await driverRateModel.findById(id);
  } catch (error) {
    throw error;
  }
};

// UPDATE
export const updateDelayPriceService = async ({
  id,
  price,
  updatedBy,
  updatedByFullName,
  country,
  countryCode,
}: {
  id: string;
  price: number;
  updatedBy: string;
  updatedByFullName: string;
  country: string;
  countryCode: string;
}): Promise<IDelayPrice | null> => {
  try {
    return await driverRateModel.findByIdAndUpdate(
      id,
      {
        $set: {
          price,
          updatedBy,
          updatedByFullName,
          country,
          countryCode,
        },
      },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

// DELETE
export const deleteDelayPriceService = async (
  id: string
): Promise<IDelayPrice | null> => {
  try {
    return await driverRateModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
