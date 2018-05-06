import React, { Component } from 'react';
import {
  Icon,
  AutoComplete,
  Row,
  Col,
  Tag,
  Tooltip,
} from 'antd';
import DataSource from './DataSource';

class Step3 extends Component {
  state = {
    tags: ['React', 'Redux'],
    inputVisible: false,
    inputValue: '',
    displayedData: DataSource,
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue !== '' && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleInputSelect = (value) => {
    this.setState({ inputValue: value });
  }

  handleInputSearch = (searchValue) => {
    this.setState({
      displayedData: DataSource.filter(value => value.includes(searchValue)),
      inputValue: searchValue,
    });
  };

  saveInputRef = (input) => { this.input = input; };

  render() {
    const { tags, inputVisible, displayedData } = this.state;
    return (
      <Row type="flex" justify="center" className="block">
        <h2>Основные навыки</h2>
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
