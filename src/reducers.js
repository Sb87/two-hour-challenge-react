// @flow

import { combineReducers } from 'redux';
import { getYesterday } from './actions';
import { selectedDate, cameraByRover } from './gallery/gallery-reducers';

import {
  CHANGE_PAGE,
  RECEIVE_IMAGES,
  SET_LATEST_IMAGE_DATE
} from './actions';

const page = (state = 'iotd', action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return action.page;
    default:
      return state;
  }
};

const imagesByRoverAndDate = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_IMAGES:
      const newState = { ...state };
      newState[action.rover + action.date] = action.images;
      return newState;
    default:
      return state;
  }
};

const latestImageDate = (state: string = getYesterday(new Date()), action: { type: string, date: string}) => {
  switch (action.type) {
    case SET_LATEST_IMAGE_DATE:
      return action.date;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  page,
  imagesByRoverAndDate,
  latestImageDate,
  selectedDate,
  cameraByRover
})

export default rootReducer;