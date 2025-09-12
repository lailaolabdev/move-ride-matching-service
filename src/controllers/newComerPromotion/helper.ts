export const filterNewComerPromotion = (
  name?: any,
  status?: any,
  startDate?: any,
  endDate?: any,
  country?: any
) => {
  const filter: any = {};

  if (name) filter.name = { $regex: name, $options: "i" };

  if (status !== undefined) filter.status = status === "true";

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string),
    };
  }

  if (country) filter.country = country;

  return filter;
};