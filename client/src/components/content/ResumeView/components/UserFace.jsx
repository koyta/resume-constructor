import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class UserFace extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        resume: PropTypes.object.isRequired
    }

    render() {
        const { user, resume } = this.props;
        return (
            <div className="user">
                <div className="user__image">
                    <img src={''} alt='user'/>
                </div>
                <div className="user__name-profession">
                    <h1 className="user__name-profession_name">{user.fullname.firstname} {user.fullname.secondname}</h1>
                    <h3 className="user__name-profession_profession">{resume.profession}</h3>
                </div>
            </div>
        )
    }
}
