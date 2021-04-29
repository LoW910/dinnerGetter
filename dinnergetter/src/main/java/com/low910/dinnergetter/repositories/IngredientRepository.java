package com.low910.dinnergetter.repositories;

import java.util.List;
import java.util.Optional;

import com.low910.dinnergetter.models.Ingredient;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IngredientRepository extends CrudRepository<Ingredient, Long> {
    List<Ingredient> findAll();
    Optional<Ingredient> findIngredientByName(String name);
}