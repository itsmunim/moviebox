import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';

import HeaderState from '../../app.state/states/header';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.stateManager = this.props.stateManager;
  }

  selectSettingsNav() {
    this.stateManager.dispatchAction(HeaderState.showSettings());
  }

  unSelectSettingsNav() {
    this.stateManager.dispatchAction(HeaderState.hideSettings());
  }

  get settingsNavCSSClasses() {
    return classNames({
      'nav-link': true,
      'btn-settings': true,
      'active': _.get(HeaderState.getCurrent(this.stateManager), 'settingsNav.isSelected', false)
    });
  }


  render () {
    return (
      <nav className="moviebox-header navbar navbar-expand-lg navbar-dark sticky-top bg-dark p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/" onClick={() => this.unSelectSettingsNav()}>Moviebox</Link>
        <input className="form-control form-control-dark w-100" type="text"
               placeholder="Search movies by title, genre, actors etc."/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={this.settingsNavCSSClasses} to="/settings" onClick={() => this.selectSettingsNav()}>
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
