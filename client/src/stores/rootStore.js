import UserStore from './userStore'
import { RouterStore } from 'mobx-react-router'

class RootStore {
  constructor () {
    this.user = new UserStore(this)
    this.routing = new RouterStore()
  }
}

export default RootStore