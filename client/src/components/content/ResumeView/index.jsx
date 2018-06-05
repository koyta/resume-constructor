/* eslint-disable jsx-a11y/anchor-has-content,react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { defaults } from 'react-chartjs-2';
import UserFace from './components/UserFace';
import UserTimeline from './components/UserTimeline';
import Charts from './components/Charts';
import SocialCard from './components/SocialCard';
import SummaryItem from './components/SummaryItem';
// import { Col, Row, Avatar, Icon, Table, Timeline, Card, Layout } from 'antd'

defaults.global.animation = true;

const ResumeView = ({ resume, user, fetch }) => (
  <section className="resume">
    <UserFace
      user={user}
      resume={resume}
      avatar={fetch.github && fetch.github.avatar_url}
    />
    <UserTimeline resume={resume} />
    <div className="socials-heading-container">
      <h2 className="socials-heading">Участие в профессиональных сообществах</h2>
    </div>
    <div className="socials-container">
      {fetch.github && <SocialCard
        type="github"
        name={fetch.github.name}
        link={fetch.github.html_url}
        desc={fetch.github.bio}
        stars={fetch.stars}
      />}
    </div>
    <div className="summary">
      <header className="summary-title-container">
        <h2 className="summary-title">I <Icon type="heart" /> open source</h2>
      </header>
      <div className="summary-content">
        <SummaryItem data={fetch.followers} title="Followers" type="self" />
        <SummaryItem data={fetch.following} title="Following" type="self" />
        <SummaryItem data={fetch.forks} title="Forks done" type="fork" />
        <SummaryItem data={fetch.forksHave} title="Forks have" type="fork" />
        <SummaryItem data={fetch.PRs} title="Active PRs" type="fork" />
        <SummaryItem data={fetch.accountHowOld} title="Account age in month" type="total" />
        <SummaryItem data={fetch.publicRepos} title="Public repositories" type="total" />
        <SummaryItem data={fetch.starsHave} title="Stars have" type="total" />
      </div>
    </div>
    <div>
      <Charts fetch={fetch} />
    </div>
  </section>
);

ResumeView.propTypes = {
  resume: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
    profession: PropTypes.string.isRequired,
    skills: PropTypes.array,
    experience: PropTypes.array,
  }).isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    fullname: PropTypes.shape({ firstname: PropTypes.string, secondname: PropTypes.string }),
  }).isRequired,
  fetch: PropTypes.shape({
    github: PropTypes.object,
    medium: PropTypes.object,
  }).isRequired,
};

export default ResumeView;
