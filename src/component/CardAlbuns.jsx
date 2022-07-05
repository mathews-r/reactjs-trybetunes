import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/cardAlbums.css';

export default class CardAlbuns extends Component {
  render() {
    const { api, inputUser } = this.props;
    return (
      <section className="result-search">
        {api.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          <div className="div-result">
            <p className="p">{ `Resultado de álbuns de: ${inputUser}`}</p>
            {api.map((album) => (
              <div key={ album.collectionId } className="albuns">
                <div className="information">
                  <Link
                    className="link-result"
                    to={ `album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <h4>{album.collectionName}</h4>
                    <img
                      className="artwork"
                      src={ album.artworkUrl100 }
                      alt="Capa do Álbum"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) }
      </section>
    );
  }
}

CardAlbuns.propTypes = {
  api: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  inputUser: PropTypes.string.isRequired,
};
