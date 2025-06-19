// Function to get current time in UTC+7
export const getLocalTime = (offsetHours = 7) => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * offsetHours));
};

// Function to get day in "MON", "TUE", etc.
export const getDayString = (date: any): string => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return days[date.getDay()];
};

// Function to format time to HH:mm
export const formatTime = (date: any): string => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const getBangkokTodayUTC = () => {
  const bangkokOffset = 7 * 60; // 7 hours in minutes

  const now = new Date();
  const bangkokNow = new Date(now.getTime() + bangkokOffset * 60000);

  // Get Bangkok's start of day
  const bangkokStartOfDay = new Date(bangkokNow);
  bangkokStartOfDay.setHours(0, 0, 0, 0);

  // Get Bangkok's end of day
  const bangkokEndOfDay = new Date(bangkokNow);
  bangkokEndOfDay.setHours(23, 59, 59, 999);

  // Convert Bangkok's start and end of day back to UTC
  const startOfDayUTC = new Date(bangkokStartOfDay.getTime() - bangkokOffset * 60000);
  const endOfDayUTC = new Date(bangkokEndOfDay.getTime() - bangkokOffset * 60000);

  return { startOfDayUTC, endOfDayUTC }
}