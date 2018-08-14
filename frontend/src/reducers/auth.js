const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOGIN':
      const { username, password } = action.payload;
      console.log(username, password);
      break;
    case 'LOGOUT':
      console.log('logout');
      break;
    default:
      break;
  }
  return state;
}

export default authReducer;