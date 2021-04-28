package com.low910.dinnergetter.services;

import java.util.List;

import com.low910.dinnergetter.models.Ingredient;
import com.low910.dinnergetter.models.Recipe;
import com.low910.dinnergetter.models.User;
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
    public List<Recipe> findRecipeByName(String name){
        return this.rRepo.findByNameContaining(name);
    }


    //======================================================================
	// INGREDIENT STUFF
	//======================================================================
    
    public Ingredient createIngredient(Ingredient i){
        return this.iRepo.save(i);
    }
    public List<Ingredient> findAllIngredients(){
        return this.iRepo.findAll();
    }
    
    public Ingredient findIngredientById(Long id) {
        return this.iRepo.findById(id).orElse(null);
    }
    
    
    //======================================================================
	// USER STUFF  
	//======================================================================
    public List<User> findAllUsers(){
        return this.uRepo.findAll();
    }
    public User findUserByEmail(String email){
        return (User) this.uRepo.findUserByEmail(email).orElse(null);
    }
    public User createUser(User u){
        return this.uRepo.save(u);
    }
    



    //======================================================================
	// RELATIONSHIP STUFF  
	//======================================================================
    public Recipe addIngredientToRecipe(Long rId, Long iId){
        Recipe r = this.findRecipeById(rId);
        Ingredient i = this.findIngredientById(iId); 

        if(r != null) {
            r.getIngredients().add(i);
        }
        return this.rRepo.save(r);
    }






}
