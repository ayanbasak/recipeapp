package com.recipe.backend.dto;

import com.recipe.backend.entity.Ingredient;

import java.util.List;

public class IngredientDTO {
    private Long recipeId;
    private List<Ingredient> ingredients;

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    @Override
    public String toString() {
        return "IngredientDTO{" +
                "recipeId=" + recipeId +
                ", ingredients=" + ingredients +
                '}';
    }
}
