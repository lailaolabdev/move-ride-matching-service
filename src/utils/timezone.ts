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