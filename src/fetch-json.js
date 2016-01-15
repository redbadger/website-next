import fetch from 'node-fetch';

function toJSON (response) {
  return response.json();
}

export default function fetchJSON (...args) {
  return fetch(...args).then(toJSON);
}