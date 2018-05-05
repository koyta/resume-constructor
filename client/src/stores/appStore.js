import { observable, action } from 'mobx';

class AppStore {
  @observable isResumeOpened = false;
  @observable sidebar = false;

  constructor(rootStore) {
    this.store = rootStore;
    this.sidebar = false;
    this.isResumeOpened = false;
  }

  @action openResume() { this.isResumeOpened = true; }
  @action closeResume() { this.isResumeOpened = false; }
  @action openSidebar() { this.sidebar = true; }
  @action closeSidebar() { this.sidebar = false; }
}

export default AppStore;
