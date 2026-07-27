package com.ragelabs.controller;

import com.ragelabs.model.Pitch;
import com.ragelabs.repository.PitchRepository;
import com.ragelabs.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pitch")
@CrossOrigin(origins = "*")
public class PitchController {

    @Autowired
    private PitchRepository pitchRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<Pitch> submitPitch(@RequestBody Pitch pitch) {
        Pitch savedPitch = pitchRepository.save(pitch);
        emailService.sendPitchEmail(savedPitch);
        emailService.sendAutoReplyToPitcher(savedPitch);
        return ResponseEntity.ok(savedPitch);
    }

    @GetMapping
    public List<Pitch> getAllPitches() {
        return pitchRepository.findAll();
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<Pitch> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return pitchRepository.findById(id).map(pitch -> {
            pitch.setStatus(status);
            return ResponseEntity.ok(pitchRepository.save(pitch));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePitch(@PathVariable Long id) {
        if (pitchRepository.existsById(id)) {
            pitchRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    public List<Pitch> getAllPitchesAlias() {
        return pitchRepository.findAll();
    }
}
