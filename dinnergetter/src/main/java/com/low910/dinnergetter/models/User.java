package com.low910.dinnergetter.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="users")
@JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class, 
    property = "id")

public class User {
	
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)           //keep
    private Long id;

	// @NotEmpty(message = "First name cannot be empty")           // remove
    private String firstName;

	// @NotEmpty(message = "Last name cannot be empty")            //remove
    private String lastName;

	// // @NotEmpty(message = "Email cannot be empty")                // possibly redundant?
	@Email(message = "Email must be valid")                     // keep
	@Column(unique = true)
	private String email;

	// @NotEmpty(message="city is required!")                     //remove
    // @Size(min=2, max=30, message="City must be between 2 and 30 characters") // remove
    private String city;

	// @NotEmpty(message="location is required!")                //remove  
	// @Size(min=2, max=2, message="State must be between 2 characters")   //remove
	private String state;

    // @Size(min = 5, message = "Password must be greater than 5 characters") //remove
    // private String password;                                        //remove

    // @NotEmpty(message = "Cannot be left empty")                 //remove
    // @Transient                                                  //remove
    // private String passwordConfirmation;                        // remove

    @Column(updatable=false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;
    
	//======================================================================
	// relationship for recipes created by a user  
	//======================================================================
	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	List<Recipe> addedRecipes;

    
	//======================================================================
	// many-to-many USERS saved RECIPES
	//======================================================================
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
		name = "users_saved_recipes",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "recipe_id")
		)
	private List<Recipe> savedRecipes;


	//======================================================================
	// many to many USERS who have INGREDIENTS (pantry)
	//======================================================================
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_have_ingredients",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> pantry;


    //======================================================================
	// many to many USERS who have INGREDIENTS (pantry)
	//======================================================================
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "users_ingredients_shopping",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> shoppingList;

    
    public User() {
    }
    
    

    @PrePersist
    protected void onCreate(){
        Date now = new Date();
        this.createdAt = now;
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }



    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
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

    public List<Recipe> getAddedRecipes() {
        return this.addedRecipes;
    }

    public void setAddedRecipes(List<Recipe> addedRecipes) {
        this.addedRecipes = addedRecipes;
    }

    public List<Recipe> getSavedRecipes() {
        return this.savedRecipes;
    }

    public void setSavedRecipes(List<Recipe> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    public List<Ingredient> getPantry() {
        return this.pantry;
    }

    public void setPantry(List<Ingredient> pantry) {
        this.pantry = pantry;
    }

    public List<Ingredient> getShoppingList() {
        return this.shoppingList;
    }

    public void setShoppingList(List<Ingredient> shoppingList) {
        this.shoppingList = shoppingList;
    }

}