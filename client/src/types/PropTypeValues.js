import PropTypes from "prop-types";

export const UserStorePropTypes = PropTypes.shape({
  registration: PropTypes.func.isRequired,
  authentication: PropTypes.func.isRequired,
  getResumesOfCurrentUser: PropTypes.func.isRequired,
  getResumesByOwner: PropTypes.func.isRequired,
  getUserByLogin: PropTypes.func.isRequired,
  getResumeById: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  statusCode: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  resumes: PropTypes.object.isRequired
}).isRequired;

export const AppStorePropTypes = PropTypes.shape({
  isResumesOpened: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool.isRequired,
  openResume: PropTypes.func.isRequired,
  closeResume: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired
}).isRequired;

export const RoutingStorePropTypes = PropTypes.shape({
  go: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
}).isRequired;

export const AntdFormPropTypes = PropTypes.shape({
  setFieldsValue: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldsValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired
}).isRequired;

export const GithubPropTypes = PropTypes.shape({
  avatar_url: PropTypes.string,
  bio: PropTypes.string,
  blog: PropTypes.string,
  company: PropTypes.string,
  created_at: PropTypes.string,
  email: PropTypes.string,
  events_url: PropTypes.string,
  followers: PropTypes.number,
  following: PropTypes.number,
  followers_url: PropTypes.string,
  following_url: PropTypes.string,
  gists_url: PropTypes.string,
  location: PropTypes.string,
  login: PropTypes.string,
  name: PropTypes.string,
  public_gists: PropTypes.number,
  public_repos: PropTypes.number,
  repos_url: PropTypes.string,
  starred_url: PropTypes.string,
  subscriptions_url: PropTypes.string,
  updated_at: PropTypes.string,
  gravatar_id: PropTypes.string,
  hireable: PropTypes.bool,
  html_url: PropTypes.string
});
