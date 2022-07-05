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

  componentDidUpdate() {
    this.favMusics();
  }

  favMusics = async () => {
    const favMusic = await getFavoriteSongs();
    this.setState({ getFavorites: favMusic });
  };

  checkFavorite = async (music) => {
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState({ isLoading: false });

    this.favMusics();
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
                    onChange={ () => this.checkFavorite(music) }
                    checked={ getFavorites
                      .some((favorite) => favorite.trackId === music.trackId) }
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
