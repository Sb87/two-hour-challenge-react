// @flow

import React, { Component } from 'react';

export default class NavButton extends Component {
  props: {
    onClick: () => void,
    text: string
  };

  render() {
    const { onClick, text } = this.props;

    return (
      <button className="btn topbtn" onClick={onClick}>{text}</button>
    );
  }
}
