import React from 'react';

class SideBar extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Movies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Watch List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Recently Added
                </a>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}

export default SideBar;
