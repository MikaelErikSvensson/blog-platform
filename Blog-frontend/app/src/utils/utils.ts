import { User, UserFormValues } from '../types/main';

export const formatDate = (date: string) => {
  const dateFormatted = date.split('T');
  return dateFormatted[0];
};
const date = new Date();

export const dateISO = date.toISOString();

export const summary = (body: string) => {
  const summary = body.substring(0, 100);
  console.log(summary);
  return summary;
};
