package com.example.socialmediaspringboot.service;


import com.example.socialmediaspringboot.Entity.User;
import com.example.socialmediaspringboot.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ServiceUser implements IServiceUser {

    UserRepo userRepo;

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public User getUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
