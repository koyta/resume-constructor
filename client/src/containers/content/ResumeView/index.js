import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import ResumeViewComponent from '../../../components/content/ResumeView'
import PropTypes from 'prop-types'

@inject('routing', 'user') @observer
class ResumeView extends Component {

  state = {
    resumeToView: null,
    user: null
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
    const user = await this.props.user.getUserIdByOwner(resume.owner)
    this.setState({resume, user})
  }

  componentWillMount() {
    this.fetchData()
  }

  render() {
    return (
      <ResumeViewComponent
        resume={this.state.resumeToView}
        loading={this.props.user.isFetching}
        user={this.state.user}
      />
    )
  }
}

export default ResumeView
