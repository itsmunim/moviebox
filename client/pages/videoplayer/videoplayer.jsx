import React from 'react';
import VideoPlayer from '../../components/video.player/video.player.jsx';


class VideoPlayerPage extends React.Component {
  render () {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [{
          src: 'http://localhost:8080/api/media/stream',
          type: 'video/mp4'
        }]
      };

    return (
      <div>
        <div className="container-fluid video-player">
          <div className="row page-title">
            <h4>Testing video player functionality</h4>
          </div>
          <div className="row page-content">
            <VideoPlayer { ...videoJsOptions }/>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPlayerPage;
