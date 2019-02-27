import axios from 'axios';
import actions from './actions';
import constants from './constants';

const { setUserNotifications } = actions;

const getAllNotificationUrl = `${process.env.API_URL}notifications`;

export const getUserNotification = () => dispatch => {
  const token = localStorage.getItem('token');
  const defaultOptions = {
    headers: {
      Authorization: token,
    },
  };
  return axios
    .get(getAllNotificationUrl, defaultOptions)
    .then(userNotifications => {
      dispatch(setUserNotifications(userNotifications));
    })
    .catch(({ response }) => {});
};

export default { getUserNotification };
