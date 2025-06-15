import axios from "axios";

export const createClaimMoney = async (data:
  {
    token: string
    driverId: string,
    registrationSource: string,
    taxDeducted: number,
  }) => {
  try {
    await axios.post(
      `${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money`,
      {
        driverId: data.driverId,
        registrationSource: data.registrationSource,
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
