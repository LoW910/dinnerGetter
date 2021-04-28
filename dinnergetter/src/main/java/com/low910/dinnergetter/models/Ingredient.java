package com.low910.dinnergetter.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="ingredients")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class, 
    property = "id")
@JsonIgnoreProperties({"usersWhoHaveThis", "usersWhoPutThisOnList"})
public class Ingredient {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

	@NotEmpty
    private String name;

    @Column(updatable=false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;

    //======================================================================
	// many-to-many INGREDIENTS included in RECIPES
	//======================================================================
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "recipes_ingredients",
        joinColumns = @JoinColumn(name = "ingredient_id"),
        inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    private List<Recipe> recipes;

    //======================================================================
	// many-to-many INGREDIENTS in the pantry of USERS
	//======================================================================
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_have_ingredients",
        joinColumns = @JoinColumn(name = "ingredient_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> usersWhoHaveThis;


    //======================================================================
	// many-to-many INGREDIENTS in the pantry of USERS
	//======================================================================
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_ingredients_shopping",
        joinColumns = @JoinColumn(name = "ingredient_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> usersWhoPutThisOnList;

    
    


    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }





    public Ingredient(){}




    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Recipe> getRecipes() {
        return this.recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    
    public List<User> getUsersWhoHaveThis() {
        return this.usersWhoHaveThis;
    }

    public void setUsersWhoHaveThis(List<User> usersWhoHaveThis) {
        this.usersWhoHaveThis = usersWhoHaveThis;
    }


    


}
