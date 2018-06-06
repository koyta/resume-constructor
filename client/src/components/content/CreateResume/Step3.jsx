import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  AutoComplete,
  Row,
  Col,
  Tag,
  Tooltip,
} from 'antd';
import { inject, observer } from 'mobx-react';
import DataSource from './DataSource';

@inject('create') @observer
class Step3 extends Component {
  static propTypes = {
    skills: PropTypes.array.isRequired, // eslint-disable-line
    setSkills: PropTypes.func.isRequired,
    create: PropTypes.shape({
      setSkills: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    tags: [],
    inputVisible: false,
    value: '',
    displayedData: DataSource,
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.props.setSkills(tags);
    this.setState({ tags });
  };

  handleInputConfirm = () => {
    const { value } = this.state;
    let { tags } = this.state;
    if (value !== '' && tags.indexOf(value) === -1) {
      tags = [...tags, value];
    }
    this.props.setSkills(tags);
    this.props.create.setSkills(tags);
    this.setState({
      tags,
      inputVisible: false,
      value: '',
    });
  };

  handleInputSelect = (value) => {
    this.setState({ value });
  }

  handleInputSearch = (searchValue) => {
    this.setState({
      displayedData: DataSource.filter(value => value.includes(searchValue)),
      value: searchValue,
    });
  };

  handleInputChange = (e) => {
    console.log(e);
  }

  saveInputRef = (input) => { this.input = input; };

  render() {
    const { tags, inputVisible, displayedData } = this.state;
    return (
      <Row className="block">
        <h2 className="d-block">Основные навыки</h2>
        <Col xl={16}>
          {tags.map((tag) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag className="custom-tag" key={tag} closable afterClose={() => this.handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible && (
            <AutoComplete
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 135 }}
              dataSource={displayedData}
              onSelect={this.handleInputSelect}
              onSearch={this.handleInputSearch}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="plus" /> Добавить
            </Tag>
          )}
        </Col>
      </Row>
    );
  }
}

export default Step3;
