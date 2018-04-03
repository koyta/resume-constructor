import React, { Component }  from 'react'
import { inject, observer } from 'mobx-react'
import ResumeViewComponent from '../../../components/content/ResumeView'
import PropTypes from 'prop-types'

@inject ('routing','user') @observer
class ResumeView extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired
  }

  getResume = async () => {
    if (user.resumes.length) {
      await user.fetchResumes()
    }
    console.log(user.resumes)
  }

  componentDidMount () {
    this.getResume(this.props.id)
  }

  render() {
    return (
      <ResumeViewComponent

      />
    )
  }
}

export default ResumeView
