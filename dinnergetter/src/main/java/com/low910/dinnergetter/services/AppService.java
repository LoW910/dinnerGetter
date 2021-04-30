package com.low910.dinnergetter.services;

import java.util.ArrayList;
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
    

    //======================================================================
    // creaet a recipe
    //======================================================================
    public Recipe createRecipe(Recipe r){
        return this.rRepo.save(r);
    }

    //======================================================================
    // get all recipes
    //======================================================================
    public List<Recipe> findAllRecipes(){
        return this.rRepo.findAll();
    }

    //======================================================================
    // find recipe by id
    //======================================================================
    public Recipe findRecipeById(Long id){
        return this.rRepo.findById(id).orElse(null);
    }

    //======================================================================
    // find a recipe by name
    //======================================================================
    public List<Recipe> findRecipeByName(String name){
        return this.rRepo.findByNameContaining(name);
    }


    //$$$$$$$$$$$$$$$$$$$$$$
	// INGREDIENT STUFF
	//$$$$$$$$$$$$$$$$$$$$$$
    
    //======================================================================
    // find an ingredient by id
    //======================================================================
    public Ingredient createIngredient(Ingredient ingredient){
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>> inside create ingredient App Service <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        Ingredient i = (Ingredient) this.findIngredientByName(ingredient.getName());
        if(i != null){
            return i;
        }
        return this.iRepo.save(ingredient);

    }
    //======================================================================
    // find an ingredient by id
    //======================================================================
    public List<Ingredient> findAllIngredients(){
        return this.iRepo.findAll();
    }
    //======================================================================
    // find an ingredient by id
    //======================================================================
    public Ingredient findIngredientByName(String name){
        return this.iRepo.findIngredientByName(name).orElse(null);
    }

    
    //======================================================================
    // find an ingredient by id
    //======================================================================
    public Ingredient findIngredientById(Long id) {
        return this.iRepo.findById(id).orElse(null);
    }
    
    
    
    //$$$$$$$$$$$$$$$$$$$$$$$$$$
	// USER STUFF  
	//$$$$$$$$$$$$$$$$$$$$$$$$$$

    //==================================================
    // find all users
    //==================================================
    public List<User> findAllUsers(){
        return this.uRepo.findAll();
    }

    //==================================================
    // find a user by email address
    //==================================================
    public User findUserByEmail(String email){
        return (User) this.uRepo.findUserByEmail(email).orElse(null);
    }
    
    //==================================================
    // find a user by id
    //==================================================
    public User findUserById(Long id){
        return this.uRepo.findById(id).orElse(null);
    }

    //==================================================
    // creates a user
    //==================================================
    public User createUser(User u){
        return this.uRepo.save(u);
    }


    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	// RELATIONSHIP STUFF  
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    //==================================================
    // add ingredent to a recipe
    //==================================================
    public Recipe addIngredientToRecipe(Long rId, Long iId){
        Recipe r = this.findRecipeById(rId);
        Ingredient i = this.findIngredientById(iId); 
        if(r != null) {
            r.getIngredients().add(i);
        }
        return this.rRepo.save(r);
    }

    //==================================================
    // add an ingredient to a users pantry
    //==================================================
    public boolean addIngredientToPantry(User u, Ingredient i){
        if(!u.getPantry().contains(i)){
            u.getPantry().add(i);
            this.uRepo.save(u);
            return true;
        }
        return false;
    }

    //==================================================
    // remove an ingredient from a users pantry
    //==================================================
    public void removeIngredientFromPantry(User u, Ingredient i){
        u.getPantry().remove(i);
        this.uRepo.save(u);
    }

    //==================================================
    // add ingredient to a users shopping list
    //==================================================
    public boolean addIngredientToShoppingList(User u, Ingredient i){
        if(!u.getShoppingList().contains(i)){
            u.getShoppingList().add(i);
            this.uRepo.save(u);
            return true;
        }
        return false;
    }

    //==================================================
    // adds an author to a recipe thats added to the database
    //==================================================
    public void addAuthorToRecipe(String email, Long rId){
        User u = this.findUserByEmail(email);
        Recipe r = this.findRecipeById(rId);
        r.setAuthor(u);
        this.rRepo.save(r);
    }

    //==================================================
    // saves a recipeto the users saved recipes
    //==================================================
    public void mySavedRecipe(String email, Long rId){
        User u = this.findUserByEmail(email);
        Recipe r = this.findRecipeById(rId);
        u.getSavedRecipes().add(r);
        this.uRepo.save(u);
    }

    //==================================================
    // removes an ingredient from a users shopping list
    //==================================================
    public int removeIngredientFromShoppingList(User u, Ingredient i){
        if(!u.getShoppingList().contains(i)){
            return -1;
        }
        int idx = u.getShoppingList().indexOf(i);
        u.getShoppingList().remove(i);
        this.uRepo.save(u);
        return idx;
    }

    //==================================================
    // update the order of user's list in database
    //==================================================
    public void saveListOrder(String uEmail, String[] ingredients){
        User u = this.findUserByEmail(uEmail);
        List<Ingredient> ordered = new ArrayList<Ingredient>();
        for(String i : ingredients){
            Ingredient nextIngredient = this.findIngredientByName(i);
            ordered.add(nextIngredient);
        }
        u.setShoppingList(ordered);
        this.uRepo.save(u);
    }


}
