import React from 'react';
import { Col, Row } from 'antd';

const WelcomePage = () => (
  <Row>
    <Col offset={4} span={8}>
      <section className="welcome">
        <h1>Привет!</h1>
      </section>
    </Col>
  </Row>
);

export default WelcomePage;
