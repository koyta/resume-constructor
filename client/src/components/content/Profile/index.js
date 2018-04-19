import React from 'react'
import {toJS} from 'mobx'
import {inject, observer} from 'mobx-react'
import {Link} from 'react-router-dom'
import {Card, Col, Row, Button} from 'antd'


@inject('routing', 'user') @observer
class Profile extends React.Component {

  getAllResumes = async () => {
    await this.props.user.getResumesOfCurrentUser();
    return Promise.resolve()
  };

  componentDidMount() {
    this.getAllResumes()
  }

  render() {
    const {user, routing} = this.props;
    return (
      <section className="profile">
        <h2>Profile</h2>
        <Row gutter={24} style={{width: '100%'}}>
          {
            user.resumes && user.resumes.toJS()
              .map((resume, i) => {
                return (
                  <Col key={i} xs={24} sm={12} md={12} lg={12} xl={8}
                       style={{padding: 24}}>
                    <Card title={resume.profession}
                          extra={<Link to={`/resume/${resume._id}`}>Открыть</Link>}>
                    </Card>
                  </Col>
                )
              })
          }
        </Row>
        {
          user.resumes.length === 0 && <span>On this page you can see, edit and delete your existing resumes. You can create new resume <Link to='/resume/new'>here</Link>.</span>
        }
      </section>
    )
  }
}

export default Profile
