package com.schemebridge.schemebridge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "eligibility_rules")
public class EligibilityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer minAge;
    private Double maxIncome;
    private String category;
    private String location;

    @ManyToOne
    @JoinColumn(name = "scheme_id")
    private Scheme scheme;

    // getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMinAge() {
        return minAge;
    }

    public void setMinAge(Integer minAge) {
        this.minAge = minAge;
    }

    public Double getMaxIncome() {
        return maxIncome;
    }

    public void setMaxIncome(Double maxIncome) {
        this.maxIncome = maxIncome;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Scheme getScheme() {
        return scheme;
    }

    public void setScheme(Scheme scheme) {
        this.scheme = scheme;
    }
}
