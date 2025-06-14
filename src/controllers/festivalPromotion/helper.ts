export const filterPromotion = (
  name?: any,
  usingType?: any,
  startDate?: any,
  endDate?: any,
  status?: any,
  country?: any
) => {
  const filter: any = {}

  if (name) filter.name = { $regex: name, $options: "i" };

  if (usingType) filter.usingType = usingType;

  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string),
    };
  }

  if (status !== undefined) filter.status = status === "true";

  if (country) filter.country = country

  return filter
} 