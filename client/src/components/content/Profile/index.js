import React from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Button } from 'antd'

@inject('routing', 'user') @observer
class Profile extends React.Component {

  getAllResumes = async () => {
    const { user } = this.props
    await user.fetchResumes()
  }

  componentDidMount () {
    this.getAllResumes()
  }

  render() {
    const { user, routing } = this.props
    return (
      <section className="profile">
        <h2>Resumes</h2>
        <Row gutter={16} style={{width: '100%'}}>
          {
            user.resumes && user.resumes.toJS().map((resume, i) => {
              return (
                <Col key={i} span={6}>
                  <Card title={resume.profession}
                        extra={<Link
                          to={`/resume/${resume._id}`}>Открыть</Link>}>
                    Описание
                  </Card>
                </Col>
              )
            })
          }
        </Row>

        {
          !user.resumes && <span>{user.resumes.message}</span>
        }
      </section>
    )
  }
}

export default Profile
