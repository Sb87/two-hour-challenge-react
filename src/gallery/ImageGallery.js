// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { setSelectedDate } from './gallery-actions';
import RoverGallery from './RoverGallery';

import './ImageGallery.css';
import 'react-datepicker/dist/react-datepicker.css';

const rovers = ['Curiosity', 'Opportunity'];

class ImageGallery extends Component {
  render() {
    const selectedMoment = moment(this.props.selectedDate);

    return (
      <div className="ImageGallery">
        <label className="datepicker">
          Date: <DatePicker selected={selectedMoment} onChange={this.handleDateChange} />
        </label>
        {rovers.map(rover => <RoverGallery key={rover} rover={rover} />)}
      </div>
    );
  }

  handleDateChange = (moment) => {
    const date = moment.format('YYYY-MM-DD');
    this.props.dispatch(setSelectedDate(date));
  };
}

function mapStateToProps(state) {
  const { selectedDate } = state;

  return {
    selectedDate
  };
}

export default connect(mapStateToProps)(ImageGallery);
