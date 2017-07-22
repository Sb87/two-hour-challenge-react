// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchImagesIfNeeded } from './actions';
import type { Dispatch, Image, RoverName } from './types';

import './ImageOfTheDay.css';

const rover: RoverName = 'Curiosity'; // Opportunity doesn't have current images

type Props = {
  images: Array<Image>,
  latestImageDate: string
};

class ImageOfTheDay extends Component {
  props: Props & { dispatch: Dispatch };

  randomIndex: number;

  componentDidMount() {
    const { dispatch, latestImageDate } = this.props;
    dispatch(fetchImagesIfNeeded(rover, latestImageDate));
  }

  render() {
    const { images } = this.props;

    let photoSection;
    if (images) {
      if (typeof this.randomIndex !== 'number') {
        this.randomIndex = Math.floor(Math.random() * images.length);
      }
      const image = images[this.randomIndex];

      photoSection = !image ? null : (
        <section className="iotd">
          <img src={image.img_src} alt="" />
          <div className="caption">
            <div>{rover} {image.camera.name}</div>
            <div>{moment(image.earth_date).format('LL')}</div>
          </div>
        </section>
      );
    }

    return (
      <div className="ImageOfTheDay">
        <h2>Image of the Day</h2>
        <div className="center">
          {photoSection}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state): Props {
  const { imagesByRoverAndDate, latestImageDate } = state;

  return {
    images: imagesByRoverAndDate[rover + latestImageDate],
    latestImageDate
  };
}

export default connect(mapStateToProps)(ImageOfTheDay);
