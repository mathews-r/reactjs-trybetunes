import React, { Component } from 'react';
import '../styles/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <h1>Carregando...</h1>
      </div>
    );
  }
}
