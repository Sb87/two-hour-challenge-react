// @flow

import { checkValidCamera } from './gallery/gallery-actions';
import type { GetState, Dispatch, Image, RoverName } from './types';

export const CHANGE_PAGE = 'CHANGE_PAGE';
export function changePage(page: string) {
  return {
    type: CHANGE_PAGE,
    page
  };
}

export const SET_LATEST_IMAGE_DATE = 'SET_LATEST_IMAGE_DATE';
export function setLatestImageDate(date: string) {
  return {
    type: SET_LATEST_IMAGE_DATE,
    date
  };
}

export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export function receiveImages(rover: RoverName, date: string, images: Array<Image>) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();

    if (getState().latestImageDate === date && images.length === 0) {
      const yesterday = getYesterday(date);
      dispatch(setLatestImageDate(yesterday));
      dispatch(fetchImagesIfNeeded(rover, yesterday));
    }

    checkValidCamera(dispatch, state, rover, images);

    dispatch({
      type: RECEIVE_IMAGES,
      rover,
      date,
      images
    });
  };
}

export function getYesterday(today: string | Date): string {
  const date = new Date(today);
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function fetchImages(rover: RoverName, date: string) {
  return (dispatch: Dispatch) => {
    const apiKey = 'Jpz1UkzkRxdxrg9Xg69mJSleGt5HCbQzqXWUrlFR';
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveImages(rover, date, json.photos)));
  }
}

export function fetchImagesIfNeeded(rover: RoverName, date: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    if (!getState().imagesByRoverAndDate[rover + date]) {
      return dispatch(fetchImages(rover, date));
    }
  }
}
