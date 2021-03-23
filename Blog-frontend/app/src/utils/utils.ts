import { User, UserFormValues } from '../types/main';

export const formatDate = (date: string) => {
  const dateFormatted = date.split('T');
  return dateFormatted[0];
};
const date = new Date();

export const dateISO = date.toISOString();
