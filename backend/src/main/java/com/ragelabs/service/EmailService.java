package com.ragelabs.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.to}")
    private String mailTo;

    public void sendEmail(String subject, String htmlBody) {
        try {
            String[] recipients = {
                mailTo,
                "rishitagautam07@gmail.com",
                "sahooswarup60@gmail.com"
            };
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipients);
            helper.setFrom("support@laundryrage.com");
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    public void sendJobApplicationEmail(com.ragelabs.model.JobApplication app) {
        String subject = "🚀 New Job Application — " + app.getFullName();
        String body = "<div style='font-family:Arial,sans-serif;max-width:700px;padding:32px;background:#fafafa;border-radius:12px;border:1px solid #e0e0e0'>"
            + "<div style='background:#720c13;padding:20px 28px;border-radius:8px 8px 0 0;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;'>Rage Labs — New Job Application</h1>"
            + "</div>"
            + "<div style='padding:28px;background:#fff;border-radius:0 0 8px 8px;'>"
            + section("👤 Applicant Details")
            + row("Full Name", safe(app.getFullName()))
            + row("Email", safe(app.getEmail()))
            + row("Phone", safe(app.getPhone()))
            + row("Address", safe(app.getAddress()))
            + section("💼 Professional Background")
            + row("Key Skills", safe(app.getSkills()))
            + row("Experience", safe(app.getExperience()))
            + row("Preferred Role", safe(app.getPreferredRole()))
            + row("Career Goals", safe(app.getCareerGoals()))
            + section("📋 Additional Info")
            + row("How they found us", safe(app.getReferralSource()))
            + row("Motivation", safe(app.getMotivation()))
            + row("Applied At", app.getAppliedAt() != null ? app.getAppliedAt().toString() : "N/A")
            + "<br/><p style='color:#888;font-size:12px;text-align:center;'>Rage Labs Engineering Collective · support@laundryrage.com</p>"
            + "</div></div>";
        sendEmail(subject, body);
    }

    public void sendPitchEmail(com.ragelabs.model.Pitch pitch) {
        String subject = "💡 New Startup Pitch — " + pitch.getProjectName() + " by " + pitch.getFounderName();
        String body = "<div style='font-family:Arial,sans-serif;max-width:700px;padding:32px;background:#fafafa;border-radius:12px;border:1px solid #e0e0e0'>"
            + "<div style='background:#720c13;padding:20px 28px;border-radius:8px 8px 0 0;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;'>Rage Labs — New Startup Pitch</h1>"
            + "</div>"
            + "<div style='padding:28px;background:#fff;border-radius:0 0 8px 8px;'>"
            + section("👤 Founder Information")
            + row("Founder Name", safe(pitch.getFounderName()))
            + row("LinkedIn", safe(pitch.getLinkedin()))
            + row("Twitter/X", safe(pitch.getTwitter()))
            + row("Past Projects", safe(pitch.getPastProjects()))
            + row("Primary Role", safe(pitch.getPrimaryRole()))
            + row("Weekly Hours", safe(pitch.getWeeklyHours()))
            + section("🚀 Project Core")
            + row("Project Name", safe(pitch.getProjectName()))
            + row("The Problem", safe(pitch.getProblem()))
            + row("The Solution", safe(pitch.getSolution()))
            + row("Target Audience", safe(pitch.getTargetAudience()))
            + section("🔧 Technical & Scope")
            + row("MVP Feature 1", safe(pitch.getMvpFeature1()))
            + row("MVP Feature 2", safe(pitch.getMvpFeature2()))
            + row("MVP Feature 3", safe(pitch.getMvpFeature3()))
            + row("Platform", safe(pitch.getPlatform()))
            + row("External Integrations", safe(pitch.getIntegrations()))
            + section("📊 Market & Validation")
            + row("User Validation", safe(pitch.getUserValidation()))
            + row("Acquisition Strategy", safe(pitch.getAcquisitionStrategy()))
            + row("Competitor 1", safe(pitch.getCompetitor1()))
            + row("Competitor 2", safe(pitch.getCompetitor2()))
            + row("Competitor 3", safe(pitch.getCompetitor3()))
            + row("Submitted At", pitch.getSubmittedAt() != null ? pitch.getSubmittedAt().toString() : "N/A")
            + "<br/><p style='color:#888;font-size:12px;text-align:center;'>Rage Labs Engineering Collective · support@laundryrage.com</p>"
            + "</div></div>";
        sendEmail(subject, body);
    }

    private String section(String title) {
        return "<h3 style='color:#720c13;border-bottom:2px solid #f6bc18;padding-bottom:6px;margin-top:28px;'>" + title + "</h3>";
    }

    private String row(String label, String value) {
        return "<p style='margin:8px 0;'><strong style='color:#333;min-width:160px;display:inline-block;'>" + label + ":</strong> "
            + "<span style='color:#555;'>" + value + "</span></p>";
    }

    private String safe(String val) {
        return (val != null && !val.isBlank()) ? val : "<em style='color:#aaa;'>Not provided</em>";
    }

    public void sendAutoReplyToApplicant(com.ragelabs.model.JobApplication app) {
        String subject = "Rage Labs — Application Received!";
        String body = "<div style='font-family:Arial,sans-serif;max-width:600px;padding:30px;background:#f9f9f9;border:1px solid #eee;border-radius:12px;'>"
            + "<h2 style='color:#720c13;'>Thank you for applying, " + safe(app.getFullName()) + "!</h2>"
            + "<p>We've received your application for the <strong>" + safe(app.getPreferredRole()) + "</strong> position.</p>"
            + "<p>Our team is currently reviewing your profile and skills. If we see a match, we'll be in touch with you soon.</p>"
            + "<br/><p>Stay Rage,<br/>The Rage Labs Team</p>"
            + "</div>";
        sendSingleEmail(app.getEmail(), subject, body);
    }

    public void sendAutoReplyToPitcher(com.ragelabs.model.Pitch pitch) {
        String subject = "Rage Labs — We've received your pitch!";
        String body = "<div style='font-family:Arial,sans-serif;max-width:600px;padding:30px;background:#f9f9f9;border:1px solid #eee;border-radius:12px;'>"
            + "<h2 style='color:#720c13;'>Thanks for sharing your vision, " + safe(pitch.getFounderName()) + "!</h2>"
            + "<p>We've successfully received your pitch for <strong>" + safe(pitch.getProjectName()) + "</strong>.</p>"
            + "<p>Our engineers and investment team are looking through your details. Expect to hear from us within 5-7 business days.</p>"
            + "<br/><p>Keep Building,<br/>The Rage Labs Collective</p>"
            + "</div>";
        sendSingleEmail(pitch.getEmail(), subject, body);
    }

    private void sendSingleEmail(String to, String subject, String htmlBody) {
        if (to == null || to.isBlank()) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setFrom("support@laundryrage.com");
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send auto-reply: " + e.getMessage());
        }
    }
}
