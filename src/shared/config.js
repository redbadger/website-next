export const apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:8000/api';
export const env = process.env.NODE_ENV;

export const couchDb = {
  local: {
    host: DB_HOST || '127.0.0.1',
    protocol: 'http://',
    port: '5984',
  },
  remote: {
    host: `${DB_USERNAME}:${DB_PASSWORD}@${couchDbAwsHost}`,
    protocol: 'http://',
    port: '5984',
  },
};

export const badgerBrain = {
  local: 'http://127.0.0.1:3001/graphql',
  remote: process.env.BADGER_BRAIN_HOST || 'http://127.0.0.1:3001/graphql',
};

export const imageAssetsEndpoint = '//res.cloudinary.com/red-badger-assets/image/upload/events/';
