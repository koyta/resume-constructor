/* eslint-disable no-underscore-dangle,react/no-did-mount-set-state */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Icon } from "antd";
import moment from "moment";
import cx from "classnames";

@inject("user")
@observer
class Card extends React.Component {
  static propTypes = {
    resume: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired,
    title: PropTypes.string.isRequired,
    experience: PropTypes.number
  };

  static defaultProps = {
    experience: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      cardClass: ["profile-card"]
    };
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          cardClass: ["profile-card", "profile-card-visible"]
        }),
      50
    );
    window.scrollTo(0, 0);
  }

  render() {
    const { title, resume, experience } = this.props;
    let experienceString = "без опыта";
    if (experience) {
      const a = moment(experience.dateStart);
      const b = moment(experience.dateEnd);
      experienceString = b.diff(a, "month");
    }
    let github;
    let medium;
    if (resume.github) {
      github = resume.github.login;
    }
    if (resume.medium) {
      medium = resume.medium.login;
    }

    return (
      <div className={cx(this.state.cardClass)}>
        <header className="profile-card-header">
          <h3 className="profile-card-title">{title}</h3>
          <Link to={`/resume/view/${resume._id}`} className="profile-card-link">
            <Icon type="global" />
          </Link>
        </header>
        <div className="profile-card-content">
          <div className="profile-card-experience">
            Опыт работы: {experienceString}
          </div>
          {(github || medium) && (
            <div className="profile-card-socials">
              <span>Социальные профили:</span>
              {github && (
                <a href={`https://github.com/${github}`}>
                  <Icon type="github" />
                </a>
              )}
              {medium && (
                <a href={`https://medium.com/@${medium}`}>
                  <Icon type="medium " />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
