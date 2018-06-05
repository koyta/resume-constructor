import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    data: [],
    isExperienced: false,
    RangePickerMode: ['month', 'month'],
  }

  handleAdd = () => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    if (!(getFieldValue('place') && getFieldValue('position') && getFieldValue('time'))) {
      console.log('no');
    } else {
      const newValue = {
        employer: getFieldValue('place'),
        position: getFieldValue('position'),
        dateStart: getFieldValue('time')[0].format('x'),
        dateEnd: getFieldValue('time')[1].format('x'),
      };
      const newState = [...this.state.data, newValue].sort((a, b) => a.dateStart > b.dateStart);
      console.log(newState);
      this.setState({
        data: newState,
      });
      setFieldsValue({
        employer: '',
        position: '',
        time: [],
      });
    }
  }

  handleRemove = (e) => {
    const { target } = e;
    const node = target.parentNode.parentNode;
    const place = node.querySelector('.preview-experience-place').textContent;
    const position = node.querySelector('.preview-experience-position').textContent;
    node.remove();
    this.setState({
      data: this.state.data.filter((job) => {
        console.log(job.employer, place);
        console.log(job.position, position);
        return job.employer === place && job.position === position;
      }),
    });
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
        handleRemove={this.handleRemove}
        handleExperienceToggle={this.handleExperienceToggle}
        handlePanelChange={this.handlePanelChange}
      />
    );
  }
}

export default Step4;
