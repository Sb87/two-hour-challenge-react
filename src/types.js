// @flow

/* eslint-disable no-use-before-define */

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;

export type Action = {
  +type: string
};

export type State = {
  +page: PageName,
  +imagesByRoverAndDate: { [index: string]: Array<Image> },
  +latestImageDate: string,
  +selectedDate: string,
  +cameraByRover:  { [index: string]: string },
}

export type PageName = 'iotd' | 'gallery';
export type RoverName = 'Curiosity' | 'Opportunity';

export type Image = {
  id: number,
  sol: number,
  camera: {
    name: string,
    full_name: string
  },
  img_src: string,
  earth_date: string,
  //rover: {},
};

