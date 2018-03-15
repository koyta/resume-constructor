import React, { Component }  from 'react'
import { inject, observer } from 'mobx-react'

@inject ('routing','user') @observer
class ResumeView extends Component {

  getResume = (id) => {

  }

  render() {
    return (
      <section className="resume">
        hello
      </section>
    )
  }
}

export default ResumeView