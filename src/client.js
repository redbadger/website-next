import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';

const element = document.getElementById('mount');

const page = (<Root />);

ReactDOM.render(page, element);
