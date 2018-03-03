import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css';
import 'bootstrap';
import './index.scss';

import React from 'react';
import {render} from 'react-dom';
import Header from './components/header/header.jsx';
import SideBar from './components/sidebar/sidebar.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <div className="row">
            <SideBar/>
          </div>
        </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
