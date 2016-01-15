/*
 *  Fetch Proxy
 *
 *  Wraps fetch with automatic json resolution and some default error handling
 *  behavior for API calls.
 *
 *  By default fetch does not throw when a response returns an error status
 *  code. This module adds in that behavior and translates those errors into
 *  simple status codes and messages.
 *
 *  One of the key considerations is to not leak any potentially confidential
 *  information from a response so we map errors to simple error objects.
 *
 *  So far we have handling for 401, 404 and 500 errors and all others default
 *  to a 500. This is intended to be extended as we encounted more errors.
 */

const errorMap = {
  401: 'Not Authorised',
  404: 'Not Found',
  500: 'Network Error',
  'default': 'Error'
};

function toJSON (response) {
  if (response.status !== 200) {
    const message = errorMap[response.status] || errorMap.default;
    return Promise.reject({
      status: response.status,
      body: {
        error: message
      }
    });
  }

  return response.json().then((data) => {
    return {
      status: 200,
      body: data
    };
  });
}

function throwError () {
  throw {
    status: 500,
    body: {
      error: 'Network Error'
    }
  };
}

export default function fetchProxy (fetch) {
  return (...args) => {
    return fetch(...args).catch(throwError).then(toJSON);
  };
}
