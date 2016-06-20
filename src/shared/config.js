/* eslint-disable max-len */
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

const couchDbAwsHost = DB_HOST || 'ec2-54-229-76-71.eu-west-1.compute.amazonaws.com';

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

export const imageAssetsEndpoint = '//res.cloudinary.com/red-badger-assets/image/upload/events/';
