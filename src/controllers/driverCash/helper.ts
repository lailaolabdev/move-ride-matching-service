export const validateDriverCashBody = (body: any) => {
    const { amount, driver } = body;
    const returnBody: any = {};

    if (driver) returnBody.driver = driver;
    if (amount) returnBody.amount = amount;

    return returnBody;
}
