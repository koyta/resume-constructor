import React from 'react';
import PropTypes from 'prop-types';

const UserFace = ({ user, resume }) => (
  <div className="user">
    <div className="user__image">
      <img src="" alt="user" />
    </div>
    <div className="user__name-profession">
      <h1 className="user__name-profession_name">{user.fullname.firstname} {user.fullname.secondname}</h1>
      <h3 className="user__name-profession_profession">{resume.profession}</h3>
    </div>
  </div>
);

UserFace.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.shape({
      firstname: PropTypes.string,
      secondname: PropTypes.string,
    }),
  }).isRequired,
  resume: PropTypes.shape({
    professtion: PropTypes.string,
  }).isRequired,
};
