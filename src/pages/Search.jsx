import React, { Component } from 'react';
import Header from '../component/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isActive: true,
    };
  }

  saveBand = (event) => {
    const min = 2;
    if (event.target.value.length >= min) {
      this.setState({ isActive: false });
    }
  }

  render() {
    const { isActive } = this.state;
    return (
      <div data-testid="page-search">
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
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
