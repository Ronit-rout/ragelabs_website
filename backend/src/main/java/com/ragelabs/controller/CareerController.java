package com.ragelabs.controller;

import com.ragelabs.model.JobApplication;
import com.ragelabs.repository.CareerRepository;
import com.ragelabs.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/apply")
@CrossOrigin(origins = "*")
public class CareerController {

    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<JobApplication> submitApplication(
            @RequestPart("data") String applicationJson,
            @RequestPart(value = "resume", required = false) MultipartFile resumeFile) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JobApplication application = mapper.readValue(applicationJson, JobApplication.class);

            if (resumeFile != null && !resumeFile.isEmpty()) {
                application.setResumeFileName(resumeFile.getOriginalFilename());
            }

            JobApplication savedApplication = careerRepository.save(application);
            emailService.sendJobApplicationEmail(savedApplication, resumeFile);
            emailService.sendAutoReplyToApplicant(savedApplication);
            return ResponseEntity.ok(savedApplication);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<JobApplication> getAllApplications() {
        return careerRepository.findAll();
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<JobApplication> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return careerRepository.findById(id).map(app -> {
            app.setStatus(status);
            return ResponseEntity.ok(careerRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        if (careerRepository.existsById(id)) {
            careerRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

