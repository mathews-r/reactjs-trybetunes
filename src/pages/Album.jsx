import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';
import getMusics from '../services/musicsAPI';
import '../styles/album.css';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      artist: '',
      album: '',
    };
  }

  componentDidMount() {
    this.getAPI();
  }

  getAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const api = await getMusics(id);
    this.setState({ artist: api[0].artistName,
      album: api[0].collectionName,
      musics: api });
  }

  render() {
    const { musics, artist, album } = this.state;
    return (
      <>
        <Header />
        <section className="page-album" data-testid="page-album">
          <p className="artist-name" data-testid="artist-name">{artist}</p>
          <p className="album-artist" data-testid="album-name">{album}</p>
          <MusicCard musics={ musics } />
        </section>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
