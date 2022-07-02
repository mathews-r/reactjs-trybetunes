import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.waitAPI();
  }

  waitAPI = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false });
    this.setState({ user: user.name });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="header-component">
        { isLoading && <Loading /> }

        <h2 data-testid="header-user-name">{user}</h2>
        <nav>
          <Link data-testid="link-to-search" to="/search">Procurar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>

      </div>
    );
  }
}
