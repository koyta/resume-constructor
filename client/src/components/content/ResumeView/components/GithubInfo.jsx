import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';

@inject('fetch', 'app') @observer
class GithubInfo extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.number.isRequired,
    total: PropTypes.bool.isRequired,
    fork: PropTypes.bool.isRequired,
    self: PropTypes.bool.isRequired,
  };

  render() {
    const classCircle = cx('github-element-circle', {
      total: this.props.total,
      fork: this.props.fork,
      self: this.props.self,
    });
    return (
      <div className="github-element">
        <div className={classCircle}>
          <div>{this.props.data}</div>
        </div>
        <div className="github-element-name">{this.props.name}</div>
      </div>
    );
  }
}

export default GithubInfo;
