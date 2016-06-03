export const apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:8000/api';
export const env = process.env.NODE_ENV;

var couchDbAwsHost = process.env.DB_HOST || 'ec2-54-229-76-71.eu-west-1.compute.amazonaws.com';
export const couchDb = {
  local: {
    host: process.env.DB_HOST || '127.0.0.1',
    protocol: 'http://',
    port: '5984'
  },
  remote: {
    host: `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${couchDbAwsHost}`,
    protocol: 'http://',
    port: '5984'
  }
};

export const imageAssetsEndpoint = 'http://res.cloudinary.com/red-badger-assets/image/upload/events/';
