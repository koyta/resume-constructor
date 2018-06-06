/* eslint-disable react/no-typos */
import React from 'react';
import { string, number, oneOf } from 'prop-types';
import cx from 'classnames';

const SummaryItem = (props) => {
  const itemClass = cx('summary-item-data', {
    'summary-item-fork': props.type === 'fork',
    'summary-item-total': props.type === 'total',
    'summary-item-self': props.type === 'self',
  });
  return (
    <div className="summary-item">
      <div className={itemClass}>{props.data}</div>
      <div className="summary-item-title">{props.title}</div>
    </div>
  );
};

SummaryItem.propTypes = {
  data: number.isRequired,
  title: string.isRequired,
  type: oneOf(['self', 'total', 'fork']).isRequired,
};

export default SummaryItem;
