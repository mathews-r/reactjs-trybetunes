import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../component/Loading';
import '../styles/login.css';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isActive: true,
      isLoading: false,
      loaded: false,
    };
  }

  saveName = (event) => {
    const min = 3;
    if (event.target.value.length >= min) {
      this.setState({
        isActive: false,
        userName: event.target.value,
      });
    }
  }

  login = async (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({ isLoading: false, loaded: true });
  }

  render() {
    const { isActive, isLoading, loaded } = this.state;

    return (
      <section className="page-login" data-testid="page-login">

        {isLoading && <Loading />}
        {loaded && <Redirect to="/search" />}
        <h1>Faça seu login</h1>
        <form className="initial-form">
          <input
            className="input-form-login"
            type="text"
            name="input-name"
            data-testid="login-name-input"
            placeholder="Digite seu nome"
            onChange={ this.saveName }
          />
          <button
            id="btn-login"
            type="submit"
            name="button-login"
            data-testid="login-submit-button"
            disabled={ isActive }
            onClick={ this.login }
          >
            {' '}
            Entrar
            {' '}

          </button>

        </form>

      </section>
    );
  }
}
