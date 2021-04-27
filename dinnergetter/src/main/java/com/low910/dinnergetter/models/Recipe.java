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
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="recipes")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class, 
    property = "id")
public class Recipe {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String name;

    private String steps;

    @Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;
    
    //======================================================================
	// relationship for recipes created by a user  
	//======================================================================
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User author;

    //======================================================================
	// many-to-many USERS saved RECIPES
	//======================================================================
    @ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
		name = "users_saved_recipes",
		joinColumns = @JoinColumn(name = "recipe_id"),
		inverseJoinColumns = @JoinColumn(name = "user_id")
    )
	private List<User> usersWhoSavedThis;

    //======================================================================
	// many-to-many RECIPE that includes INGREDIENTS
	//======================================================================
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "recipes_ingredients",
        joinColumns = @JoinColumn(name = "recipe_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> ingredients;
    


    @PrePersist
    protected void onCreate(){
        Date now = new Date();
        this.createdAt = now;
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }



    public Recipe(){}


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

    public String getSteps() {
        return steps;
    }
    public void setSteps(String steps) {
        this.steps = steps;
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

    public User getAuthor() {
        return this.author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public List<User> getUsersWhoSavedThis() {
        return this.usersWhoSavedThis;
    }

    public void setUsersWhoSavedThis(List<User> usersWhoSavedThis) {
        this.usersWhoSavedThis = usersWhoSavedThis;
    }

    public List<Ingredient> getIngredients() {
        return this.ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

}
