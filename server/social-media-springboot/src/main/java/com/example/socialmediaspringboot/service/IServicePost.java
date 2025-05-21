package com.example.socialmediaspringboot.service;



import com.example.socialmediaspringboot.Entity.Post;

import java.util.List;

public interface IServicePost {

    public Post createPost(Post post, Long userId);
    public Post getPostById(Long id);
    public List<Post> getAllPosts();
    public List<Post> getPostsByUser(Long userId);
    public Post updatePost(Long id, Post postDetails);
    public void deletePost(Long id);
}
