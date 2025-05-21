package com.example.socialmediaspringboot.service;


import com.example.socialmediaspringboot.Entity.Post;
import com.example.socialmediaspringboot.Entity.User;
import com.example.socialmediaspringboot.repository.PostRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class ServicePost implements IServicePost {

    PostRepo postRepo;
    ServiceUser serviceUser;
    public Post createPost(Post post, Long userId) {
        User user = serviceUser.getUserById(userId);
        post.setUser(user);
        return postRepo.save(post);
    }

    public Post getPostById(Long id) {
        return postRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    public List<Post> getPostsByUser(Long userId) {
        User user = serviceUser.getUserById(userId);
        return postRepo.findByUserOrderByCreatedAtDesc(user);
    }

    public Post updatePost(Long id, Post postDetails) {
        Post post = getPostById(id);
        post.setTitle(postDetails.getTitle());
        post.setDescription(postDetails.getDescription());
        return postRepo.save(post);
    }

    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }
}
