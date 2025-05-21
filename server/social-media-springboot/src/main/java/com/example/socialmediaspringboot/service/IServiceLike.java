package com.example.socialmediaspringboot.service;


import com.example.socialmediaspringboot.Entity.Like;

public interface IServiceLike {
    public Like likePost(Long postId, Long userId);
    public void unlikePost(Long postId, Long userId);
    public int getLikeCount(Long postId);
    public boolean hasUserLikedPost(Long postId, Long userId);
}
