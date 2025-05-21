package com.example.socialmediaspringboot.service;


import com.example.socialmediaspringboot.Entity.Like;
import com.example.socialmediaspringboot.Entity.Post;
import com.example.socialmediaspringboot.Entity.User;
import com.example.socialmediaspringboot.repository.LikeRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ServiceLike implements IServiceLike {

    LikeRepo likeRepo;
    ServicePost servicePost;
    ServiceUser serviceUser;

    public Like likePost(Long postId, Long userId) {
        Post post = servicePost.getPostById(postId);
        User user = serviceUser.getUserById(userId);

        // Check if user already liked the post
        if (likeRepo.existsByPostAndUser(post, user)) {
            throw new RuntimeException("You already liked this post");
        }

        Like like = new Like();
        like.setPost(post);
        like.setUser(user);

        return likeRepo.save(like);
    }

    public void unlikePost(Long postId, Long userId) {
        Post post = servicePost.getPostById(postId);
        User user = serviceUser.getUserById(userId);

        Like like = likeRepo.findByPostAndUser(post, user)
                .orElseThrow(() -> new RuntimeException("Like not found"));

        likeRepo.delete(like);
    }

    public int getLikeCount(Long postId) {
        Post post = servicePost.getPostById(postId);
        return likeRepo.countByPost(post);
    }
    public boolean hasUserLikedPost(Long postId, Long userId) {
        Post post = servicePost.getPostById(postId);
        User user = serviceUser.getUserById(userId);
        return likeRepo.existsByPostAndUser(post, user);
    }

}
