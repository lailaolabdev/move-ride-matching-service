import axios from "axios";

export const createClaimMoney = async (data:
  {
    token: string
    driverId: string,
    driverRegistrationSource: string,
    income?: number,
    country?: string,
    countryCode?: string,
  }) => {
  try {
    const res = await axios.post(
      `${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money`,
      {
        driverId: data.driverId,
        driverRegistrationSource: data.driverRegistrationSource,
        income: data.income || 0,
        country: data.country,
        countryCode: data.countryCode,
      },
      {
        headers: {
          Authorization: data.token,
        },
      }
    );

    return res?.data?.claim
  } catch (error) {
    console.log(error);

    return false
  }
};

export const getClaimMoney = async (data:
  {
    token: string
    driverId: string,
    status?: string
  }) => {
  try {
    const res = await axios.get(
      `${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money/${data.driverId}/driver?status=${data.status}`,
      {
        headers: {
          Authorization: data.token,
        },
      }
    );

    return res?.data?.claim
  } catch (error) {
    console.log(error);

    return false
  }
};

export const updateClaimMoney = async (data:
  {
    token: string
    id: string,
    income: number
  }) => {
  try {
    const res = await axios.put(
      `${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money/${data.id}`,
      {
        income: data.income
      },
      {
        headers: {
          Authorization: data.token,
        },
      }
    );

    return res?.data?.claim
  } catch (error) {
    console.log(error);

    return false
  }
};


