import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CardAlbuns extends Component {
  render() {
    const { api, inputUser } = this.props;
    console.log(inputUser);
    return (
      <div>
        {api.length
          ? (<>
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
          </>)
          : <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

CardAlbuns.propTypes = {
  api: PropTypes.arrayOf.isRequired,
  inputUser: PropTypes.string.isRequired,
};
