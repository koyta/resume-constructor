import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_ROOT } from '../../../config/routes'

@inject('routing', 'user') @observer
class Profile extends React.Component {

  state = {
    resumes: {}
  }

  getAllResumes = async() => {
    const { user } = this.props
    const request = await axios.get(`${API_ROOT}/api/resume/owner/${user.profile.login}`)
    const resumes = request.data
    console.log(resumes)
    this.setState({ resumes })
  }

  componentWillMount() {
    this.getAllResumes()
  }

  render() {
    const { user, routing } = this.props
    return (
      <section className="profile">
        <h2>Resumes</h2>
        {
          this.state.resumes.data && this.state.resumes.data.map((resume, i) => {
            return <div key={resume._id}><Link to={`/resume/${resume._id}`}>{resume.profession}</Link></div>
          })
        }
        {
          !this.state.resumes.data && <span>{this.state.resumes.message}</span>
        }
      </section>
    )
  }
}

export default Profile