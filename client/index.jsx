import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import React from 'react';
import {render} from 'react-dom';
import Header from './components/header/header.jsx';
import SideNav from './components/sidenav/sidenav.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <div className="row">
            <SideNav/>
          </div>
        </div>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
