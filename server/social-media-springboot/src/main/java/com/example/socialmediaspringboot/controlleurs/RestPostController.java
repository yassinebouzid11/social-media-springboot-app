package com.example.socialmediaspringboot.controlleurs;


import com.example.socialmediaspringboot.Entity.Post;
import com.example.socialmediaspringboot.service.IServicePost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("posts")
@CrossOrigin(origins = "http://localhost:3000")
public class RestPostController {
    @Autowired
    IServicePost iServicePost;

    @GetMapping("all")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(iServicePost.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(iServicePost.getPostById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(iServicePost.getPostsByUser(userId));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Post> createPostWithUser(
            @RequestBody Post post,
            @PathVariable Long userId) {
        return ResponseEntity.ok(iServicePost.createPost(post, userId));
    }
}
