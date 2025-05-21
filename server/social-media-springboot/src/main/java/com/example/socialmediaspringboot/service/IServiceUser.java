package com.example.socialmediaspringboot.service;



import com.example.socialmediaspringboot.Entity.User;

import java.util.List;
import java.util.Optional;

public interface IServiceUser {

    public User createUser(User user);
    public User getUserById(Long id);
    public List<User> getAllUsers();
    public Optional<User> getUserByEmail(String email);
    public void deleteUser(Long id);
    public User updateUser(User user);
}
