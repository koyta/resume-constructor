import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import ResumeViewComponent from '../../../components/content/ResumeView';


@inject('user', 'app') @observer
class ResumeView extends Component {
  static propTypes = {
    user: PropTypes.shape({
      getResumeById: PropTypes.func,
      getUserByLogin: PropTypes.func,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
    app: PropTypes.shape({
      closeResume: PropTypes.func,
      openResume: PropTypes.func,
    }).isRequired,
  }

  state = {
    resume: null,
    user: null,
    isLoading: false,
  }

  async componentWillMount() {
    this.props.app.openResume();
    this.setState(prevState => ({ isLoading: !prevState.isLoading }));
    await this.fetchData();
    this.setState(prevState => ({ isLoading: !prevState.isLoading }));
  }

  componentWillUnmount() {
    this.props.app.closeResume();
  }

  fetchData = async () => {
    const resume = await this.props.user.getResumeById(this.props.match.params.resumesId);
    // TODO Можно юзать инфу из токена, если resume.owner === mobx.user.profile.login
    const user = await this.props.user.getUserByLogin(resume.owner);
    this.setState({ resume, user });
  }

  render() {
    if (this.state.isLoading || (this.state.user === null && this.state.resume === null)) {
      return <center>Loading...</center>;
    }
    return (
      <ResumeViewComponent
        resume={this.state.resume}
        user={this.state.user}
      />
    );
  }
}

export default ResumeView;
