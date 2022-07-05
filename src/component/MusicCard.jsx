import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    if (getFavorites) {
      removeSong(musics);
    }
  }

  render() {
    const { musics } = this.props;
    const { isLoading, getFavorites } = this.state;

    return (
      <section>
        <div className="dad">
          { isLoading && <Loading /> }
          {musics.slice(1).map((music) => (
            <div key={ music.trackId } className="musics">

              <p>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <div className="tracks">
                <p className="p2">Favorita</p>
                <label htmlFor={ music.trackId }>
                  <input
                    type="checkbox"
                    name={ music.trackId }
                    id={ music.trackId }
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onChange={ this.checkFavorite }
                    checked={ getFavorites[music.trackId] }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
