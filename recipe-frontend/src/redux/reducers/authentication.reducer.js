import { SET_AUTHENTICATION, SET_FORM_LOADING } from "../types/authentication.types";

const initialState = {
  firstname: '', 
  lastname: '',  
  userId: null,  
  userEmail: '',  
  isAuthenticated: false,
  isLoading: false
};

export default (state = initialState, action) => {
  //   console.log("reducer >>>> " + JSON.stringify(action));
  switch (action.type) {
    case SET_AUTHENTICATION:
      // const { firstname, lastname, userId, userEmail, isAuthenticated } = action.authenticationData;
      return {...action.authenticationData, isLoading: false};

    case SET_FORM_LOADING:
      return {...state, isLoading: action.isLoading};
    default:
      return state;
  }
};
