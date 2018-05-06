import { observable, action } from 'mobx';
import axios from 'axios';
import { API_ROOT } from '../config/routes';
import { loadIdToken, setIdToken, loadUserProfile, decodeUserProfile, removeIdToken } from '../utils/apiUtils';

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

  @action getResumesOfCurrentUser = async () => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/resume/by/${this.profile.login}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        this.statusCode = 200;
        // Fetching the data from resume IDs
        const resumesID = response.data;
        const resumes = resumesID.map(async (item) => {
          const promiseResume = await axios({ method: item.request.type, url: item.request.url });
          return Promise.resolve(promiseResume);
        });
        // Saving the data from fetched resume data
        const resumesResponse = await Promise.all(resumes);
        this.resumes = resumesResponse.map(resumeFromResponse => resumeFromResponse.data);
      } else if (response.status === 204) {
        this.statusCode = 204;
      }
    } catch (error) {
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.isFetching = false;
    }
  };

  /**
   * @login {string}
   */
  @action getResumesByOwner = async (login) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/resume/by/${login}`;
      const config = {};
      const response = await axios.get(url, config);
      this.statusCode = response.status;
      return response.data;
    } catch (error) {
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.isFetching = false;
    }
  }

  /**
   * @login {string}
   */
  @action getUserByLogin = async (login) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/user?login=${login}`;
      const config = {};
      const response = await axios.get(url, config);
      this.statusCode = response.status;
      return response.data;
    } catch (error) {
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.isFetching = false;
    }
  }

  /**
   * @id {string} - resume id
   */
  @action getResumeById = async (id) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/resume/${id}`;
      const response = await axios.get(url);
      if (response.status >= 200 && response.status < 300) {
        this.statusCode = response.status;
        return response.data;
      }
      this.statusCode = response.status;
    } catch (error) {
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.isFetching = false;
    }
    return Promise.resolve();
  };

  /**
   * @login {string} - user login
   * @password {string} - user password
   */
  @action authentication = async (login, password) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/login`;
      const response = await axios.post(url, {
        login,
        password,
      });

      if (response.status === 200) {
        this.statusCode = 200;
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
        this.statusCode = 401;
      }
    } catch (err) {
      throw new Error('Error catched in mobx store. ', err);
    }
    this.isFetching = false;
  };

  /**
   * @data {object} - User Model object (login, password, fullname {firstname, secondname}, date_of_birth)
   */
  @action registration = async (data) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/signup`;
      const body = {
        login: data.login,
        password: data.password,
        firstname: data.firstname,
        secondname: data.secondname,
        date_of_birth: data.date_of_birth,
      };
      const request = await axios.post(url, body);
      if (request.status >= 200 && request.status < 300) {
        this.statusCode = 200;
        this
          .store
          .routing
          .push('/login');
      }
    } catch (err) {
      console.error(err);
      this.statusCode = 500;
      throw new Error(err);
    }
    this.isFetching = false;
  };

  @action logout() {
    console.log(this.profile);
    console.log('Logout...');
    removeIdToken();
  }

  @action createResume = async (data) => {
    try {
      this.isFetching = true;
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
        this.statusCode = 200;
        console.log('$: ', url, '. Response: ', response);
      } else {
        this.statusCode = response.status;
      }
    } catch (error) {
      this.statusCode = 500;
      throw new Error('Error catched in MobXX store. Error: ', error);
    } finally {
      this.isFetching = false;
    }
  }
}

export default UserStore;
