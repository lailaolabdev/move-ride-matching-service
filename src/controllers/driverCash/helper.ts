export const validateDriverCashBody = (body: any) => {
    const { amount, limit } = body;
    const returnBody: any = {};

    if (amount) returnBody.amount = amount;
    if (limit) returnBody.limit = limit;

    return returnBody;
}
