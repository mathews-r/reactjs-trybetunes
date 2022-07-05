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
    this.favMusics();
  }

  favMusics = async () => {
    const favMusic = await getFavoriteSongs();
    favMusic.forEach(({ trackId }) => {
      this.setState(({ getFavorites }) => ({
        getFavorites: { ...getFavorites, [trackId]: true },
      }));
    });
  }

  checkFavorite = async ({ target: { name, checked } }) => {
    const { musics } = this.props;
    const { getFavorites } = this.state;
    this.setState({ isLoading: true,
      getFavorites: { ...getFavorites, [name]: checked } });
    await addSong(musics);
    this.setState({ isLoading: false });
  }

  render() {
    const { musics } = this.props;
    const { isLoading, getFavorites } = this.state;

    return (
      <section>
        <ul>
          { isLoading && <Loading /> }
          {musics.slice(1).map((music) => (
            <li key={ music.trackId }>

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
                  checked={ getFavorites[music.trackId] }
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
  musics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
