package com.low910.dinnergetter.controllers;

import java.util.List;

import com.low910.dinnergetter.models.Ingredient;
import com.low910.dinnergetter.models.Recipe;
import com.low910.dinnergetter.models.User;
import com.low910.dinnergetter.services.AppService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/")

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

    @GetMapping("recipes/{rId}")
    public Recipe findRecipeById(@PathVariable("rId") Long rId){
        return this.serv.findRecipeById(rId);
    }


    //======================================================================
	// Ingredients  
	//======================================================================

    @GetMapping("/ingredients")
    public List<Ingredient> findAllIngredients() {
        return this.serv.findAllIngredients();
    }

    @PostMapping("ingredients/create")
    public Ingredient addIngredient(@RequestParam("name") String name) {
        Ingredient i = new Ingredient();
        i.setName(name);
        return this.serv.createIngredient(i);
    }

    @GetMapping("ingredients/{iId}")
    public Ingredient findIngredientById(@PathVariable("iId") Long iId){
        return this.serv.findIngredientById(iId);
    }


    //======================================================================
	// Users  
	//======================================================================

    @GetMapping("users")
    public List<User> findAllUsers(){
        return serv.findAllUsers();
    }




    //======================================================================
	// COMBINING THINGS
	//======================================================================

    @PostMapping("/recipes/{rId}/ingredients/{iId}/add")
    public Recipe addIngredientToRecipe(@PathVariable("rId") Long rId, @PathVariable("iId") Long iId){
        return this.serv.addIngredientToRecipe(rId, iId);
    }

}
