import { observable, action } from 'mobx';

class CreateResumeStore {
  @observable skills = [];
  @observable experience = [];
  @observable github;
  @observable medium;

  constructor(rootStore) {
    this.store = rootStore;
  }

  @action.bound setSkills(data) {
    this.skills = data;
  }

  @action.bound setExperience(data) {
    this.experience = data;
  }

  @action.bound setGithub = (data) => {
    this.github = data;
  }

  @action.bound setMedium = (data) => {
    this.medium = data;
  }
}

export default CreateResumeStore;
