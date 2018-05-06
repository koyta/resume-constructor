import { RouterStore } from 'mobx-react-router';
import UserStore from './userStore';
import AppStore from './appStore';

class RootStore {
  constructor() {
    this.user = new UserStore(this);
    this.routing = new RouterStore();
    this.app = new AppStore(this);
  }
}

export default RootStore;
