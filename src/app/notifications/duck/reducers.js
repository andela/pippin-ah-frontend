import types from './types';

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case types.VIEW_USER_NOTIFICATION: {
      const { notification } = action;
      return {
        ...state,
        notification,
      };
    }

    default:
      return state;
  }
};

export default notificationReducer;
