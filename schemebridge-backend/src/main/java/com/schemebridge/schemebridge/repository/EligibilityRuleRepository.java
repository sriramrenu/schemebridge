package com.schemebridge.schemebridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.schemebridge.schemebridge.model.EligibilityRule;

public interface EligibilityRuleRepository extends JpaRepository<EligibilityRule, Long> {
}
