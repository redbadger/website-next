import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';

const element = document.getElementById('mount');

const page = (<Home />);

ReactDOM.render(page, element);
