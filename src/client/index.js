import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../shared/components/root';

const element = document.getElementById('mount');

const page = (<Root />);

ReactDOM.render(page, element);
