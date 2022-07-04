import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      getFavorites: [],
    };
  }

  componentDidMount() {
    this.checkFavorite();
  }

  checkFavorite = async () => {
    const { musics } = this.props;

    this.setState({ isLoading: true });
    await addSong(musics);
    const getFav = await getFavoriteSongs();
    this.setState({ isLoading: false, getFavorites: getFav });
  }

  filterFavorites = (musicId) => {
    const { getFavorites } = this.state;
    return getFavorites.some((music) => music.trackId === musicId);
  }

  render() {
    const { musics } = this.props;
    const { isLoading } = this.state;

    return (
      <section>
        { isLoading && <Loading /> }
        <ul>
          {musics.slice(1).map((music) => (
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
              <label htmlFor={ music.trackId }>
                Favorita
                <input
                  type="checkbox"
                  name={ music.trackId }
                  id={ music.trackId }
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
  musics: PropTypes.shape({
    slice: PropTypes.func,
    map: PropTypes.func,
    collectionId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
};
