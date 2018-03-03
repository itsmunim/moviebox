import React from 'react';
import SideBar from '../../components/sidebar/sidebar.jsx';

class HomePage extends React.Component {
  render () {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <SideBar/>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;
