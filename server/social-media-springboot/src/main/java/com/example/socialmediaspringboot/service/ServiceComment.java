package com.example.socialmediaspringboot.service;


import com.example.socialmediaspringboot.Entity.Comment;
import com.example.socialmediaspringboot.Entity.Post;
import com.example.socialmediaspringboot.Entity.User;
import com.example.socialmediaspringboot.repository.CommentRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@AllArgsConstructor
public class ServiceComment implements IServiceComment {

    CommentRepo commentRepo;
    ServiceUser serviceUser;
    ServicePost servicePost;

    public Comment createComment(Long postId, Long userId, Comment comment) {
        Post post = servicePost.getPostById(postId);
        User user = serviceUser.getUserById(userId);

        comment.setPost(post);
        comment.setUser(user);

        return commentRepo.save(comment);
    }

    public List<Comment> getCommentsByPost(Long postId) {
        Post post = servicePost.getPostById(postId);
        return commentRepo.findByPostOrderByCreatedAtAsc(post);
    }

    public void deleteComment(Long id){
        commentRepo.deleteById(id);
    }
}
