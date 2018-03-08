import { observable, action } from 'mobx'
import { API_ROOT }  from '../config/routes'
import { loadIdToken, setIdToken } from '../utils/apiUtils'
import axios from 'axios'

class UserStore {
  isAuth = observable()

  constructor () {
    this.isAuth = !!loadIdToken()
  }

  authentication = action(async function(login, password) {
    console.log('Authentication...')
    const request = await axios.post(`${API_ROOT}/api/login`, {
      body: {
        login,
        password
      }
    })
    setIdToken(request.data);
  })

}

export default UserStore;