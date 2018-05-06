import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import PersonalInfoComponent from '../../../components/blocks/PersonalInfo';

@inject('routing', 'user') @observer
class PersonalInfo extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      profile: PropTypes.object.isRequired,
      resumes: PropTypes.object,
    }).isRequired,
  }

  state = {
    loading: false,
  }

  handleSubmit = async (e) => {
    const { user } = this.props;
    e.preventDefault();
    this.setState({ loading: true });
    await user.this.setState({ loading: false });
  }

  render() {
    return (
      <PersonalInfoComponent
        loading={this.state.loading}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}


export default PersonalInfo;
