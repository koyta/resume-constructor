import React from 'react'
import { inject, observer } from 'mobx-react'
import PersonalInfoComponent from '../../../components/blocks/PersonalInfo'
import PropTypes from 'prop-types'

@inject('routing', 'user') @observer
class PersonalInfo extends React.Component {

  static propTypes = {
    routing: PropTypes.object.isRequired,
    user: PropTypes.shape({
      profile: PropTypes.object.isRequired,
      resumes: PropTypes.object
    }).isRequired
  }

  state = {
    loading: false,
  }

  handleSubmit = async (e) => {
    const { user, routing } = this.props
    e.preventDefault()
    this.setState({ loading: true })
    await user.
    this.setState({ loading: false})
  }

  render() {
    return (
      <PersonalInfoComponent
        loading={this.state.loading}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}



export default PersonalInfo;
