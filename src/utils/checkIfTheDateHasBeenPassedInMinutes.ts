import { differenceInMinutes } from 'date-fns';

export default (referenceDate: string, limit = 30): boolean => {
  const diffInMinutes = differenceInMinutes(
    new Date(),
    new Date(referenceDate),
  );

  return diffInMinutes >= limit;
};
