package com.low910.dinnergetter.repositories;

import java.util.List;
import java.util.Optional;

import com.low910.dinnergetter.models.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();
    Optional<User> findUserByEmail(String email);
}