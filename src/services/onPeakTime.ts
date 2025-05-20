import axios from "axios";
import { formatTime, getDayString, getLocalTime } from "../utils/timezone";

export const getOnPeakTimeService = async (token: string) => {
  try {
    const onPeakTime = await axios.get(
      `${process.env.CHARGING_SERVICE_URL}/v1/api/on-peak-times?platform=TAXI`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (!onPeakTime?.data?.onPeakTimes) {
      return false;
    }

    const mockData = [
      {
        _id: '67eced9998c0558b7fdb0010',
        dates: ['TUE', 'WED', 'THU', 'FRI', 'SUN', 'SAT'],
        startTime: '08:55',
        endTime: '19:55',
        credit: 20,
        country: '67c6c076d9ba8fe6164eac43',
        countryCode: 'TH',
        createdBy: '67cfa92df077831b059f543a',
        createdByFullName: 'manager test',
        createdAt: '2025-04-02T07:56:09.577Z',
        updatedAt: '2025-04-02T07:56:09.577Z'
      },
      {
        _id: '67ea70395678fa9371f11703',
        dates: ['MON'],
        startTime: '06:00',
        endTime: '23:36',
        credit: 100,
        country: '67c6c076d9ba8fe6164eac43',
        countryCode: 'TH',
        createdBy: '67cfa92df077831b059f543a',
        createdByFullName: 'manager test',
        createdAt: '2025-03-31T10:36:41.359Z',
        updatedAt: '2025-03-31T10:36:41.359Z'
      }
    ]

    const getCurrentPeakTime = await getCurrentPeakSchedule(mockData);

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