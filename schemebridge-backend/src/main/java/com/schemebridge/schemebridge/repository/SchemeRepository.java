package com.schemebridge.schemebridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.schemebridge.schemebridge.model.Scheme;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {
}
