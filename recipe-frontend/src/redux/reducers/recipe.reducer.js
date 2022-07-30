import { SET_RECIPES, REMOVE_RECIPE, REMOVE_INGREDIENT, SET_LOADING } from "../types/recipe.types";

const initialState = {
    loading: false,
    recipes:[]
};

export default (state = initialState, action) => {
  //   console.log("reducer >>>> " + JSON.stringify(action));
  switch (action.type) {
    case SET_RECIPES:
      return {...state, recipes:action.recipes, loading: false};

    case REMOVE_RECIPE:
      let updatedRecipes = state.recipes.filter(recipe => recipe.id !== action.recipeId)
    //   console.log("updatedRecipes >>>> " + JSON.stringify(updatedRecipes));
      return {...state, recipes: updatedRecipes, loading: false};

    case REMOVE_INGREDIENT:
        let recipe = state.recipes.find(rec => rec.id === action.data.recipeId);
        let ings = recipe.ingredients.filter(rec => rec.ingredientId !== action.data.ingredientId);
        recipe = {...recipe, ingredients: ings}

        let newRecipes = []
        state.recipes.forEach(rec => {
            if(rec.id === action.data.recipeId){
                newRecipes = [...newRecipes, recipe]
            }else{
                newRecipes = [...newRecipes, rec]
            }
        });

       return {...state, recipes: newRecipes, loading: false};

    case SET_LOADING:
        return {...state, loading: action.isLoading};
    default:
      return state;
  }
};
