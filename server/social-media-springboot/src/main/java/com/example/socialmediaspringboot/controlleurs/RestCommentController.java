package com.example.socialmediaspringboot.controlleurs;


import com.example.socialmediaspringboot.Entity.Comment;
import com.example.socialmediaspringboot.service.IServiceComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comments")
@CrossOrigin(origins = "http://localhost:3000")
public class RestCommentController {
    @Autowired
    IServiceComment iServiceComment;

    @GetMapping("/{id}")
    public ResponseEntity<List<Comment>> getCommentByPost(@PathVariable Long id) {
        return ResponseEntity.ok(iServiceComment.getCommentsByPost(id));
    }

    @PostMapping("/{postId}/{userId}")
    public ResponseEntity<Comment> createComment(
            @RequestBody Comment comment,
            @PathVariable Long postId,
            @PathVariable Long userId) {
        return ResponseEntity.ok(iServiceComment.createComment(postId, userId, comment));
    }
}
