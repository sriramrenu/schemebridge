package com.schemebridge.schemebridge.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Logged-in user (nullable for guest)
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 🔹 Basic
    private Integer age;
    private Double income;
    private String gender;
    private String category;
    private String location;

    // 🔹 Academic
    private Double tenthMarks;
    private Double twelfthMarks;
    private String course;

    // 🔹 Family
    private Double familyIncome;
    private String parentOccupation;

    // 🔹 Social
    private String caste;
    private Boolean disability;
    private Boolean minority;

    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public Double getTenthMarks() {
        return tenthMarks;
    }

    public void setTenthMarks(Double tenthMarks) {
        this.tenthMarks = tenthMarks;
    }

    public Double getTwelfthMarks() {
        return twelfthMarks;
    }

    public void setTwelfthMarks(Double twelfthMarks) {
        this.twelfthMarks = twelfthMarks;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Double getFamilyIncome() {
        return familyIncome;
    }

    public void setFamilyIncome(Double familyIncome) {
        this.familyIncome = familyIncome;
    }

    public String getParentOccupation() {
        return parentOccupation;
    }

    public void setParentOccupation(String parentOccupation) {
        this.parentOccupation = parentOccupation;
    }

    public String getCaste() {
        return caste;
    }

    public void setCaste(String caste) {
        this.caste = caste;
    }

    public Boolean getDisability() {
        return disability;
    }

    public void setDisability(Boolean disability) {
        this.disability = disability;
    }

    public Boolean getMinority() {
        return minority;
    }

    public void setMinority(Boolean minority) {
        this.minority = minority;
    }
}
