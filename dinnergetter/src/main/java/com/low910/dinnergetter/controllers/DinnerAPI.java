package com.low910.dinnergetter.controllers;

import java.util.List;

import com.low910.dinnergetter.models.Recipe;
import com.low910.dinnergetter.services.AppService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")

public class DinnerAPI {
    private final AppService serv;

    public DinnerAPI(AppService s){
        this.serv = s;
    }
    
    @GetMapping("recipes")
    public List<Recipe> allRecipes(){
        return this.serv.findAllRecipes();
    }

    @PostMapping("recipes/create")
    public Recipe createRecipe(){
        return null;

    }

}
