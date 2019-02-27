import types from './types';

const setUserNotifications = notification => ({
  type: types.VIEW_USER_NOTIFICATION,
  notification,
});

export default {
  setUserNotifications,
};
