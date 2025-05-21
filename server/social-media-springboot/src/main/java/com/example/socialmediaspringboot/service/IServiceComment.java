package com.example.socialmediaspringboot.service;



import com.example.socialmediaspringboot.Entity.Comment;

import java.util.List;

public interface IServiceComment {
    public Comment createComment(Long postId, Long userId, Comment comment);
    public List<Comment> getCommentsByPost(Long postId);

    public void deleteComment(Long id);
}
