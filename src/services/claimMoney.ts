import axios from "axios";

export const createClaimMoney = async (token: string) => {
  try {
    await axios.post(
      `${process.env.PAYMENT_SERVICE_URL}/v1/api/claim-money`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error);

    return false
  }
};
