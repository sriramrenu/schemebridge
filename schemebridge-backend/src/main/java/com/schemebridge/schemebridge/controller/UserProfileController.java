package com.schemebridge.schemebridge.controller;

import com.schemebridge.schemebridge.model.User;
import com.schemebridge.schemebridge.model.UserProfile;
import com.schemebridge.schemebridge.repository.UserProfileRepository;
import com.schemebridge.schemebridge.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class UserProfileController {

    @Autowired
    private UserProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{userId}")
    public UserProfile saveProfile(
            @PathVariable Long userId,
            @RequestBody UserProfile req
    ) {
        // 1️⃣ Validate user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Fetch existing profile OR create new
        UserProfile profile =
                profileRepository.findByUserId(userId);

        if (profile == null) {
            profile = new UserProfile();
        }

        // 3️⃣ MANUAL FIELD MAPPING (SAFE & EXPLICIT)

        profile.setUser(user);

        profile.setAge(req.getAge());
        profile.setGender(req.getGender());
        profile.setCategory(req.getCategory());
        profile.setCaste(req.getCaste());
        profile.setLocation(req.getLocation());

        profile.setTenthMarks(req.getTenthMarks());
        profile.setTwelfthMarks(req.getTwelfthMarks());
        profile.setCourse(req.getCourse());

        profile.setFamilyIncome(req.getFamilyIncome());
        profile.setParentOccupation(req.getParentOccupation());

        profile.setDisability(req.getDisability());
        profile.setMinority(req.getMinority());

        // 🔥 CRITICAL LINE (DB SAFETY)
        profile.setIncome(
                req.getFamilyIncome() != null
                        ? req.getFamilyIncome()
                        : req.getIncome()
        );

        // 4️⃣ Save safely
        return profileRepository.save(profile);
    }

    @GetMapping("/{userId}")
    public UserProfile getProfile(@PathVariable Long userId) {
        return profileRepository.findByUserId(userId);
    }
}
