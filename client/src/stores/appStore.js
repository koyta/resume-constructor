import {observable, action} from 'mobx'

class AppStore {

    @observable isResumeOpened;

    constructor(rootStore) {
        this.store = rootStore;
        this.isResumeOpened = false;
    }

    @action openResume () {
        this.isResumeOpened = true;
    }

    @action closeResume () {
        this.isResumeOpened = false;
    }

    

}

export default AppStore;