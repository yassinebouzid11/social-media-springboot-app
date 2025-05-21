package com.example.socialmediaspringboot;

import com.example.socialmediaspringboot.repository.*;
import com.example.socialmediaspringboot.Entity.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.time.LocalDateTime;


@SpringBootApplication
public class SocialMediaSpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SocialMediaSpringbootApplication.class, args);
    }
    CommandLineRunner commandLineRunner(UserRepo us, PostRepo po, LikeRepo li, CommentRepo co) {
        return args -> {
           /* User user1 = new User();
            user1.setUsername("yassine");
            user1.setEmail("bouzidyassine08@gmail.com");
            user1.setPassword("0000");
            user1.setCreatedAt(LocalDateTime.now());

            us.save(user1);

            Post post1 = new Post();
            post1.setTitle("My First Post");
            post1.setDescription("Hello everyone! This is my first post on this platform.");
            post1.setUser(user1);
            post1.setCreatedAt(LocalDateTime.now().minusDays(2));

            po.save(post1);

            Comment comment1 = new Comment();
            comment1.setText("Welcome to the platform!");
            comment1.setPost(post1);
            comment1.setUser(user1);
            comment1.setCreatedAt(LocalDateTime.now().minusDays(1));

            co.save(comment1);

            Like like1 = new Like();
            like1.setPost(post1);
            like1.setUser(user1);

            li.save(like1);
            us.findAll().forEach(System.out::println);*/
        };
    }

}
