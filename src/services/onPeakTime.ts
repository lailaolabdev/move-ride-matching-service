import axios from "axios";
import { formatTime, getDayString, getLocalTime } from "../utils/timezone";

export const getOnPeakTimeService = async (token: string, countryCode?: string) => {
  try {
    const onPeakTime = await axios.get(
      `${process.env.CHARGING_SERVICE_URL}/v1/api/on-peak-times?platform=TAXI&country=${countryCode}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (!onPeakTime?.data?.onPeakTimes) {
      return false;
    }

    const getCurrentPeakTime = await getCurrentPeakSchedule(
      onPeakTime?.data?.onPeakTimes
    );

    return getCurrentPeakTime;
  } catch (error) {
    console.error('Error fetching on-peak time:', error);
    return false
  }
}

const getCurrentPeakSchedule = async (schedules: any) => {
  const now = getLocalTime(7); // Thailand = UTC+7
  const dayStr = getDayString(now);
  const timeStr = formatTime(now);

  return schedules.find((schedule: any) => {
    return (
      schedule.dates.includes(dayStr) &&
      timeStr >= schedule.startTime &&
      timeStr <= schedule.endTime
    );
  });
}