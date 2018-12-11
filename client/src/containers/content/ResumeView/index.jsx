import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import ResumeViewComponent from "../../../components/content/ResumeView";

@inject("user", "app", "fetch")
@observer
class ResumeView extends Component {
  static propTypes = {
    user: PropTypes.shape({
      getResumeById: PropTypes.func,
      getUserByLogin: PropTypes.func
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object
    }).isRequired,
    app: PropTypes.shape({
      closeResume: PropTypes.func,
      openResume: PropTypes.func,
      setScene: PropTypes.func
    }).isRequired,
    fetch: PropTypes.shape({
      fetchGithub: PropTypes.func
    }).isRequired
  };

  state = {
    resume: null,
    user: null
  };

  async componentWillMount() {
    this.props.app.openResume();
    this.props.app.setScene("Резюме");
    await this.fetchData();
  }

  componentWillUnmount() {
    this.props.app.closeResume();
  }

  fetchData = async () => {
    const fetchedResume = await this.props.user.getResumeById(
      this.props.match.params.resumesId
    );
    const fetchedUser = await this.props.user.getUserByLogin(
      fetchedResume.owner
    );
    this.setState({
      resume: fetchedResume,
      user: fetchedUser
    });
    this.props.fetch.fetchGithub(fetchedResume.github.login);
  };

  render() {
    const { user, resume } = this.state;
    const { fetch } = this.props;
    if (!user && !resume) {
      return <p style={{ textAlign: "center", margin: 0 }}>Loading...</p>;
    }
    return <ResumeViewComponent resume={resume} user={user} fetch={fetch} />;
  }
}

export default ResumeView;
