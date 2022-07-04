import PropTypes, { arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CardAlbuns extends Component {
  render() {
    const { api, inputUser } = this.props;
    return (
      <div>
        {api.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
          <>
            <p>{ `Resultado de álbuns de: ${inputUser}`}</p>
            <ul>
              {api.map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    to={ `album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    {album.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) }
      </div>
    );
  }
}

CardAlbuns.propTypes = {
  api: arrayOf.isRequired,
  inputUser: PropTypes.string.isRequired,
};
