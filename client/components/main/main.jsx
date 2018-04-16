import React from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import HomePage from '../../pages/home/home.jsx';
import SettingsPage from '../../pages/settings/settings.jsx';
import VideoPlayerPage from '../../pages/videoplayer/videoplayer.jsx';


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
            <Route path='/video-player'
            render={() => (
              <VideoPlayerPage/>
            )}/>
        </Switch>
      </main>
    );
  }
}

export default Main;
