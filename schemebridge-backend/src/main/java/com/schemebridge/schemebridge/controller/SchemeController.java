package com.schemebridge.schemebridge.controller;

import com.schemebridge.schemebridge.model.Scheme;
import com.schemebridge.schemebridge.repository.SchemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = "*")
public class SchemeController {

    @Autowired
    private SchemeRepository schemeRepository;

    @PostMapping
    public Scheme addScheme(@RequestBody Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    @GetMapping
    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }
}
