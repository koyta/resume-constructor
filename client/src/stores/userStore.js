import { observable, action, runInAction, useStrict } from "mobx";
import axios from "axios";
import { API_ROOT } from "../config/routes";
import {
  loadIdToken,
  setIdToken,
  loadUserProfile,
  decodeUserProfile,
  removeIdToken
} from "../utils/apiUtils";

useStrict(true);
class UserStore {
  @observable
  statusCode = null; // last http code response
  @observable
  isFetching = false;
  @observable
  isAuth = false;
  @observable
  profile = {};
  @observable
  resumes = [];
  @observable
  error = {
    type: "",
    message: ""
  };

  constructor(rootStore = null) {
    this.store = rootStore;
    this.isAuth = !!loadIdToken();
    if (this.isAuth) {
      this.profile = loadUserProfile();
    }
  }

  @action
  fetchingOn() {
    this.isFetching = true;
  }

  @action
  fetchingOff() {
    this.isFetching = false;
  }

  @action
  setStatusCode(value) {
    this.statusCode = value;
  }

  @action.bound
  getResumesOfCurrentUser = async () => {
    try {
      runInAction(() => {
        this.isFetching = true;
      });
      const url = `${API_ROOT}/resume/by/${this.profile.login}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        this.setStatusCode(200);
        // Fetching the data from resume IDs
        const resumesID = response.data;
        const resumes = resumesID.map(async item => {
          console.log(item);
          const resume = await axios.get(item.request.url);
          return Promise.resolve(resume);
        });
        // Saving the data from fetched resume data
        const resumesResponse = await Promise.all(resumes);
        runInAction(() => {
          console.log("Fetching data from resumes responses:", resumesResponse);
          this.resumes = resumesResponse.map(
            resumeFromResponse => resumeFromResponse.data
          );
        });
      } else if (response.status === 204) {
        this.setStatusCode(204);
      }
    } catch (error) {
      throw new Error("Error catched in MobX store. Error: ", error);
    } finally {
      this.fetchingOff();
    }
  };

  /**
   * @login {string}
   */
  @action.bound
  getResumesByOwner = async login => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/resume/by/${login}`;
      const config = {};
      const response = await axios.get(url, config);
      this.setStatusCode(response.status);
      if (this.statusCode === 200) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Error catched in MobX store. Error: ", error);
    } finally {
      this.fetchingOff();
    }
    return Promise.resolve();
  };

  /**
   * @login {string}
   */
  @action
  getUserByLogin = async login => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/user/${login}/profile`;
      const config = {};
      const response = await axios.get(url, config);
      this.setStatusCode(response.status);
      return response.data;
    } catch (error) {
      throw new Error("Error catched in MobX store. Error: ", error);
    } finally {
      this.fetchingOff();
    }
  };

  /**
   * @id {string} - resume id
   */
  @action
  getResumeById = async id => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/resume/${id}`;
      const response = await axios.get(url);
      this.setStatusCode(response.status);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
    } catch (error) {
      throw new Error("Error catched in MobX store. Error: ", error);
    } finally {
      this.fetchingOff();
    }
    return Promise.resolve();
  };

  /**
   * @login {string} - user login
   * @password {string} - user password
   */
  @action
  authentication = async (login, password) => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/login`;
      const response = await axios.post(url, {
        login,
        password
      });
      this.setStatusCode(response.status);
      if (response.status === 200) {
        // Setting up token
        setIdToken(response.data.token);
        // Save profile data from token
        this.profile = decodeUserProfile();
        // Push user to '/' page
        this.store.routing.history.push("/");
      } else if (response.status === 401) {
        console.error("401 Неверный логин или пароль");
      }
    } catch (err) {
      console.error("Error catched in mobx store. ", err);
    } finally {
      this.fetchingOff();
    }
  };

  /**
   * @data {object} - User Model object (login, password, fullname {firstname, secondname}, date_of_birth)
   */
  @action.bound
  registration = async data => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/signup`;
      const body = {
        login: data.login,
        password: data.password,
        firstname: data.firstname,
        secondname: data.secondname,
        date_of_birth: data.date_of_birth
      };
      const response = await axios.post(url, body);
      if (response.status === 201) {
        this.setStatusCode(response.status);
        this.store.routing.push("/login");
      }
    } catch (err) {
      this.setStatusCode(500);
      throw new Error(err);
    }
    this.fetchingOff();
  };

  @action
  logout() {
    console.log(this.profile);
    removeIdToken();
  }

  @action
  createResume = async data => {
    try {
      this.fetchingOn();
      const url = `${API_ROOT}/resume/${this.profile.login}`;
      const body = Object.assign({}, data);
      const config = {
        headers: {
          authorization: `Bearer ${loadIdToken()}`
        }
      };
      const response = await axios.post(url, body, config);
      if (response.status === 200) {
        this.setStatusCode(200);
      } else {
        this.setStatusCode(response.status);
      }
    } catch (error) {
      this.setStatusCode(500);
      throw new Error("Error catched in MobX store. Error: ", error);
    } finally {
      this.fetchingOff();
    }
  };
}

export default UserStore;
