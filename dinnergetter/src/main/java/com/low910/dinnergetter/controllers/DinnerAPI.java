package com.low910.dinnergetter.controllers;

import java.util.List;

import com.low910.dinnergetter.models.Ingredient;
import com.low910.dinnergetter.models.Recipe;
import com.low910.dinnergetter.models.User;
import com.low910.dinnergetter.services.AppService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
@CrossOrigin("http://localhost:3000")

public class DinnerAPI {
    private final AppService serv;

    public DinnerAPI(AppService s){
        this.serv = s;
    }
    
    //======================================================================
	// Recipes  
	//======================================================================

    @GetMapping("recipes")
    public List<Recipe> allRecipes(){
        return this.serv.findAllRecipes();
    }

    @PostMapping("recipes/create")
    public Recipe createRecipe(@RequestParam("name") String name, @RequestParam("steps") String steps){
        Recipe r = new Recipe();
        r.setName(name);
        r.setSteps(steps);
        return this.serv.createRecipe(r);
    }

    @PostMapping("recipes/search/name")
    public List<Recipe> findRecipeByName(@RequestBody Recipe recipe ){
        
        System.out.println("&&&&&&&&&&&&&&&&&&&&&&&&&&&" + recipe.getName());
        System.out.println("============================"+ recipe.getName() );
        return this.serv.findRecipeByName(recipe.getName());
    }

    @GetMapping("recipes/{rId}")
    public Recipe findRecipeById(@PathVariable("rId") Long rId){
        return this.serv.findRecipeById(rId);
    }

    //======================================================================
	// Ingredients  
	//======================================================================

    @GetMapping("ingredients")
    public List<Ingredient> findAllIngredients() {
        return this.serv.findAllIngredients();
    }

    @PostMapping("ingredients/create")
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) { 
        return this.serv.createIngredient(ingredient);
    }

    @GetMapping("ingredients/{iId}")
    public Ingredient findIngredientById(@PathVariable("iId") Long iId){
        return this.serv.findIngredientById(iId);
    }

    @PostMapping("ingredients/addtopantry")
    public boolean addIngredientToPantry(@RequestBody Ingredient ingredient){

        Ingredient i = this.serv.createIngredient(ingredient);
        User u = this.serv.findUserByEmail(ingredient.getDummyUserEmail());

        return this.serv.addIngredientToPantry(u, i);
        // System.out.println(i.getName());
        // System.out.println(this.serv.createIngredient(i));
        // User u = this.serv.findUserByEmail(ingredient.getDummyUserEmail());
        // System.out.println(u.getEmail());
        // System.out.println(i.getName());

        // if(u == null || i == null) return;
        // this.serv.addIngredientToPantry(u, i);
    }

    @PostMapping("ingredients/removefrompantry")
    public void removeIngredientFromPantry(@RequestBody Ingredient ingredient){
        Ingredient i = this.serv.findIngredientByName(ingredient.getName());
        User u = this.serv.findUserByEmail(ingredient.getDummyUserEmail());

        this.serv.removeIngredientFromPantry(u, i);
    }


    //======================================================================
	// Users  
	//======================================================================

    @GetMapping("users")
    public List<User> findAllUsers(){
        return serv.findAllUsers();
    }


    @PostMapping("/users/checkdb")  //god damn! POS(&!^*@^!@&^&)  change to user instead of string
    public User checkIfUserExistsAlready(@RequestBody User user){
        System.out.println("%%%%%%%%%% email: "+ user.getEmail());
        User u = this.serv.findUserByEmail(user.getEmail());
        if(u != null){
            return u;
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        return this.serv.createUser(newUser);
        
    }




    //======================================================================
	// COMBINING THINGS
	//======================================================================

    @PostMapping("/recipes/{rId}/ingredients/{iId}/add")
    public Recipe addIngredientToRecipe(@PathVariable("rId") Long rId, @PathVariable("iId") Long iId){
        return this.serv.addIngredientToRecipe(rId, iId);
    }

}
