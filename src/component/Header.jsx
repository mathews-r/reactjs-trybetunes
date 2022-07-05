import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

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
    if (isLoading) return <Loading />;
    return (
      <header className="header" data-testid="header-component">

        <h2 data-testid="header-user-name">
          {`Olá, seja bem vindo ${user}.`}
        </h2>

        <nav className="nav-menu">
          <Link
            className="link-menu"
            data-testid="link-to-search"
            to="/search"
          >
            Procurar

          </Link>
          <Link
            className="link-menu"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos

          </Link>
          <Link
            className="link-menu"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil

          </Link>
        </nav>
      </header>
    );
  }
}
