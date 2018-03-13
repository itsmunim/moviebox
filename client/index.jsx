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

// state management
import {getStateManager} from './app.state/index';

const stateManager = getStateManager();

const App = () => (
  <div>
    <Header stateManager={stateManager}/>
    <Main stateManager={stateManager}/>
  </div>
);

const renderView = () => {
  render(<Router><App/></Router>, document.getElementById('app'));
};

stateManager.subscribeToStateChange(renderView);

renderView();
