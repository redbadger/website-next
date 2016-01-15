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

export default function fetchJSON (fetch) {
  return (...args) => {
    return fetch(...args).catch(throwError).then(toJSON);
  };
}