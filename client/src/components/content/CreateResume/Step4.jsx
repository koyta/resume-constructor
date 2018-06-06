import React from 'react';
import PropTypes from 'prop-types';
import { Input, Timeline, DatePicker, Row, Button, Switch, Form } from 'antd';
import moment from 'moment';
import cx from 'classnames';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const Step4 = (props) => {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  return (
    <React.Fragment>
      <div className="block">
        <h2>Опыт работы</h2>
        <FormItem
          {...formItemLayout}
          label="Без опыта"
        >
          <Switch checked={props.isExperienced} onChange={props.handleExperienceToggle} />
        </FormItem>
        <Row className={cx({ 'd-none': props.isExperienced })}>
          <FormItem {...formItemLayout} label="Место работы">
            {getFieldDecorator('place')(<Input placeholder="Место работы" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Должность">
            {getFieldDecorator('position')(<Input placeholder="Должность" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Период">
            {getFieldDecorator('time')(<RangePicker
              placeholder={['Начало', 'Окончание']}
              mode={props.RangePickerMode}
              onPanelChange={props.handlePanelChange}
              format="MMMM YYYY"
            />)}
          </FormItem>
          <Button onClick={props.handleAdd} icon="plus" className="add-experience">Добавить в список</Button>
        </Row>
      </div>
      <div className={cx({ block: true, 'd-none': props.isExperienced })}>
        <h2>Таймлайн</h2>
        {props.data.length > 0 ?
          <Timeline className="m-5 preview-experience">
            {
            props.data.map(item => (
              <Timeline.Item key={Math.random()} className="preview-experience_item">
                <Button className="remove-experience" icon="minus" type="danger" size="small" onClick={e => props.handleRemove(e)}>Удалить</Button>
                <div className="preview-experience-date">С {moment(item.dateStart).format('MMMM YYYY')} по {moment(item.dateEnd).format('MMMM YYYY')}</div>
                <div className="preview-experience-place">{item.employer}</div>
                <div className="preview-experience-position">{item.position}</div>
              </Timeline.Item>))
            }
          </Timeline>
        : <span style={{ textAlign: 'center' }}>Добавьте хотя бы один раз информацию об опыте работы, чтобы увидеть превью</span>
        }
      </div>
    </React.Fragment>
  );
};

Step4.propTypes = {
  form: PropTypes.shape({
    getFieldsValue: PropTypes.func,
    getFieldValue: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    setFieldsValue: PropTypes.func,
  }).isRequired,
  isExperienced: PropTypes.bool.isRequired,
  RangePickerMode: PropTypes.array.isRequired, //eslint-disable-line
  data: PropTypes.array.isRequired, //eslint-disable-line
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleExperienceToggle: PropTypes.func.isRequired,
  handlePanelChange: PropTypes.func.isRequired,
};

export default Step4;
