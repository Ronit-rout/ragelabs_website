package com.ragelabs.controller;

import com.ragelabs.model.ContactMessage;
import com.ragelabs.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*") // For development, adjust as needed
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private com.ragelabs.service.EmailService emailService;

    @PostMapping
    public ResponseEntity<ContactMessage> submitContactForm(@RequestBody ContactMessage message) {
        ContactMessage savedMessage = contactRepository.save(message);
        emailService.sendContactEmail(savedMessage);
        emailService.sendAutoReplyToContact(savedMessage);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }
}
