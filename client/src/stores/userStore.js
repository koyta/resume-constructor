import { observable, action } from 'mobx'
import { API_ROOT }  from '../config/routes'
import {
  loadIdToken,
  setIdToken,
  loadUserProfile,
  decodeUserProfile, removeIdToken,
} from '../utils/apiUtils'
import axios from 'axios'

class UserStore {
  @observable statusCode //last http code response
  @observable isFetching
  @observable isAuth
  @observable profile = {
    // id: '0',
    // login: 'none',
  }
  @observable resumes = {}

  constructor (rootStore) {
    this.isFetching = false
    this.store = rootStore
    this.isAuth = !!loadIdToken()
    if (this.isAuth) {
      this.profile = loadUserProfile()
    }
  }

  @action authentication = async (login, password) => {
    try {
      this.isFetching = true
      const url = `${API_ROOT}/api/login`
      const request = await axios.post(url, {
        login: login,
        password: password,
      })

      if (request.status === 200) {
        this.statusCode = 200
        // Setting up token
        setIdToken(request.data.token)
        // Save profile data from token
        this.profile = decodeUserProfile()
        // Push user to '/' page
        this.store.routing.history.push('/')
      } else if (request.status === 401) {
        this.statusCode = 401
      }
    } catch (err) {
      console.error(err)
    }
    this.isFetching = false
  }

  @action registration = async (login, password) => {
    try {
      this.isFetching = true
      console.log('Signing in...')
      const request = await axios.post(`${API_ROOT}/api/signup`, {
        login,
        password
      })
      console.log(request)
      alert(request)
      if (request.status >= 200 && request.status < 300) {
        this.statusCode = 200
        this.store.routing.push('/login')
      }
      console.log(request)
    } catch (err) {
      console.error(err)
      this.statusCode = 500
      throw new Error(err)
    }
    this.isFetching = false
  }

  @action logout () {
    console.log('Logout...')
    removeIdToken()
  }

}

export default UserStore;