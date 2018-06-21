const DEFAULT_STATE = {
  authenticated: false,
  avatar: '',
  username: '',
};
const auth = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'AUTH_STATUS':
      return Object.assign({}, state, {
        authenticated: action.authenticated,
        avatar: action.avatar,
        username: action.username,
      });
    case 'EXIT':
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default auth;
