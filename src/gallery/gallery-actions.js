// @flow

import type { Dispatch, GetState, State, Image, RoverName } from '../types';

export function checkValidCamera(dispatch: Dispatch, state: State, rover: RoverName, images: Array<Image>) {
  if (images.length > 0) {
    const camera = state.cameraByRover[rover];
    if (!camera || !images.some(image => image.camera.full_name === camera)) {
      dispatch(setCamera(rover, images[0].camera.full_name));
    }
  }
}

export const SET_CAMERA = 'SET_CAMERA';
export function setCamera(rover: RoverName, camera: string) {
  return {
    type: SET_CAMERA,
    rover,
    camera
  };
}

export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export function setSelectedDate(date: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    for (const rover in state.cameraByRover) {
      const images = state.imagesByRoverAndDate[rover + date];
      if (images) {
        checkValidCamera(dispatch, state, ((rover: any): RoverName), images);
      }
    }

    dispatch({
      type: SET_SELECTED_DATE,
      date
    });
  }
}
