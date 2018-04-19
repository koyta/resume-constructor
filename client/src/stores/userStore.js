import {observable, action} from 'mobx'
import {API_ROOT} from '../config/routes'
import {
  loadIdToken,
  setIdToken,
  loadUserProfile,
  decodeUserProfile, removeIdToken,
} from '../utils/apiUtils'
import axios from 'axios'

class UserStore {
  @observable statusCode; //last http code response
  @observable isFetching;
  @observable isAuth;
  @observable profile = {};
  @observable resumes = [];

  constructor(rootStore) {
    this.isFetching = false;
    this.store = rootStore;
    this.isAuth = !!loadIdToken();
    if (this.isAuth) {
      this.profile = loadUserProfile()
    }
  }

  @action updateProfile = async (data) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/api/update`;
      const request = await axios.post(url, {});

      if (request.status === 200) {
        this.statusCode = 200

      }
    } catch (err) {
      console.error(err)
    }
    this.isFetching = false
  };

  @action getResumesOfCurrentUser = async () => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/api/resume/by/${this.profile.login}`;
      const response = await axios.get(url);
      if (response.status === 200) {
        this.statusCode = 200;
        // Fetching the data from resume IDs
        const resumesID = response.data;
        const resumes = resumesID.map(async (data) => {
          const promiseResume = await axios({
            method: data.request.type,
            url: data.request.url,
          })
          return Promise.resolve(promiseResume);
        })
        // Saving the data from fetched resume data
        Promise.all(resumes).then(response => this.resumes = response.map(resumeFromResponse => {
          return resumeFromResponse.data
        }))
      } else if (response.status === 204) {
        this.statusCode = 204
      }
    } catch (error) {
      console.error(error)
    } finally {
      this.isFetching = false
    }
  };

  @action getUserIdByOwner = async (owner) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/user`;
      const config = {params: {owner}};
      const response = await axios.get(url, config);
      this.statusCode = response.status;
      return response.data;
    } catch (e) {
      console.error("Error catched in mobx store", e)
    } finally {
      this.isFetching = false
    }
  }

  @action getResumeById = async (id) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/api/resume/${id}`
      const response = await axios.get(url)
      if (response.status >= 200 && response.status < 300) {
        this.statusCode = response.status;
        return response.data
      } else {
        this.statusCode = response.status
      }
    } catch (e) {
      console.error("Error catched in mobx store", e)
    } finally {
      this.isFetching = false
    }
  };

  @action authentication = async (login, password) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/api/login`;
      const response = await axios.post(url, {
        login: login,
        password: password
      });

      if (response.status === 200) {
        this.statusCode = 200;
        // Setting up token
        setIdToken(response.data.token);
        // Save profile data from token
        this.profile = decodeUserProfile();
        // Push user to '/' page
        this.store.routing.history.push('/')
      } else if (response.status === 401) {
        this.statusCode = 401
      }
    } catch (err) {
      console.error("Error catched in mobx store. ", err)
    }
    this.isFetching = false
  };

  @action registration = async (data) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/api/signup`
      const body = {login: data.login, password: data.password, firstname: data.firstname, secondname: data.secondname, date_of_birth: data.date_of_birth}
      const request = await axios.post(url, body);
      if (request.status >= 200 && request.status < 300) {
        this.statusCode = 200;
        this.store.routing.push('/login')
      }
    } catch (err) {
      console.error(err);
      this.statusCode = 500;
      throw new Error(err)
    }
    this.isFetching = false
  };

  @action logout() {
    console.log('Logout...');
    removeIdToken()
  }

  @action createResume = async (data) => {
    try {
      this.isFetching = true;
      const url = `${API_ROOT}/api/resume/${this.profile.login}`;
      const body = {
        profession: data.profession,
        email: data.email,
        phone: data.phone,
        accounts: {
          github: data.github,
          medium: data.medium,
          vk: data.vk,
          linkedin: data.linkedin,
          twitter: data.twitter,
          facebook: data.facebook,
          skype: data.skype,
          telegram: data.telegram,
        },
      };
      const config = {
        headers: {
          'authorization': `Bearer ${loadIdToken()}`
        }
      };
      const response = await axios.post(url, body, config);
      if (response.status === 200) {
        this.statusCode = 200;
        console.log('$: ', url, '. Response: ', response);
      }
    } catch (err) {
      console.error(err)
    } finally {
      this.isFetching = false
    }
  }

}

export default UserStore;
