import React from 'react';

export default function ErrorPage ({ children }) {
  return (
    <h1>{children || 'Not found'}</h1>
  );
}
