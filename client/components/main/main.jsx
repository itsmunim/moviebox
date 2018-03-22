import React from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import HomePage from '../../pages/home/home.jsx';
import SettingsPage from '../../pages/settings/settings.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/settings'
            render={() => (
              <SettingsPage/>
            )}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
