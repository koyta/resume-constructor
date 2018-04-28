import React from 'react'
import UserFace from './components/UserFace'
import UserTimeline from './components/UserTimeline'
import PropTypes from 'prop-types'
// import { Col, Row, Avatar, Icon, Table, Timeline, Card, Layout } from 'antd'

const ResumeView = ({resume, user}) => {
  return (
    <section className="resume">
      <main>
        <UserFace user={user} resume={resume}/>
        <UserTimeline resume={resume}/>
      </main>
    </section>
  )
}

ResumeView.propTypes = {
  resume: PropTypes.shape({_id: PropTypes.string.isRequired, email: PropTypes.string.isRequired, owner: PropTypes.string.isRequired, phone: PropTypes.number.isRequired, profession: PropTypes.string.isRequired}),
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    fullname: PropTypes.shape({firstname: PropTypes.string, secondname: PropTypes.string})
  })
}

export default ResumeView
