import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, List } from 'antd'

export default class WelcomePage extends React.PureComponent {
  render() {
    return (
      <Row >
        <Col offset={4} span={8}>
          <section className="welcome">
            <h1>Привет!</h1>
          </section>
        </Col>
      </Row>
    )
  }
}
