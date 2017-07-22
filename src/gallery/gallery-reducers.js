// @flow

import { SET_LATEST_IMAGE_DATE, getYesterday } from '../actions';
import { SET_SELECTED_DATE, SET_CAMERA } from './gallery-actions';
import type { RoverName } from '../types';

export const selectedDate = (state: string = getYesterday(new Date()), action: { type: string, date: string}) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return action.date;
    case SET_LATEST_IMAGE_DATE:
      // Ensure selected date isn't later than the latest date when found
      return (action.date < state) ? action.date : state;
    default:
      return state;
  }
};

type CameraAction = {
  type: typeof SET_CAMERA,
  camera: string,
  rover: string
}
export const cameraByRover = (state: { [index: RoverName]: string } = {}, action: CameraAction) => {
  switch (action.type) {
    case SET_CAMERA:
      const newState = { ...state };
      newState[action.rover] = action.camera;
      return newState;
    default:
      return state;
  }
};
