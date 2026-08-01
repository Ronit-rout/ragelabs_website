package com.ragelabs.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(columnDefinition = "TEXT")
    private String skills;

    private String experience;
    private String preferredRole;

    @Column(columnDefinition = "TEXT")
    private String careerGoals;

    private String referralSource;

    @Column(columnDefinition = "TEXT")
    private String motivation;

    private String resumeFileName;

    @Column(columnDefinition = "TEXT")
    private String linkedin;

    @Column(columnDefinition = "TEXT")
    private String portfolio;

    private String status = "pending";
    private LocalDateTime appliedAt = LocalDateTime.now();

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(String portfolio) {
        this.portfolio = portfolio;
    }

    public String getResumeFileName() {
        return resumeFileName;
    }

    public void setResumeFileName(String resumeFileName) {
        this.resumeFileName = resumeFileName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public JobApplication() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getPreferredRole() {
        return preferredRole;
    }

    public void setPreferredRole(String preferredRole) {
        this.preferredRole = preferredRole;
    }

    public String getCareerGoals() {
        return careerGoals;
    }

    public void setCareerGoals(String careerGoals) {
        this.careerGoals = careerGoals;
    }

    public String getReferralSource() {
        return referralSource;
    }

    public void setReferralSource(String referralSource) {
        this.referralSource = referralSource;
    }

    public String getMotivation() {
        return motivation;
    }

    public void setMotivation(String motivation) {
        this.motivation = motivation;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }
}
