package com.low910.dinnergetter.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.low910.dinnergetter.models.User;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();
}