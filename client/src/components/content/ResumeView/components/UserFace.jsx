/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const PlaceholderImage = 'https://vignette.wikia.nocookie.net/sote-rp/images/c/c4/User-placeholder.png/revision/latest?cb=20150624004222';

class UserFace extends React.Component {
  calculateAge() {
    return moment(this.props.user.date_of_birth).toNow(true);
  }
  render() {
    const { user, resume, avatar } = this.props;
    return (
      <div className="user">
        <div className="user-image-container">
          <img className="user-image" src={avatar} alt="user" />
        </div>
        <div className="user-info-container">
          <h1 className="user-name">{user.fullname.firstname} {user.fullname.secondname}</h1>
          <div className="user-age">{this.calculateAge()}</div>
          <div className="user-experience">Без опыта</div>
        </div>
        <h3 className="user-profession">{resume.profession}</h3>
      </div>
    );
  }
}
        
UserFace.propTypes = {
  user: PropTypes.shape({
    fullname: PropTypes.shape({
      firstname: PropTypes.string,
      secondname: PropTypes.string,
    }),
    date_of_birth: PropTypes.string,
  }).isRequired,
  resume: PropTypes.shape({
    profession: PropTypes.string,
  }).isRequired,
  avatar: PropTypes.string,
};

UserFace.defaultProps = {
  avatar: PlaceholderImage,
};

export default UserFace;
