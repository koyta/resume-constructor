import { RouterStore } from 'mobx-react-router';
import UserStore from './userStore';
import AppStore from './appStore';
import FetchStore from './fetchStore';
import CreateResumeStore from './createResumeStore';

class RootStore {
  constructor() {
    this.user = new UserStore(this);
    this.routing = new RouterStore();
    this.app = new AppStore(this);
    this.fetch = new FetchStore(this);
    this.create = new CreateResumeStore(this);
  }
}

export default RootStore;
