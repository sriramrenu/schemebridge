package com.schemebridge.schemebridge.controller;

import com.schemebridge.schemebridge.model.EligibilityRule;
import com.schemebridge.schemebridge.model.Scheme;
import com.schemebridge.schemebridge.model.UserProfile;
import com.schemebridge.schemebridge.repository.EligibilityRuleRepository;
import com.schemebridge.schemebridge.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private UserProfileRepository profileRepository;

    @Autowired
    private EligibilityRuleRepository ruleRepository;

    @GetMapping("/recommend/{userId}")
    public List<com.schemebridge.schemebridge.dto.SchemeRecommendationDto> recommend(@PathVariable Long userId) {
        UserProfile profile = profileRepository.findByUserId(userId);
        if (profile == null) {
            throw new RuntimeException("Profile not found for userId: " + userId);
        }
        return generateRecommendations(profile);
    }

    @GetMapping("/recommend/profile/{profileId}")
    public List<com.schemebridge.schemebridge.dto.SchemeRecommendationDto> recommendByProfileId(
            @PathVariable Long profileId) {
        UserProfile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found for profileId: " + profileId));
        return generateRecommendations(profile);
    }

    private List<com.schemebridge.schemebridge.dto.SchemeRecommendationDto> generateRecommendations(
            UserProfile profile) {
        List<EligibilityRule> rules = ruleRepository.findAll();
        // Use a map to handle multiple rules pointing to the same scheme, keeping the
        // best reason or combining them.
        // For simplicity, we'll store unique schemes and first valid reason found.
        Map<Long, com.schemebridge.schemebridge.dto.SchemeRecommendationDto> resultMap = new HashMap<>();

        for (EligibilityRule rule : rules) {

            if (rule == null || rule.getScheme() == null || !rule.getScheme().isActive()) {
                continue;
            }

            List<String> validCriteria = new ArrayList<>();
            boolean ageOk = true;
            if (rule.getMinAge() != null && profile.getAge() != null) {
                ageOk = profile.getAge() >= rule.getMinAge();
                if (ageOk)
                    validCriteria.add("Age >= " + rule.getMinAge());
            }

            boolean incomeOk = true;
            if (rule.getMaxIncome() != null && profile.getIncome() != null) {
                incomeOk = profile.getIncome() <= rule.getMaxIncome();
                if (incomeOk)
                    validCriteria.add("Income <= " + rule.getMaxIncome());
            }

            boolean categoryOk = true;
            if (rule.getCategory() != null && profile.getCategory() != null) {
                categoryOk = profile.getCategory().equalsIgnoreCase(rule.getCategory());
                if (categoryOk)
                    validCriteria.add("Category matches '" + rule.getCategory() + "'");
            }

            boolean locationOk = true;
            if (rule.getLocation() != null && profile.getLocation() != null) {
                locationOk = profile.getLocation().equalsIgnoreCase(rule.getLocation());
                if (locationOk)
                    validCriteria.add("Location matches '" + rule.getLocation() + "'");
            }

            if (ageOk && incomeOk && categoryOk && locationOk) {
                // If the scheme is already in the map, we could append reasons, but for MVP we
                // skip
                if (!resultMap.containsKey(rule.getScheme().getId())) {
                    String reason = "You are eligible because: " + String.join(", ", validCriteria);
                    resultMap.put(rule.getScheme().getId(),
                            new com.schemebridge.schemebridge.dto.SchemeRecommendationDto(rule.getScheme(), reason));
                }
            }
        }

        return new ArrayList<>(resultMap.values());
    }
}
