import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';

import HeaderState from '../../app.state/states/components/header';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  get settingsNavCSSClasses() {
    return classNames({
      'nav-link': true,
      'btn-settings': true,
      'active': _.get(this.props.state, 'isSettingsGearSelected', false)
    });
  }


  render () {
    return (
      <nav className="moviebox-header navbar navbar-expand-lg navbar-dark sticky-top bg-dark p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/" onClick={() => this.props.unSelectSettingsNav()}>Moviebox</Link>
        <input className="form-control form-control-dark w-100" type="text"
               placeholder="Search movies by title, genre, actors etc."/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={this.settingsNavCSSClasses} to="/settings" onClick={() => this.props.selectSettingsNav()}>
                <i className="fas fa-cog"/>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.components.header
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectSettingsNav: HeaderState.showSettings,
    unSelectSettingsNav: HeaderState.hideSettings
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
