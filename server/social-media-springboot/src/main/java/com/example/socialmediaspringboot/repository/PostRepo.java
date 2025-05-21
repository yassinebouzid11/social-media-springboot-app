package com.example.socialmediaspringboot.repository;


import com.example.socialmediaspringboot.Entity.Post;
import com.example.socialmediaspringboot.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepo extends JpaRepository<Post,Long> {
    List<Post> findAllByOrderByCreatedAtDesc();
    List<Post> findByUserOrderByCreatedAtDesc(User user);
}
