import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';
import moment from 'moment';

class FetchStore {
  @observable github;
  @observable medium;
  @observable repos;
  @observable loading = false;
  @observable status;
  @observable languagesPerRepo = [];
  @observable githubUser;
  @observable mediumUser;

  constructor(rootStore) {
    this.store = rootStore;
  }

  @action fetchGithub = async (user) => {
    runInAction(() => { this.githubUser = user; });
    const url = `https://api.github.com/users/${this.githubUser}`;
    try {
      this.loadingStart();
      const response = await fetch(url);
      this.loadingStop();
      if (response.status === 200) {
        const data = await response.json();
        this.setGithub(data);
      }
      this.setStatus(response.status);
    } catch (e) {
      this.loadingStop();
      throw new Error('Error catched while trying to fetch github user data. Error: ', user, e);
    }
  }

  @action.bound fetchMedium = async (user) => {
    runInAction(() => { this.mediumUser = user; });
    const url = `https://medium.com/@${this.mediumUser}?format=json`;
    try {
      this.loadingStart();
      const response = await fetch(url);
      const data = await response.json();
      this.loadingStop();
      this.setStatus(data.status);
      if (this.status < 300 && this.status >= 200) this.setMedium(data);
    } catch (e) {
      this.loadingStop();
      throw new Error('Error catched while trying to fetch github user data (user %s). Error: ', user, e);
    }
  }

  @computed get stars() {
    if (this.github) {
      return this.github.followers;
    }
    return 0;
  }

  @action getRepos = async () => {
    if (this.github) {
      this.loadingStart();
      const response = await axios.get(this.github.repos_url);
      this.setStatus(response.status);
      this.loadingStop();
      runInAction(() => {
        this.repos = response.data;
      });
    }
  }

  @action reposList = async () => {
    const response = await fetch(this.github.repos_url);
    const list = await response.json();
    return list;
  }

  @action getLanguagesPerRepo = async () => {
    console.log('get languages');
    if (this.repos) {
      const languages = this.repos.map(repo => repo.languages_url);
      console.log('Languages URLs', languages);
      runInAction(async () => {
        this.languagesPerRepo = await Promise.all(languages);
      });
      console.log('Languages per repository', this.languagesPerRepo);
    }
    throw new Error('Error while getting languages per repository');
  }

  @computed get followers() {
    if (this.github) {
      return this.github.followers;
    }
    return 0;
  }

  @computed get publicRepos() {
    if (this.github) {
      return this.github.public_repos;
    }
    return 0;
  }

  @computed get publicGists() {
    if (this.github) {
      return this.github.public_gists;
    }
    return 0;
  }

  @computed get following() {
    if (this.github) {
      return this.github.following;
    }
    return 0;
  }

  @computed get PRs() {
    if (this.github) {
      if (this.repos) {
        const summ = this.repos.reduce(async (sum, item) => {
          const response = await fetch(item.pulls_url);
          const data = await response.json();
          return sum + data.length;
        }, 0);
        return summ;
      }
    }
    return 0;
  }

  @computed get accountHowOld() {
    if (this.github) {
      const a = moment(this.github.created_at);
      const b = moment(Date.now());
      return b.diff(a, 'month');
    }
    return 0;
  }

  @computed get forks() {
    if (this.repos) {
      let forks = [];
      this.repos.forEach((repo) => {
        if (repo.fork) {
          forks = [...forks, repo];
        }
      });
      return forks.length;
    }
    return 0;
  }

  @computed get forksHave() {
    if (this.repos) {
      let result = 0;
      this.repos.forEach((repo) => {
        result += repo.forks_count;
      });
      return result;
    }
    return -1;
  }

  @computed get starsHave() {
    if (this.repos) {
      let starredReposCount = 0;
      this.repos.forEach((repo) => {
        runInAction(() => {
          starredReposCount += repo.stargazers_count;
        });
      });
      return starredReposCount;
    }
    return 0;
  }

  @action.bound setGithub = (data) => {
    this.github = data;
  }

  @action.bound setMedium = (data) => {
    this.medium = data;
  }

  @action.bound loadingStart = () => {
    this.loading = true;
  }

  @action.bound loadingStop = () => {
    this.loading = false;
  }

  @action.bound setStatus = (number) => {
    this.status = number;
  }
}

export default FetchStore;
