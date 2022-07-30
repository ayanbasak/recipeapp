import { SET_LOADER_ACTIVE, SET_LOADER_DEACTIVE } from "../types/loader.types";

const initialState = {
    isLoading: false,
};

export default (state = initialState, action) => {
  //   console.log("reducer >>>> " + JSON.stringify(action));
  switch (action.type) {   
    case SET_LOADER_ACTIVE:
        return { isLoading: true};
    case SET_LOADER_DEACTIVE:
        return { isLoading: false};
    default:
      return state;
  }
};
