// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage } from './actions';
import ImageOfTheDay from './ImageOfTheDay';
import ImageGallery from './gallery/ImageGallery';
import NavButton from './NavButton';
import type { Dispatch, State } from './types';

import './App.css';

type PageName = 'iotd' | 'gallery';

class App extends Component {
  props: {
    dispatch: Dispatch;
    page: string;
  };

  render() {
    const { page } = this.props;

    return (
      <div className="App">
        <header className="App-header justified">
          <h1>The Red Planet Rovers</h1>
          <nav>
            <NavButton onClick={this.changeToIotd} text="Image of the Day" />
            <NavButton onClick={this.changeToGallery} text="Image Gallery" />
          </nav>
        </header>
        <main className="App-main">
          {page === 'iotd' ? <ImageOfTheDay /> : null}
          {page === 'gallery' ? <ImageGallery /> : null}
        </main>
      </div>
    );
  }

  getChangePageFunc(page: PageName) {
    return () => {
      this.props.dispatch(changePage(page));
    };
  }

  changeToIotd = this.getChangePageFunc('iotd');
  changeToGallery = this.getChangePageFunc('gallery');
}

function mapStateToProps(state: State) {
  const { page } = state;

  return {
    page
  };
}

export default connect(mapStateToProps)(App);
