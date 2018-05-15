import PropTypes from 'prop-types';

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
  resumes: PropTypes.object.isRequired,
}).isRequired;

export const AppStorePropTypes = PropTypes.shape({
  isResumesOpened: PropTypes.bool.isRequired,
  sidebar: PropTypes.bool.isRequired,
  openResume: PropTypes.func.isRequired,
  closeResume: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}).isRequired;

export const RoutingStorePropTypes = PropTypes.shape({
  go: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}).isRequired;

export const AntdFormPropTypes = PropTypes.shape({
  setFieldsValue: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  getFieldsValue: PropTypes.func.isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
}).isRequired;
