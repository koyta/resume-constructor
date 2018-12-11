import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Col, Row } from "antd";
import Card from "./Card";

@inject("routing", "user", "app")
@observer
class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      getResumesOfCurrentUser: PropTypes.func.isRequired
    }).isRequired,
    app: PropTypes.shape({
      setScene: PropTypes.func.isRequired
    }).isRequired
  };
  componentDidMount() {
    this.props.app.setScene("Profile");
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
        <Row
          gutter={16}
          type="flex"
          align="center"
          justify="center"
          style={{ width: "100%" }}
        >
          {user.resumes &&
            user.resumes.toJS().map(resume => (
              <Col
                key={resume.profession}
                xs={24}
                sm={12}
                md={12}
                lg={9}
                xl={8}
                style={{ padding: "24px 24px 0" }}
              >
                <Card
                  title={resume.profession}
                  experience={resume.experience}
                  resume={resume}
                />
              </Col>
            ))}
        </Row>
      </section>
    );
  }
}

export default Profile;
