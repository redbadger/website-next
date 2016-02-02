import { createHash } from 'crypto';

export const generateScopedName = (name, fpath, css) => {
  return `${name}-${createHash('md5').update(css).digest('base64').slice(0, 5)}`;
};

export const hot = process.env.HOT !== undefined;
export const port = process.env.PORT || 8000;

export * from '../shared/config';
