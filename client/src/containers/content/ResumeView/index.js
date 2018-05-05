import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import ResumeViewComponent from '../../../components/content/ResumeView'
import PropTypes from 'prop-types'

@inject('routing', 'user', 'app') @observer
class ResumeView extends Component {

  state = {
    resume: null,
    user: null,
    isLoading: false
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  fetchData = async () => {
    const resume = await this.props.user.getResumeById(this.props.match.params.resumesId)
    // TODO Можно юзать инфу из токена, если resume.owner === mobx.user.profile.login
    const user = await this.props.user.getUserByLogin(resume.owner)
    this.setState({resume: resume, user: user})
  }

  async componentWillMount() {
    this.props.app.openResume();
    this.setState({isLoading: true});
    await this.fetchData()
    this.setState({isLoading: false});
  }

  componentWillUnmount() {
    this.props.app.closeResume();
  }

  render() {
    if (this.state.isLoading || (this.state.user === null && this.state.resume === null)) {
      return <center>Loading...</center>
    }
    return (
      <ResumeViewComponent
        resume={this.state.resume}
        user={this.state.user}
      />
    )
  }
}

export default ResumeView
