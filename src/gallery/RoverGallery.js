// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import createCachedSelector from 're-reselect';
import moment from 'moment';

import { fetchImagesIfNeeded } from '../actions';
import { setCamera } from './gallery-actions';
import type { Dispatch, Image, RoverName, State } from '../types';

import './RoverGallery.css';

// This is the most recent date that has photos for Opportunity as of 6/9/2017
const opportunityMaxDate = '2017-02-22';

type MappedProps = {
  images?: Array<Image>,
  cameras?: Array<string>,
  camera: string,
  date: string,
};

type OwnProps = {
  dispatch: Dispatch,
  rover: RoverName
};

class RoverGallery extends Component {
  props: MappedProps & OwnProps;

  componentDidMount() {
    const { dispatch, rover, date } = this.props;
    dispatch(fetchImagesIfNeeded(rover, date));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, rover, date } = nextProps;
    dispatch(fetchImagesIfNeeded(rover, date));
  }

  render() {
    const { camera, rover } = this.props;

    return (
      <div className="RoverGallery">
        <header className="justified">
          <h2>{rover}{camera ? `: ${camera}` : null}</h2>
          {this.renderCameraSection()}
        </header>
        {this.renderImagesSection()}
      </div>
    );
  }

  renderCameraSection() {
    const { cameras, camera } = this.props;
    if (cameras) {
      return (
        <select className="btn roundedBtn" value={camera} onChange={this.handleCameraChange}>
          {cameras.map(c => <option key={c}>{c}</option>)}
        </select>
      );
    }
  }

  renderImagesSection() {
    const { images, date, rover } = this.props;
    if (images) {
      if (images.length > 0) {
        return (
          <section className="thumbs">
            {images.map(image => (
              <div key={image.id} className="thumb">
                <img src={image.img_src} alt="" />
                <div className="caption">{moment(image.earth_date).format('LL')}</div>
              </div>
            ))}
          </section>
        );
      } else {
        return (
          <section>
            There are no photos from {rover} on {moment(date).format('LL')}.
        </section>
        );
      }
    }
  }

  handleCameraChange = (event) => {
    const { dispatch, rover } = this.props;
    dispatch(setCamera(rover, event.target.value));
  }
}

function mapStateToProps(state: State, props: OwnProps): MappedProps {
  const date = getDate(state, props);
  const camera = getCamera(state, props);
  const { cameras, images } = calculateCamerasAndImages(state, props);

  return {
    images,
    cameras,
    camera,
    date
  };
}

function getCamera(state: State, props: OwnProps) {
  return state.cameraByRover[props.rover];
}

function getDate(state: State, props: OwnProps) {
  return (state.selectedDate === state.latestImageDate && props.rover === 'Opportunity') ? opportunityMaxDate : state.selectedDate;
}

function getAllImages(state: State, props: OwnProps) {
  return state.imagesByRoverAndDate[props.rover + getDate(state, props)];
}

const calculateCamerasAndImages = createCachedSelector(
  [getCamera, getAllImages],
  (camera, allImages): { cameras?: Array<string>, images?: Array<Image> } => {
    if (allImages) {
      const cameras = new Set();
      const images = []
      allImages.forEach(image => {
        const cameraName = image.camera.full_name;
        cameras.add(cameraName);
        if (cameraName === camera) {
          images.push(image);
        }
      });

      return {
        cameras: cameras.size > 0 ? Array.from(cameras) : undefined,
        images
      };
    }

    return {};
  })((state: State, props: OwnProps) => props.rover);

export default connect(mapStateToProps)(RoverGallery);
