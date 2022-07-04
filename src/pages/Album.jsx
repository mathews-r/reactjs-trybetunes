import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      apiMusic: [],
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
      apiMusic: api });
  }

  render() {
    const { apiMusic, artist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="artist-name" data-testid="artist-name">{artist}</div>
        <div className="album-artist" data-testid="album-name">
          {album}
          <MusicCard apiMusic={ apiMusic } />
        </div>
      </div>
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
