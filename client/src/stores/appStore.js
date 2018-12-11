import { observable, action } from "mobx";

class AppStore {
  @observable isResumeOpened = false;
  @observable scene = "";

  constructor(rootStore) {
    this.store = rootStore;
  }

  @action.bound openResume() {
    this.isResumeOpened = true;
  }
  @action.bound closeResume() {
    this.isResumeOpened = false;
  }
  @action.bound setScene(scene) {
    this.scene = scene;
  }
}

export default AppStore;
