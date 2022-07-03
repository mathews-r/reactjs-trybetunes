import React, { Component } from 'react';
import Header from '../component/Header';
import Loading from '../component/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbuns from '../component/CardAlbuns';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputUser: '',
      isActive: true,
      isLoading: false,
      loaded: false,
      api: [],
    };
  }

  saveBand = (event) => {
    const min = 2;
    if (event.target.value.length >= min) {
      this.setState({
        isActive: false,
        inputUser: event.target.value,
      });
    }
  }

  fetchAPI = async () => {
    const { inputUser } = this.state;
    this.setState({ isLoading: true });
    this.setState({ api: await searchAlbumsAPI(inputUser) });
    this.setState({ isLoading: false, loaded: true });
  };

  render() {
    const { isActive, inputUser, api, isLoading, loaded } = this.state;
    return (
      <div data-testid="page-search">
        {isLoading ? <Loading /> : (
          <>
            <Header />
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Pesquise sua banda"
                onChange={ this.saveBand }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isActive }
                onClick={ this.fetchAPI }
              >
                Pesquisar
              </button>
            </form>
            { loaded ? <CardAlbuns api={ api } inputUser={ inputUser } /> : ''}
          </>
        )}
      </div>
    );
  }
}
