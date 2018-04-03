import React, { PureComponent } from 'react'
import { Col, Row, Avatar, Icon, Table, Timeline, Card, Layout } from 'antd'

class ResumeView extends React.PureComponent {
  render() {
    const {first, second, imgUrl, } = this.props
    return (
      <section className="resume">
        <main>
          <div className="user">
            <div className="user-image">
              <img src={imgUrl} alt=""/>
            </div>
            <h1>{first} {second}</h1>
          </div>
        </main>
      </section>
    )
  }
}

export default ResumeView
