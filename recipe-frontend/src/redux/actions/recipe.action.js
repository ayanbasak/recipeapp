import { SET_RECIPES, REMOVE_RECIPE, REMOVE_INGREDIENT, SET_LOADING } from "../types/recipe.types";

export const setRecipes = (recipes) => ({
  type: SET_RECIPES,
  recipes
});

export const removeOldRecipe = (recipeId) => ({
    type: REMOVE_RECIPE,
    recipeId
});

export const removeRecipeIngredient = (data) => ({
    type: REMOVE_INGREDIENT,
    data
});

export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    isLoading
});