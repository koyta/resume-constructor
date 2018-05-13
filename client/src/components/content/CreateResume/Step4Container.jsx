import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Step4Component from './Step4';

class Step4 extends Component {
  static propTypes = {
    form: PropTypes.shape({
      getFieldsValue: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    data: [
      {
        place: 'Yandex LLC.',
        position: 'Intern Web Developer',
        dateStart: moment() - 10000000,
        dateEnd: moment() - 700000,
      },
    ],
    isExperienced: false,
    RangePickerMode: ['month', 'month'],
  }

  handleAdd = () => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    if (!(getFieldValue('place') && getFieldValue('position') && getFieldValue('time'))) {
      console.log('no');
    } else {
      const newValue = {
        place: getFieldValue('place'),
        position: getFieldValue('position'),
        dateStart: getFieldValue('time')[0],
        dateEnd: getFieldValue('time')[1],
      };
      this.setState({
        data: [...this.state.data, newValue],
      });
      setFieldsValue({
        place: '',
        position: '',
        time: [],
      });
    }
  }

  handleExperienceToggle = () => {
    this.setState({ isExperienced: !this.state.isExperienced });
  }

  handlePanelChange = (value, mode) => {
    this.props.form.setFieldsValue({ time: value });
    this.setState({
      RangePickerMode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  }

  render() {
    return (
      <Step4Component
        {...this.props}
        data={this.state.data}
        isExperienced={this.state.isExperienced}
        RangePickerMode={this.state.RangePickerMode}
        handleAdd={this.handleAdd}
        handleExperienceToggle={this.handleExperienceToggle}
        handlePanelChange={this.handlePanelChange}
      />
    );
  }
}

export default Step4;
