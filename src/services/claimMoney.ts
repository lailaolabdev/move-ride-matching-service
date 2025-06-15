import axios from "axios";

export const createClaimMoney = async (data:
  {
    token: string
    driverId: string,
    driverRegistrationSource: string,
    taxDeducted: number,
  }) => {
  try {
    await axios.post(
      `${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money`,
      {
        driverId: data.driverId,
        driverRegistrationSource: data.driverRegistrationSource,
        taxDeducted: data.taxDeducted,

      },
      {
        headers: {
          Authorization: data.token,
        },
      }
    );
  } catch (error) {
    console.log(error);

    return false
  }
};
