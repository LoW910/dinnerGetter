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
    
    public Ingredient createIngredient(Ingredient ingredient){
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>> inside create ingredient <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        Ingredient i = (Ingredient) this.findIngredientByName(ingredient.getName());
        if(i != null){
            return i;
        }
        return this.iRepo.save(ingredient);

    }
    public List<Ingredient> findAllIngredients(){
        return this.iRepo.findAll();
    }
    public Ingredient findIngredientByName(String name){
        return this.iRepo.findIngredientByName(name).orElse(null);
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
    public User findUserById(Long id){
        return this.uRepo.findById(id).orElse(null);
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

    public boolean addIngredientToPantry(User u, Ingredient i){
        if(!u.getPantry().contains(i)){
            u.getPantry().add(i);
            this.uRepo.save(u);
            return true;
        }
        return false;
    }

    public void removeIngredientFromPantry(User u, Ingredient i){
        System.out.println("************************************************************************************************************************************************************************");
        u.getPantry().remove(i);
        this.uRepo.save(u);
    }

    public void addAuthorToRecipe(String email, Long rId){
        User u = this.findUserByEmail(email);
        Recipe r = this.findRecipeById(rId);
        r.setAuthor(u);
        this.rRepo.save(r);
    }




}
