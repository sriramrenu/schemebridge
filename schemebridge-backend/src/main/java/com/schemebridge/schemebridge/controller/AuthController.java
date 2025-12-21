package com.schemebridge.schemebridge.controller;

import com.schemebridge.schemebridge.model.User;
import com.schemebridge.schemebridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ SIGN UP
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // For MVP: store password as-is
        // (Hashing can be added later)
        return userRepository.save(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {

        Optional<User> user = userRepository.findByEmailAndPassword(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (user.isPresent()) {
            return user.get(); // login success
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
