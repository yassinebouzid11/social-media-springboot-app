package com.example.socialmediaspringboot.repository;


import com.example.socialmediaspringboot.Entity.Comment;
import com.example.socialmediaspringboot.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment,Long> {

    List<Comment> findByPostOrderByCreatedAtAsc(Post post);
}
