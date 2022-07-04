import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      check: '',
    };
  }

  checkFavorite = async () => {
    const { apiMusic } = this.props;
    this.setState({ check: true });
    await addSong(apiMusic);
    this.setState({ check: false });
  }

  render() {
    const { apiMusic } = this.props;
    const { check } = this.state;

    return (
      <section>
        { check && <Loading /> }
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
              <label htmlFor="checkbox-favorite">
                Favorita
                <input
                  type="checkbox"
                  name="checkbox-favorite"
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onChange={ this.checkFavorite }
                />
              </label>
            </li>

          ))}
        </ul>
      </section>
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
