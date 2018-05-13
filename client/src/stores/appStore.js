import { observable, action } from 'mobx';

class AppStore {
  @observable isResumeOpened = false;
  @observable sidebar = false;

  constructor(rootStore) {
    this.store = rootStore;
  }

  @action.bound openResume() { this.isResumeOpened = true; }
  @action.bound closeResume() { this.isResumeOpened = false; }
  @action.bound openSidebar() { this.sidebar = true; }
  @action.bound closeSidebar() { this.sidebar = false; }
  @action.bound toggleSidebar() {
    this.sidebar = !this.sidebar;
  }
}

export default AppStore;
