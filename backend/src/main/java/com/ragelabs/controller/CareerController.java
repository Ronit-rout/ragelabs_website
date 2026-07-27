package com.ragelabs.controller;

import com.ragelabs.model.JobApplication;
import com.ragelabs.repository.CareerRepository;
import com.ragelabs.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apply")
@CrossOrigin(origins = "*")
public class CareerController {

    @Autowired
    private CareerRepository careerRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<JobApplication> submitApplication(@RequestBody JobApplication application) {
        JobApplication savedApplication = careerRepository.save(application);
        emailService.sendJobApplicationEmail(savedApplication);
        emailService.sendAutoReplyToApplicant(savedApplication);
        return ResponseEntity.ok(savedApplication);
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

