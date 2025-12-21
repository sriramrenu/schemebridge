package com.schemebridge.schemebridge.controller;

import com.schemebridge.schemebridge.model.EligibilityRule;
import com.schemebridge.schemebridge.repository.EligibilityRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rules")
public class EligibilityRuleController {

    @Autowired
    private EligibilityRuleRepository ruleRepository;

    @PostMapping
    public EligibilityRule addRule(@RequestBody EligibilityRule rule) {
        return ruleRepository.save(rule);
    }

    @GetMapping
    public List<EligibilityRule> getAllRules() {
        return ruleRepository.findAll();
    }
}
