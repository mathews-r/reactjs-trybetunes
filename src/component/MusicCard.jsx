import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { apiMusic } = this.props;
    return (
      <ul>
        {apiMusic.slice(1).map((music) => (
          <li key={ music.trackNumber }>
            {music.trackName}
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
          </li>
        ))}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  apiMusic: PropTypes.shape({
    slice: PropTypes.func,
    map: PropTypes.func,
    collectionId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
};
