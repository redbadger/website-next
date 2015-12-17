import {createElement as h} from 'react';
import ReactDOM from 'react-dom';
import home from './components/home';

const element = document.getElementById('mount');

ReactDOM.render(h(home, null), element);
