package com.ragelabs.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pitches")
public class Pitch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Section 1: Founder Info
    private String founderName;
    private String linkedin;
    private String email;
    private String twitter;
    @Column(columnDefinition = "TEXT")
    private String pastProjects;
    private String primaryRole;
    private String weeklyHours;

    // Section 2: Project Core
    private String projectName;
    @Column(columnDefinition = "TEXT")
    private String problem;
    @Column(columnDefinition = "TEXT")
    private String solution;
    @Column(columnDefinition = "TEXT")
    private String targetAudience;

    // Section 3: Technical & Scope
    private String mvpFeature1;
    private String mvpFeature2;
    private String mvpFeature3;
    private String platform;
    private String integrations;

    // Section 4: Market & Validation
    @Column(columnDefinition = "TEXT")
    private String userValidation;
    @Column(columnDefinition = "TEXT")
    private String acquisitionStrategy;
    private String competitor1;
    private String competitor2;
    private String competitor3;

    private String status = "pending";
    private LocalDateTime submittedAt = LocalDateTime.now();

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Pitch() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFounderName() { return founderName; }
    public void setFounderName(String founderName) { this.founderName = founderName; }

    public String getLinkedin() { return linkedin; }
    public void setLinkedin(String linkedin) { this.linkedin = linkedin; }

    public String getTwitter() { return twitter; }
    public void setTwitter(String twitter) { this.twitter = twitter; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPastProjects() { return pastProjects; }
    public void setPastProjects(String pastProjects) { this.pastProjects = pastProjects; }

    public String getPrimaryRole() { return primaryRole; }
    public void setPrimaryRole(String primaryRole) { this.primaryRole = primaryRole; }

    public String getWeeklyHours() { return weeklyHours; }
    public void setWeeklyHours(String weeklyHours) { this.weeklyHours = weeklyHours; }

    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }

    public String getProblem() { return problem; }
    public void setProblem(String problem) { this.problem = problem; }

    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }

    public String getTargetAudience() { return targetAudience; }
    public void setTargetAudience(String targetAudience) { this.targetAudience = targetAudience; }

    public String getMvpFeature1() { return mvpFeature1; }
    public void setMvpFeature1(String mvpFeature1) { this.mvpFeature1 = mvpFeature1; }

    public String getMvpFeature2() { return mvpFeature2; }
    public void setMvpFeature2(String mvpFeature2) { this.mvpFeature2 = mvpFeature2; }

    public String getMvpFeature3() { return mvpFeature3; }
    public void setMvpFeature3(String mvpFeature3) { this.mvpFeature3 = mvpFeature3; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getIntegrations() { return integrations; }
    public void setIntegrations(String integrations) { this.integrations = integrations; }

    public String getUserValidation() { return userValidation; }
    public void setUserValidation(String userValidation) { this.userValidation = userValidation; }

    public String getAcquisitionStrategy() { return acquisitionStrategy; }
    public void setAcquisitionStrategy(String acquisitionStrategy) { this.acquisitionStrategy = acquisitionStrategy; }

    public String getCompetitor1() { return competitor1; }
    public void setCompetitor1(String competitor1) { this.competitor1 = competitor1; }

    public String getCompetitor2() { return competitor2; }
    public void setCompetitor2(String competitor2) { this.competitor2 = competitor2; }

    public String getCompetitor3() { return competitor3; }
    public void setCompetitor3(String competitor3) { this.competitor3 = competitor3; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
