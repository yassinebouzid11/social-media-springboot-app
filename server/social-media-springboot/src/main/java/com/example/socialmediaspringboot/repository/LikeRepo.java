package com.example.socialmediaspringboot.repository;


import com.example.socialmediaspringboot.Entity.Like;
import com.example.socialmediaspringboot.Entity.Post;
import com.example.socialmediaspringboot.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepo extends JpaRepository<Like,Long> {
    Optional<Like> findByPostAndUser(Post post, User user);
    int countByPost(Post post);
    boolean existsByPostAndUser(Post post, User user);
}
