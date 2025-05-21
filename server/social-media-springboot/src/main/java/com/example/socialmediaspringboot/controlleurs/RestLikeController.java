package com.example.socialmediaspringboot.controlleurs;


import com.example.socialmediaspringboot.Entity.Like;
import com.example.socialmediaspringboot.service.IServiceLike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("likes")
@CrossOrigin(origins = "http://localhost:3000")
public class RestLikeController {
    @Autowired
    IServiceLike iServiceLike;

    @PostMapping("add/{postId}/{userId}")
    public ResponseEntity<Like> addLike(
            @PathVariable Long postId,
            @PathVariable Long userId) {
        return ResponseEntity.ok(iServiceLike.likePost(postId,userId));
    }

    @PostMapping("delete/{postId}/{userId}")
    public ResponseEntity<Void> removeLike(
            @PathVariable Long postId,
            @PathVariable Long userId) {
        iServiceLike.unlikePost(postId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count/{postId}")
    public ResponseEntity<Integer> getLikeCount(@PathVariable Long postId) {
        return ResponseEntity.ok(iServiceLike.getLikeCount(postId));
    }

    @GetMapping("/hasliked/{postId}/{userId}")
    public ResponseEntity<Boolean> hasUserLikedPost(
            @PathVariable Long postId,
            @PathVariable Long userId) {
        return ResponseEntity.ok(
                iServiceLike.hasUserLikedPost(postId, userId)
        );
    }

}
