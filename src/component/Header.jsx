import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const userName = localStorage.getItem('user');
    console.log(userName);
    return (
      <div>
        {userName[0]}
      </div>
    );
  }
}
