package com.ragelabs.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.to}")
    private String mailTo;

    public void sendEmail(String subject, String htmlBody) {
        try {
            String[] recipients = { "ronitrishi05@gmail.com", "support@ragelabs.in", "sahooswarup60@gmail.com" };
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipients);
            helper.setFrom("ronitrishi05@gmail.com", "Rage Labs");
            helper.setReplyTo("support@ragelabs.in");
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendContactEmail(com.ragelabs.model.ContactMessage contact) {
        String subject = "📩 New Contact Us Message — " + contact.getSubject();
        String body = "<div style='font-family:Arial,sans-serif;max-width:700px;padding:32px;background:#fafafa;border-radius:12px;border:1px solid #e0e0e0'>"
            + "<div style='background:#720c13;padding:20px 28px;border-radius:8px 8px 0 0;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;'>Rage Labs — Contact Message</h1>"
            + "</div>"
            + "<div style='padding:28px;background:#fff;border-radius:0 0 8px 8px;'>"
            + section("👤 Contact Info")
            + row("Full Name", safe(contact.getName()))
            + row("Email", safe(contact.getEmail()))
            + row("Subject", safe(contact.getSubject()))
            + section("💬 Message")
            + "<p style='color:#444;line-height:1.6;background:#f9f9f9;padding:16px;border-radius:8px;border-left:4px solid #720c13;'>" + safe(contact.getMessage()) + "</p>"
            + "<br/><p style='color:#888;font-size:12px;text-align:center;'>Rage Labs Engineering Collective · support@ragelabs.in</p>"
            + "</div></div>";
        sendEmail(subject, body);
    }

    public void sendJobApplicationEmail(com.ragelabs.model.JobApplication app, MultipartFile resumeFile) {
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
            + section("💼 Professional Background & Links")
            + row("Key Skills", safe(app.getSkills()))
            + row("Experience", safe(app.getExperience()))
            + row("Preferred Role", safe(app.getPreferredRole()))
            + row("LinkedIn Profile", safe(app.getLinkedin()))
            + row("Portfolio / GitHub", safe(app.getPortfolio()))
            + row("Attached Resume File", safe(app.getResumeFileName()))
            + row("Career Goals", safe(app.getCareerGoals()))
            + section("📋 Additional Info")
            + row("How they found us", safe(app.getReferralSource()))
            + row("Motivation", safe(app.getMotivation()))
            + row("Applied At", app.getAppliedAt() != null ? app.getAppliedAt().toString() : "N/A")
            + "<br/><p style='color:#888;font-size:12px;text-align:center;'>Rage Labs Engineering Collective · support@ragelabs.in</p>"
            + "</div></div>";
        sendEmailWithAttachment(subject, body, resumeFile);
    }

    public void sendEmailWithAttachment(String subject, String htmlBody, MultipartFile attachment) {
        try {
            String[] recipients = { "ronitrishi05@gmail.com", "support@ragelabs.in", "sahooswarup60@gmail.com" };
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipients);
            helper.setFrom("ronitrishi05@gmail.com", "Rage Labs");
            helper.setReplyTo("support@ragelabs.in");
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            if (attachment != null && !attachment.isEmpty()) {
                String filename = attachment.getOriginalFilename() != null ? attachment.getOriginalFilename() : "resume";
                helper.addAttachment(filename, new ByteArrayResource(attachment.getBytes()));
            }
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email with attachment: " + e.getMessage());
            e.printStackTrace();
        }
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
            + "<br/><p style='color:#888;font-size:12px;text-align:center;'>Rage Labs Engineering Collective · support@ragelabs.in</p>"
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

    public void sendAutoReplyToContact(com.ragelabs.model.ContactMessage contact) {
        String subject = "Rage Labs — We received your message!";
        String body = "<div style='font-family:Arial,sans-serif;max-width:650px;margin:0 auto;padding:32px;background:#ffffff;border-radius:16px;border:1px solid #e0e0e0;'>"
            + "<div style='background:#720c13;padding:24px 32px;border-radius:12px;margin-bottom:24px;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;font-weight:900;'>Rage Labs Collective</h1>"
            + "<p style='color:#ffffff;margin:4px 0 0 0;font-size:13px;opacity:0.9;'>Transforming Ideas into Great MVPs</p>"
            + "</div>"
            + "<h2 style='color:#111;font-size:20px;margin-top:0;'>Hello " + safe(contact.getName()) + ",</h2>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>Thank you for reaching out to <strong>Rage Labs</strong> regarding <em>\"" + safe(contact.getSubject()) + "\"</em>.</p>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>Our engineering and consulting team has received your enquiry and will review it promptly. Expect a direct reply from our team shortly.</p>"
            + "<div style='background:#fcfcfc;border-left:4px solid #f6bc18;padding:16px;margin:24px 0;border-radius:0 8px 8px 0;border:1px solid #eee;border-left-width:4px;'>"
            + "<p style='margin:0;color:#720c13;font-size:12px;font-weight:bold;text-transform:uppercase;'>Your Submitted Message:</p>"
            + "<p style='margin:8px 0 0 0;color:#333;font-size:14px;font-style:italic;'>\"" + safe(contact.getMessage()) + "\"</p>"
            + "</div>"
            + "<p style='color:#666;font-size:14px;'>Best regards,<br/><strong style='color:#720c13;'>The Rage Labs Team</strong></p>"
            + "<hr style='border:none;border-top:1px solid #eee;margin:24px 0;'/>"
            + "<p style='color:#999;font-size:12px;text-align:center;'>Rage Labs Collective · Unit of SSSD Consumer Products and Services Pvt. Ltd.<br/>support@ragelabs.in</p>"
            + "</div>";
        sendSingleEmail(contact.getEmail(), subject, body);
    }

    public void sendAutoReplyToApplicant(com.ragelabs.model.JobApplication app) {
        String subject = "Rage Labs — Application Received for " + safe(app.getPreferredRole());
        String body = "<div style='font-family:Arial,sans-serif;max-width:650px;margin:0 auto;padding:32px;background:#ffffff;border-radius:16px;border:1px solid #e0e0e0;'>"
            + "<div style='background:#720c13;padding:24px 32px;border-radius:12px;margin-bottom:24px;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;font-weight:900;'>Rage Labs Careers</h1>"
            + "<p style='color:#ffffff;margin:4px 0 0 0;font-size:13px;opacity:0.9;'>Engineering & Product Collective</p>"
            + "</div>"
            + "<h2 style='color:#111;font-size:20px;margin-top:0;'>Thank you for applying, " + safe(app.getFullName()) + "!</h2>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>We have successfully received your application for the <strong>" + safe(app.getPreferredRole()) + "</strong> role at Rage Labs.</p>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>Our engineering leads are reviewing your skills, experience, and profile links. If your background matches our technical roadmap, our recruitment team will get in touch with you.</p>"
            + "<br/><p style='color:#666;font-size:14px;'>Stay Bold & Keep Building,<br/><strong style='color:#720c13;'>The Rage Labs Recruitment Team</strong></p>"
            + "<hr style='border:none;border-top:1px solid #eee;margin:24px 0;'/>"
            + "<p style='color:#999;font-size:12px;text-align:center;'>Rage Labs Collective · Unit of SSSD Consumer Products and Services Pvt. Ltd.<br/>support@ragelabs.in</p>"
            + "</div>";
        sendSingleEmail(app.getEmail(), subject, body);
    }

    public void sendProjectSubmissionEmail(com.ragelabs.model.ProjectSubmission project, MultipartFile documentFile) {
        String subject = "🛠️ New Project Intake Request — " + project.getProjectName() + " by " + project.getClientName();
        String body = "<div style='font-family:Arial,sans-serif;max-width:700px;padding:32px;background:#fafafa;border-radius:12px;border:1px solid #e0e0e0'>"
            + "<div style='background:#1a1052;padding:20px 28px;border-radius:8px 8px 0 0;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;'>Rage Labs — Build My Project Request</h1>"
            + "</div>"
            + "<div style='padding:28px;background:#fff;border-radius:0 0 8px 8px;'>"
            + section("👤 Client Details")
            + row("Client Name", safe(project.getClientName()))
            + row("Email", safe(project.getEmail()))
            + row("Phone / WhatsApp", safe(project.getPhone()))
            + row("LinkedIn Profile", safe(project.getLinkedin()))
            + row("GitHub / Portfolio", safe(project.getGithub()))
            + section("🚀 Project Scope & Vision")
            + row("Project Title", safe(project.getProjectName()))
            + row("Project Description", safe(project.getProjectDescription()))
            + row("Target Audience & Features", safe(project.getTargetAudience()))
            + row("Business Model", safe(project.getBusinessModel()))
            + row("Budget & Timeline", safe(project.getBudgetTimeline()))
            + row("Attached Specification Document", safe(project.getDocumentFileName()))
            + row("Submitted At", project.getSubmittedAt() != null ? project.getSubmittedAt().toString() : "N/A")
            + "<br/><p style='color:#888;font-size:12px;text-align:center;'>Rage Labs Engineering Collective · support@ragelabs.in</p>"
            + "</div></div>";
        sendEmailWithAttachment(subject, body, documentFile);
    }

    public void sendAutoReplyToProjectClient(com.ragelabs.model.ProjectSubmission project) {
        String subject = "Rage Labs — We received your project request for " + safe(project.getProjectName());
        String body = "<div style='font-family:Arial,sans-serif;max-width:650px;margin:0 auto;padding:32px;background:#ffffff;border-radius:16px;border:1px solid #e0e0e0;'>"
            + "<div style='background:#1a1052;padding:24px 32px;border-radius:12px;margin-bottom:24px;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;font-weight:900;'>Rage Labs Engineering</h1>"
            + "<p style='color:#ffffff;margin:4px 0 0 0;font-size:13px;opacity:0.9;'>Build My Project Track</p>"
            + "</div>"
            + "<h2 style='color:#111;font-size:20px;margin-top:0;'>Thank you, " + safe(project.getClientName()) + "!</h2>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>We have received your project details for <strong>" + safe(project.getProjectName()) + "</strong>.</p>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>Our engineering leads are evaluating your project scope, requirements, and tech stack options. Expect a detailed response and roadmap proposal from our team within 1-2 business days.</p>"
            + "<br/><p style='color:#666;font-size:14px;'>Best regards,<br/><strong style='color:#1a1052;'>The Rage Labs Engineering Team</strong></p>"
            + "<hr style='border:none;border-top:1px solid #eee;margin:24px 0;'/>"
            + "<p style='color:#999;font-size:12px;text-align:center;'>Rage Labs Collective · Unit of SSSD Consumer Products and Services Pvt. Ltd.<br/>support@ragelabs.in</p>"
            + "</div>";
        sendSingleEmail(project.getEmail(), subject, body);
    }

    public void sendAutoReplyToPitcher(com.ragelabs.model.Pitch pitch) {
        String subject = "Rage Labs — Pitch Received for " + safe(pitch.getProjectName());
        String body = "<div style='font-family:Arial,sans-serif;max-width:650px;margin:0 auto;padding:32px;background:#ffffff;border-radius:16px;border:1px solid #e0e0e0;'>"
            + "<div style='background:#720c13;padding:24px 32px;border-radius:12px;margin-bottom:24px;'>"
            + "<h1 style='color:#f6bc18;margin:0;font-size:24px;font-weight:900;'>Rage Labs Ventures</h1>"
            + "<p style='color:#ffffff;margin:4px 0 0 0;font-size:13px;opacity:0.9;'>Let's Co-Found It Together</p>"
            + "</div>"
            + "<h2 style='color:#111;font-size:20px;margin-top:0;'>Thanks for sharing your vision, " + safe(pitch.getFounderName()) + "!</h2>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>We have received your pitch for <strong>" + safe(pitch.getProjectName()) + "</strong>.</p>"
            + "<p style='color:#444;font-size:15px;line-height:1.6;'>Our venture architects and investment team are evaluating your problem statement, solution MVP, and market validation. Expect to hear back from us within 3-5 business days.</p>"
            + "<br/><p style='color:#666;font-size:14px;'>Keep Building,<br/><strong style='color:#720c13;'>The Rage Labs Venture Studio</strong></p>"
            + "<hr style='border:none;border-top:1px solid #eee;margin:24px 0;'/>"
            + "<p style='color:#999;font-size:12px;text-align:center;'>Rage Labs Collective · Unit of SSSD Consumer Products and Services Pvt. Ltd.<br/>support@ragelabs.in</p>"
            + "</div>";
        sendSingleEmail(pitch.getEmail(), subject, body);
    }

    private void sendSingleEmail(String to, String subject, String htmlBody) {
        if (to == null || to.isBlank()) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setFrom("ronitrishi05@gmail.com", "Rage Labs");
            helper.setReplyTo("support@ragelabs.in");
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send auto-reply to " + to + ": " + e.getMessage());
        }
    }
}
