const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  console.log(state);
  return state;
}
