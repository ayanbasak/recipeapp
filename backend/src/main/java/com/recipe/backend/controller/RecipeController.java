package com.recipe.backend.controller;

import com.recipe.backend.dto.IngredientDTO;
import com.recipe.backend.dto.LoginDTO;
import com.recipe.backend.dto.LoginSuccess;
import com.recipe.backend.entity.Ingredient;
import com.recipe.backend.entity.Recipe;
import com.recipe.backend.entity.User;
import com.recipe.backend.repository.IngredientRepository;
import com.recipe.backend.repository.RecipeRepository;
import com.recipe.backend.repository.UserRepository;
import com.recipe.backend.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RecipeController {

    @Autowired private UserRepository userRepository;

    @Autowired private FileService fileService;

    @Autowired private RecipeRepository recipeRepository;

    @Autowired private IngredientRepository ingredientRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        if(optionalUser.isPresent()){
            return new ResponseEntity<String>("invalid email", HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user);
        return new ResponseEntity<String>("user registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<User> optionalUser = userRepository.findByEmail(loginDTO.getEmail());
        if(!optionalUser.isPresent()){
            return new ResponseEntity<String>("invalid user", HttpStatus.BAD_REQUEST);
        }
        User user = optionalUser.get();
//        System.out.println("user.getPassword    "+ user.getPassword());
//        System.out.println("loginDTO.getPassword   "+ loginDTO.getPassword());
        System.out.println(user.getPassword().equals(loginDTO.getPassword()));
        if(!user.getPassword().equals(loginDTO.getPassword())){
            return new ResponseEntity<String>("invalid user", HttpStatus.BAD_REQUEST);
        }

        LoginSuccess loginSuccess = new LoginSuccess(true, user.getFirstname(), user.getLastname(), user.getId(), user.getEmail());
        return new ResponseEntity<LoginSuccess>(loginSuccess, HttpStatus.OK);
    }
/*
    @PostMapping(path = "/addrecipe22",
            consumes = {
                MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
            })
    public ResponseEntity<?> addrecipe22(@RequestPart("file") MultipartFile image,
                                        @RequestPart("recipe") RecipeDTO recipeDTO
//                                       @RequestPart("unit") String unit,
                                       ) {

//        @RequestBody List<Ingredient> ingredients,
//        @RequestParam("unit") String unit

        System.out.println("image : "+image.getOriginalFilename());
//        System.out.println("unit : "+unit);
        for (Ingredient ing:recipeDTO.getIngredients()) {
            System.out.println("Ingredient: "+ ing.toString());
        }
       return new ResponseEntity<String>("fffffff", HttpStatus.OK);
    }
 */

    @PostMapping("/addrecipe")
    public ResponseEntity<?> addrecipe(
            @RequestParam(value = "image") MultipartFile image,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "description") String description,
            @RequestParam(value = "user_id") long userId
    ) {
//        System.out.println("image : "+image.getOriginalFilename());
//        System.out.println("name : "+name);
//        System.out.println("description : "+description);

        String fileName = fileService.saveFile(image);
//        System.out.println("userId : "+userId);
        Recipe recipe = new Recipe();
        recipe.setDescription(description);
        recipe.setName(name);
        recipe.setImage(fileName);
        recipe.setUserId(userId);
        Recipe updatedRecipe = recipeRepository.save(recipe);

        return new ResponseEntity<Recipe>(updatedRecipe, HttpStatus.OK);
    }

    @PostMapping("/addingredients")
    public ResponseEntity<?> addingredients(@RequestBody IngredientDTO ingredientDTO) {
        System.out.println("RecipeId : "+ingredientDTO.getRecipeId());


        Optional<Recipe> optionalRecipe = recipeRepository.findById(ingredientDTO.getRecipeId());
        System.out.println("optionalRecipe : "+optionalRecipe.isPresent());
        System.out.println("ingredientDTO.getRecipeId() : "+ingredientDTO.getRecipeId());
        if(optionalRecipe.isPresent()){
            Recipe recipe = optionalRecipe.get();
            for (Ingredient ing: ingredientDTO.getIngredients()) {
                ing.setRecipe(recipe);
            }
            ingredientRepository.saveAll(ingredientDTO.getIngredients());
            return new ResponseEntity<String>("ingredients saved", HttpStatus.CREATED);
        }else{
            return new ResponseEntity<String>("Recipe is not present", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/recipe")
    public ResponseEntity<?> getRecipe(@RequestParam long recipeId) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(recipeId);
        if(optionalRecipe.isPresent()){
            Recipe recipe = optionalRecipe.get();
            recipe.setIngredients(null);
            recipe.setImage("/api/recipe/image/".concat(recipe.getImage()));
            return new ResponseEntity<Recipe>(recipe, HttpStatus.OK);
        }else{
            return new ResponseEntity<String>("Recipe is not present", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/ingredient")
    public ResponseEntity<?> getIngredient(@RequestParam long ingId) {
        Optional<Ingredient> optionalIngredient = ingredientRepository.findById(ingId);
        if(optionalIngredient.isPresent()){
            Ingredient ingredient = optionalIngredient.get();
            ingredient.setRecipe(null);
            return new ResponseEntity<Ingredient>(ingredient, HttpStatus.OK);
        }else{
            return new ResponseEntity<String>("Recipe is not present", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/recipes")
    public ResponseEntity<?> getRecipes(@RequestParam long userId) {
        List<Recipe> recipes = recipeRepository.findAllByUserId(userId);
        for(Recipe r: recipes){
            r.setImage("/api/recipe/image/".concat(r.getImage()));
            for(Ingredient i: r.getIngredients()){
                i.setRecipe(null);
            }
        }
        return new ResponseEntity<List<Recipe>>(recipes, HttpStatus.OK);
    }

    @DeleteMapping("/recipe")
    public ResponseEntity<?> removeRecipe(@RequestParam long recipeId) {
        recipeRepository.deleteById(recipeId);
        return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
    }

    @DeleteMapping("/ingredient")
    public ResponseEntity<?> removeIngredient(@RequestParam long ingredientId) {
        ingredientRepository.deleteById(ingredientId);
        return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
    }

    @GetMapping("/recipe/image/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = fileService.loadFileAsResource(fileName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping("/updateingredient")
    public ResponseEntity<?> updateingredient(@RequestBody Ingredient ingredient) {
        Optional<Ingredient> optionalIngredient = ingredientRepository.findById(ingredient.getIngredientId());
        Ingredient newIngredient = optionalIngredient.get();
        newIngredient.setName(ingredient.getName());
        newIngredient.setQuantity(ingredient.getQuantity());
        newIngredient.setUnit(ingredient.getUnit());
        ingredientRepository.save(newIngredient);
        return new ResponseEntity<String>("updated successfully", HttpStatus.OK);
    }

    @PostMapping("/updaterecipe")
    public ResponseEntity<?> updaterecipe(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "name") String name,
            @RequestParam(value = "id") long id,
            @RequestParam(value = "user_id") long userId,
            @RequestParam(value = "description") String description
    ) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        Recipe recipe = optionalRecipe.get();
        recipe.setName(name);
        recipe.setUserId(userId);
        recipe.setDescription(description);
        if(image != null){
            String fileName = fileService.saveFile(image);
            recipe.setImage(fileName);
        }
        recipeRepository.save(recipe);
        return new ResponseEntity<String>("updated successfully", HttpStatus.OK);
    }
}
