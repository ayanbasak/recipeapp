import authenticationReducer from "./authentication.reducer";
import { combineReducers } from "redux";
import recipeReducer from "./recipe.reducer";
import loaderReducer from "./loader.reducer";

const rootReducer = combineReducers({
    authorization: authenticationReducer,
    recipes: recipeReducer,
    loader: loaderReducer
});

export default rootReducer;