import actions from "./../actions/userActions"

const userState = {
    user: {
      id: null,
      login: null,
      password: null
    },
};
  
const userReducer = (state = userState, action) => {
    switch (action.type) {
      case actions.setUser:
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  