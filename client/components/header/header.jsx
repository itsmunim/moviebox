import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {
  render () {
    return (
      <nav className="moviebox-header navbar navbar-expand-lg navbar-dark sticky-top bg-dark p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Moviebox</Link>
        <input className="form-control form-control-dark w-100" type="text"
               placeholder="Search movies by title, genre, actors etc." aria-label="Search"/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link btn-settings" to="/settings">
                <i className="fas fa-cog"/>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
