package com.schemebridge.schemebridge.repository;

import com.schemebridge.schemebridge.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    // ✅ Used for create/update profile logic
    UserProfile findByUserId(Long userId);

    // ✅ Safer variant (optional but recommended)
    Optional<UserProfile> findOptionalByUserId(Long userId);
}
