package com.schemebridge.schemebridge.controller;

import com.schemebridge.schemebridge.model.User;
import com.schemebridge.schemebridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Create new user (Sign Up)
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // ✅ (Optional but useful) Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
