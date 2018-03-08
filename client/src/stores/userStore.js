import { observable, action } from 'mobx'
import { API_ROOT }  from '../config/routes'
import { loadIdToken, setIdToken } from '../utils/apiUtils'
import axios from 'axios'

class UserStore {
  @observable isAuth

  constructor () {
    this.isAuth = !!loadIdToken()
  }

  @action authentication = async (login, password) => {
    console.log('Authentication...')
    const request = await axios.post(`${API_ROOT}/api/login`, {
      body: {
        login,
        password
      }
    })
    setIdToken(request.data);
  }

}

export default UserStore;