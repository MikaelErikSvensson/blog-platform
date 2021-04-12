import { User, UserFormValues } from '../types/main';

export const formatDate = (date: string) => {
  const dateFormatted = date.split('T');
  return dateFormatted[0];
};
const date = new Date();

export const formatTag = (tag: string) => {
  // Formatera tag till något i stil med #.NET
  const tagFormatted = '#' + tag;
  return tagFormatted;
};

export const dateISO = date.toISOString();

export const summary = (body: string) => {
  // Gör om funktion
  // const summary = body.substring(0, 100);
  // console.log(summary);
  // return summary;
};
