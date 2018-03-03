import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css';
import 'bootstrap';
import './index.scss';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

// components
import Header from './components/header/header.jsx';
import Main from './components/main/main.jsx';

const App = () => (
  <div>
    <Header/>
    <Main/>
  </div>
);

render(<Router><App/></Router>, document.getElementById('app'));
