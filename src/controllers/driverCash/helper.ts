export const validateDriverCashBody = (body: any) => {
    const { amount } = body;
    const returnBody: any = {};

    if (amount) returnBody.amount = amount;

    return returnBody;
}
