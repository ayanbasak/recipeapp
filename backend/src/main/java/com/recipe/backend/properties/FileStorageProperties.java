package com.recipe.backend.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {
    private String recipePhotoDir;

    public String getRecipePhotoDir() {
        return recipePhotoDir;
    }

    public void setRecipePhotoDir(String recipePhotoDir) {
        this.recipePhotoDir = recipePhotoDir;
    }
}
