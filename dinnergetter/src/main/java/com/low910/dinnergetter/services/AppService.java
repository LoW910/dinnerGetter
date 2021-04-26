package com.low910.dinnergetter.services;

import java.util.List;

import com.low910.dinnergetter.models.Recipe;
import com.low910.dinnergetter.repositories.IngredientRepository;
import com.low910.dinnergetter.repositories.RecipeRepository;
import com.low910.dinnergetter.repositories.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class AppService {
    private final UserRepository uRepo;
    private final IngredientRepository iRepo;
    private final RecipeRepository rRepo;

    public AppService(UserRepository uRepo, IngredientRepository iRepo, RecipeRepository rRepo){
        this.uRepo = uRepo;
        this.iRepo = iRepo;
        this.rRepo = rRepo;
    }

    //======================================================================
	// RECIPE STUFF
	//======================================================================
    
    public Recipe createRecipe(Recipe r){
        return this.rRepo.save(r);
    }
    public List<Recipe> findAllRecipes(){
        return this.rRepo.findAll();
    }
    public Recipe findRecipeById(Long id){
        return this.rRepo.findById(id).orElse(null);
    }

}
