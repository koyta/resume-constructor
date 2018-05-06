import React from 'react';
import PropTypes from 'prop-types';
import {} from 'antd';
import UserIcon from '../../../../assets/icons/user.svg';

const UserTimelineHeading = ({ title, icon }) => (
  <li className="timeline_heading">
    <i><img src={icon} alt="" /></i>
    <span>{title}</span>
  </li>
);
UserTimelineHeading.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const UserTimeline = () => (
  <div className="timeline-container">
    <ul className="timeline timeline">
      <UserTimelineHeading title="Обо мне" icon={UserIcon} />
      <li className="timeline_item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, nesciunt perspiciatis optio numquam aut voluptatibus, reiciendis dicta expedita totam veniam in maiores iure? Velit, nesciunt.</li>
      <li className="timeline_item">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quod numquam consectetur quam.</li>
      <li className="timeline_item">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt.</li>
      <li className="timeline_item">Lorem, ipsum dolor.</li>
    </ul>
  </div>
);

export default UserTimeline;
