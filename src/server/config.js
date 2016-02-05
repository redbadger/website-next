import dotenv from 'dotenv';
dotenv.load();

export const workable = {
  key: process.env.WORKABLE_KEY
};

export const hot = process.env.HOT !== undefined;
export const port = process.env.PORT || 8000;

export * from '../shared/config';
