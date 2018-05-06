import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';


class TipPanel extends React.PureComponent {
  static propTypes = {
    // https://ant.design/components/icon
    icon: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const {
      icon, heading, label, title,
    } = this.props;
    return (
      <div className="tip-panel">
        <div className="tip-panel__icon"><Icon type={icon} /></div>
        <div className="tip-panel__heading"><span>{heading}</span></div>
        <div className="tip-panel__body">
          <div className="tip-panel__body-left-label">
            <span>{label}</span>
          </div>
          <div className="tip-panel__title">{title}</div>
        </div>
      </div>
    );
  }
}

export default TipPanel;
