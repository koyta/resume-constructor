import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Avatar, Icon, Table, Timeline, Card, Layout } from 'antd'


class ResumeView extends React.Component {

  static propTypes = {
    resume: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      profession: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      fullname: PropTypes.shape({
        firstname: PropTypes.string,
        secondname: PropTypes.string
      })
    }).isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    return (
      <section className="resume">
        <main>
          <div className="user">
            <div className="user-image">
              <img src={''} alt=""/>
            </div>
            <h1></h1>
          </div>
        </main>
      </section>
    )
  }
}

export default ResumeView
