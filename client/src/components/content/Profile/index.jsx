import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';


@inject('routing', 'user') @observer
class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      getResumesOfCurrentUser: PropTypes.func.isRequired,
    }).isRequired,
  }
  componentDidMount() {
    this.getAllResumes();
  }

  getAllResumes = async () => {
    await this.props.user.getResumesOfCurrentUser();
    return Promise.resolve();
  };

  render() {
    const { user } = this.props;
    return (
      <section className="profile">
        <h2>Profile</h2>
        <Row gutter={24} style={{ width: '100%' }}>
          {
            user.resumes && user.resumes.toJS()
              .map(resume => (
                <Col key={resume.profession} xs={24} sm={12} md={12} lg={12} xl={8} style={{ padding: 24 }}>
                  <Card
                    title={resume.profession}
                    extra={<Link to={`/resume/view/${resume._id}`}>Открыть</Link>} // eslint-disable-line
                  />
                </Col>
                ))
          }
        </Row>
        {
          user.resumes.length === 0 && <span>On this page you can see, edit and delete your existing resumes. You can create new resume <Link to="/resume/new">here</Link>.</span>
        }
      </section>
    );
  }
}

export default Profile;
