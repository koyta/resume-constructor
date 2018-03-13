import { observable, action } from 'mobx'
import { API_ROOT }  from '../config/routes'
import {
  loadIdToken,
  setIdToken,
  loadUserProfile,
  decodeUserProfile,
} from '../utils/apiUtils'
import axios from 'axios'

class UserStore {
  @observable isAuth
  @observable profile
  @observable status

  constructor (rootStore) {
    this.store = rootStore
    this.isAuth = !!loadIdToken()
    if (this.isAuth) {
      this.profile = loadUserProfile()
    }
  }

  @action authentication = async (login, password) => {
    try {
      const url = `${API_ROOT}/api/login`
      this.status = 'pending'
      const request = await axios.post(url, {
        login: login,
        password: password,
      })

      if (request.status >= 200 && request.status < 300) {
        setIdToken(request.data.token)
        const profile = decodeUserProfile()
        this.userId = profile._id
        this.username = profile.login
        this.store.routing.history.push('/')
        this.status = 'done'
      } else {
        this.status = 'wrong'
      }
    } catch (err) {
      console.error(err)
      this.status = 'error'
    }
  }

  @action registration = async (login, password) => {
    try {
      console.log('Signing in...')
      this.status = 'pending'
      const request = await axios.post(`${API_ROOT}/api/signup`, {
        login,
        password
      })
      console.log(request)
      alert(request)
      if (request.status >= 200 && request.status < 300) {
        this.status = 'done'
        this.store.routing.history.push('/login')
      } else {
        this.status = 'wrong'
      }
      console.log(request)
    } catch (err) {
      console.error(err)
      this.status = 'error'
    }
  }

}

export default UserStore;