import { observable, action, runInAction, useStrict } from 'mobx';
import axios from 'axios';
import { API_ROOT } from '../config/routes';
import { loadIdToken, setIdToken, loadUserProfile, decodeUserProfile, removeIdToken } from '../utils/apiUtils';

useStrict(true);
class UserStore {
  @observable statusCode; // last http code response
  @observable isFetching;
  @observable isAuth;
  @observable profile = {};
  @observable resumes = [];

  constructor(rootStore = null) {
    this.isFetching = false;
    this.store = rootStore;
    this.isAuth = !!loadIdToken();
    if (this.isAuth) {
      this.profile = loadUserProfile();
    }
  }

  @action fetchingOn() {
    this.isFetching = true;
  }

  @action fetchingOff() {
    this.isFetching = false;
  }

  @action setStatusCode(value) {
    this.statusCode = value;
  }

  @action.bound getResumesOfCurrentUser = async () => {
    try {
      runInAction(() => { this.isFetching = true; });
      const url = `${API_ROOT}/resume/by/${this.profile.login}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        this.setStatusCode(200);
        // Fetching the data from resume IDs
        const resumesID = response.data;
        const resumes = resumesID.map(async (item) => {
          const promiseResume = await axios({ method: item.request.type, url: item.request.url });
          return Promise.resolve(promiseResume);
        });
        // Saving the data from fetched resume data
        const resumesResponse = await Promise.all(resumes);
        runInAction(() => { this.resumes = resumesResponse.map(resumeFromResponse => resumeFromResponse.data); });
      } else if (response.status === 204) {
        this.setStatusCode(204);
      }
    } catch (error) {
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.fetchingOff();
    }
  };

  /**
   * @login {string}
   */
  @action.bound getResumesByOwner = async (login) => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/resume/by/${login}`;
      const config = {};
      const response = await axios.get(url, config);
      this.setStatusCode(response.status);
      return response.data;
    } catch (error) {
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.fetchingOff();
    }
  }

  /**
   * @login {string}
   */
  @action getUserByLogin = async (login) => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/user?login=${login}`;
      const config = {};
      const response = await axios.get(url, config);
      this.setStatusCode(response.status);
      return response.data;
    } catch (error) {
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.fetchingOff();
    }
  }

  /**
   * @id {string} - resume id
   */
  @action getResumeById = async (id) => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/resume/${id}`;
      const response = await axios.get(url);
      this.setStatusCode(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      throw new Error('Error catched in MobX store. Error: ', error);
    } finally {
      this.fetchingOff();
    }
    return Promise.resolve();
  };

  /**
   * @login {string} - user login
   * @password {string} - user password
   */
  @action authentication = async (login, password) => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/login`;
      const response = await axios.post(url, {
        login,
        password,
      });
      this.setStatusCode(response.status);
      if (response.status === 200) {
        // Setting up token
        setIdToken(response.data.token);
        // Save profile data from token
        this.profile = decodeUserProfile();
        // Push user to '/' page
        this
          .store
          .routing
          .history
          .push('/');
      } else if (response.status === 401) {
        throw new Error('401 Unauthorized');
      }
    } catch (err) {
      throw new Error('Error catched in mobx store. ', err);
    }
    this.isFetching = false;
  };

  /**
   * @data {object} - User Model object (login, password, fullname {firstname, secondname}, date_of_birth)
   */
  @action.bound registration = async (data) => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/signup`;
      const body = {
        login: data.login,
        password: data.password,
        firstname: data.firstname,
        secondname: data.secondname,
        date_of_birth: data.date_of_birth,
      };
      const response = await axios.post(url, body);
      if (response.status >= 200 && response.status < 300) {
        this.setStatusCode(response.status);
        this.store.routing.push('/login');
      }
    } catch (err) {
      this.setStatusCode(500);
      throw new Error(err);
    }
    this.fetchingOff();
  };

  @action logout() {
    console.log(this.profile);
    removeIdToken();
  }

  @action createResume = async (data) => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/resume/${this.profile.login}`;
      const body = {
        profession: data.profession,
        email: data.email,
        phone: data.phone,
        github: data.github,
        medium: data.medium,
        vk: data.vk,
        linkedin: data.linkedin,
        twitter: data.twitter,
        facebook: data.facebook,
        skype: data.skype,
        telegram: data.telegram,
      };
      const config = {
        headers: {
          authorization: `Bearer ${loadIdToken()}`,
        },
      };
      const response = await axios.post(url, body, config);
      console.log(response);
      if (response.status === 200) {
        this.setStatusCode(200);
        console.log('$: ', url, '. Response: ', response);
      } else {
        this.setStatusCode(response.status);
      }
    } catch (error) {
      this.setStatusCode(500);
      throw new Error('Error catched in MobX store. Error: ', error);
    } finally {
      this.fetchingOff();
    }
  }
}

export default UserStore;
