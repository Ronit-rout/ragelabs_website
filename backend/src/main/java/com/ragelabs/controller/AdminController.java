package com.ragelabs.controller;

import com.ragelabs.model.JobApplication;
import com.ragelabs.model.Pitch;
import com.ragelabs.repository.CareerRepository;
import com.ragelabs.repository.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final String ADMIN_SECRET = "RLA20TWO6";

    @Autowired
    private PitchRepository pitchRepository;

    @Autowired
    private CareerRepository careerRepository;

    @GetMapping("/pitches")
    public ResponseEntity<?> getAllPitches(@RequestHeader(value = "X-Admin-Secret", required = false) String secret) {
        if (!ADMIN_SECRET.equals(secret)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");
        }
        return ResponseEntity.ok(pitchRepository.findAll());
    }

    @GetMapping("/applications")
    public ResponseEntity<?> getAllApplications(@RequestHeader(value = "X-Admin-Secret", required = false) String secret) {
        if (!ADMIN_SECRET.equals(secret)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");
        }
        return ResponseEntity.ok(careerRepository.findAll());
    }
}
