export const filterPointPromotion = (
  name?: any,
  type?: any,
  status?: any,
  startDate?: any,
  endDate?: any,
  country?: any,
  minAmount?: any,
  pointReward?: any,
  createdStartDate?: any,
  createdEndDate?: any
) => {
  const filter: any = {};

  if (name) filter.name = { $regex: name, $options: "i" };

  if (type) filter.type = type;

  if (status !== undefined) filter.status = status === "true";

  if (country) filter.country = country;

  if (minAmount !== undefined) {
    filter.minAmount = { $gte: Number(minAmount) };
  }

  if (pointReward !== undefined) {
    filter.pointReward = { $gte: Number(pointReward) };
  }

  // Filter by promotion start and end dates
  if (startDate) {
    filter.startDate = { $gte: new Date(startDate as string) };
  }

  if (endDate) {
    filter.endDate = { $lte: new Date(endDate as string) };
  }

  // Filter by creation date range
  if (createdStartDate && createdEndDate) {
    filter.createdAt = {
      $gte: new Date(createdStartDate as string),
      $lte: new Date(createdEndDate as string),
    };
  }

  return filter;
};