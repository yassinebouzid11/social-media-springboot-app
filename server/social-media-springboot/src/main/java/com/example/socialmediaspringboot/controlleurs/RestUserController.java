package com.example.socialmediaspringboot.controlleurs;


import com.example.socialmediaspringboot.Entity.User;
import com.example.socialmediaspringboot.service.IServiceUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = "http://localhost:3000")
public class RestUserController {

    @Autowired
    IServiceUser iServiceUser;

    @GetMapping("all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(iServiceUser.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(iServiceUser.getUserById(id));
    }

    @GetMapping("/email")
    public ResponseEntity<Optional<User>> getUserByEmail(@RequestBody String email) {
        return ResponseEntity.ok(iServiceUser.getUserByEmail(email));
    }
    @PostMapping("add")
    public void addUser(@RequestBody User user){
        iServiceUser.createUser(user);
    }


}
