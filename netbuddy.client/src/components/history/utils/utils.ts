export const formatToIsraelTime = (date: string | number | Date): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });
};