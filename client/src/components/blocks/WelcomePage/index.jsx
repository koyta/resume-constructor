import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Profile from '../../../components/content/Profile';

@inject('app') @observer
class WelcomePage extends React.Component {
  static propTypes = {
    app: PropTypes.shape({
      setScene: PropTypes.func.isRequired,
    }).isRequired,
  }
  componentDidMount() {
    this.props.app.setScene('welcome');
  }

  render() {
    return (
      <section className="welcome-page">
        <div className="flex-centering">
          <Link to="/resume/new" className="main-button">Создать анкету</Link>
        </div>
        <Profile />
      </section>
    );
  }
}

export default WelcomePage;
