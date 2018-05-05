import React, { Component } from 'react';
import { Input, Timeline, DatePicker, Row } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

class Step4 extends Component {
  state = {
    data: [
      {
        place: 'Yandex LLC.',
        position: 'Intern Web Developer',
        dateStart: moment.now() - 10000000,
        dateEnd: moment.now() - 700000,
      },
    ],
  };

  render() {
    return (
      <div className="block">
        <h2>Опыт работы</h2>
        <Row>
          <Input placeholder="Место работы" />
          <Input placeholder="Должность" />
          <RangePicker
            placeholder={['Начало работы', 'Окончание работы']}
            mode={['month', 'month']}
            showTime={false}
            ranges={{ Today: [moment(), moment()] }}
            format="MMMM YYYY"
          />
        </Row>
        <Timeline className="m-5">
          {
            this.state.data.map((item, i) => (<Timeline.Item key={i}>
                <div>From {moment(item.dateStart).format('MMMM YYYY')} to {moment(item.dateEnd).format('MMMM YYYY')}</div>
                <div>{item.place}</div>
                <div>{item.position}</div>
              </Timeline.Item>))
          }
        </Timeline>
      </div>
    );
  }
}

export default Step4;
