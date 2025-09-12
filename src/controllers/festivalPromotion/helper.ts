export const filterPromotion = (
  name?: any,
  usingType?: any,
  startDate?: any,
  endDate?: any,
  status?: any,
  country?: any,
  periodStartTime?: any,
  periodEndTime?: any
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

  if (country) filter.country = country;

  // Filter promotions where periodEndTime is greater than periodStartTime parameter
  // (promotions that are still active after the specified start time)
  if (periodStartTime) {
    filter.periodEndTime = { $gte: new Date(periodStartTime as string) };
  }

  // Filter promotions where periodEndTime is less than or equal to periodEndTime parameter
  // (promotions that expire before or on the specified end time)
  if (periodEndTime) {
    filter.periodEndTime = { 
      ...filter.periodEndTime, 
      $lte: new Date(periodEndTime as string) 
    };
  }

  return filter
} 