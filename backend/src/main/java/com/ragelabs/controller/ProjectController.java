package com.ragelabs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ragelabs.model.ProjectSubmission;
import com.ragelabs.repository.ProjectRepository;
import com.ragelabs.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ProjectSubmission> submitProject(
            @RequestPart("data") String projectJson,
            @RequestPart(value = "document", required = false) MultipartFile documentFile) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ProjectSubmission project = mapper.readValue(projectJson, ProjectSubmission.class);

            if (documentFile != null && !documentFile.isEmpty()) {
                project.setDocumentFileName(documentFile.getOriginalFilename());
            }

            ProjectSubmission savedProject = projectRepository.save(project);
            emailService.sendProjectSubmissionEmail(savedProject, documentFile);
            emailService.sendAutoReplyToProjectClient(savedProject);
            return ResponseEntity.ok(savedProject);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<ProjectSubmission> getAllProjects() {
        return projectRepository.findAll();
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<ProjectSubmission> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return projectRepository.findById(id).map(project -> {
            project.setStatus(status);
            return ResponseEntity.ok(projectRepository.save(project));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
