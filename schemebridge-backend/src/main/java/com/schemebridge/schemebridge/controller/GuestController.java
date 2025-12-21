package com.schemebridge.schemebridge.controller;

import com.schemebridge.schemebridge.model.UserProfile;
import com.schemebridge.schemebridge.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/guest")
@CrossOrigin(origins = "*")
public class GuestController {

    @Autowired
    private UserProfileRepository profileRepository;

    @PostMapping("/profile")
    public UserProfile createGuestProfile(@RequestBody UserProfile profile) {
        profile.setUser(null); // guest user (no login)
        return profileRepository.save(profile);
    }
}
