package com.ragelabs.service;

import com.ragelabs.model.ContactMessage;
import com.ragelabs.model.JobApplication;
import com.ragelabs.model.Pitch;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.CompletableFuture;

@Service
public class GoogleSheetsService {

    private static final Logger logger = LoggerFactory.getLogger(GoogleSheetsService.class);

    @Value("${google.sheets.web.app.url:}")
    private String webAppUrl;

    private final HttpClient httpClient;

    public GoogleSheetsService() {
        this.httpClient = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    private String getTargetUrl() {
        String targetUrl = webAppUrl;
        if (targetUrl == null || targetUrl.trim().isEmpty()) {
            targetUrl = System.getenv("GOOGLE_SHEETS_WEB_APP_URL");
        }
        return targetUrl != null ? targetUrl.trim() : null;
    }

    /**
     * Sends contact message submission securely to Google Sheets via Google Apps Script Web App.
     */
    public void sendContactToSheets(ContactMessage contact) {
        String targetUrl = getTargetUrl();
        if (targetUrl == null || targetUrl.isEmpty()) {
            logger.info("Google Sheets integration: google.sheets.web.app.url is not configured.");
            return;
        }

        final String activeUrl = targetUrl;
        CompletableFuture.runAsync(() -> {
            try {
                String timestampStr = contact.getCreatedAt() != null
                        ? contact.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                        : java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                String formPayload = "formType=" + encode("contact") +
                        "&timestamp=" + encode(timestampStr) +
                        "&name=" + encode(contact.getName()) +
                        "&email=" + encode(contact.getEmail()) +
                        "&institution=" + encode(contact.getInstitution()) +
                        "&profileType=" + encode(contact.getProfileType()) +
                        "&subject=" + encode(contact.getSubject()) +
                        "&message=" + encode(contact.getMessage());

                postPayload(activeUrl, formPayload, "Contact");
            } catch (Exception e) {
                logger.error("Error sending contact form submission to Google Sheets: {}", e.getMessage(), e);
            }
        });
    }

    /**
     * Sends pitch submission securely to Google Sheets (Pitches tab) via Google Apps Script Web App.
     */
    public void sendPitchToSheets(Pitch pitch) {
        String targetUrl = getTargetUrl();
        if (targetUrl == null || targetUrl.isEmpty()) {
            logger.info("Google Sheets integration: google.sheets.web.app.url is not configured.");
            return;
        }

        final String activeUrl = targetUrl;
        CompletableFuture.runAsync(() -> {
            try {
                String timestampStr = pitch.getSubmittedAt() != null
                        ? pitch.getSubmittedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                        : java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                String competitors = String.join(", ",
                        filterEmpty(pitch.getCompetitor1(), pitch.getCompetitor2(), pitch.getCompetitor3()));

                String formPayload = "formType=" + encode("pitch") +
                        "&timestamp=" + encode(timestampStr) +
                        "&founderName=" + encode(pitch.getFounderName()) +
                        "&email=" + encode(pitch.getEmail()) +
                        "&linkedin=" + encode(pitch.getLinkedin()) +
                        "&twitter=" + encode(pitch.getTwitter()) +
                        "&primaryRole=" + encode(pitch.getPrimaryRole()) +
                        "&weeklyHours=" + encode(pitch.getWeeklyHours()) +
                        "&pastProjects=" + encode(pitch.getPastProjects()) +
                        "&projectName=" + encode(pitch.getProjectName()) +
                        "&problem=" + encode(pitch.getProblem()) +
                        "&solution=" + encode(pitch.getSolution()) +
                        "&targetAudience=" + encode(pitch.getTargetAudience()) +
                        "&mvpFeature1=" + encode(pitch.getMvpFeature1()) +
                        "&mvpFeature2=" + encode(pitch.getMvpFeature2()) +
                        "&mvpFeature3=" + encode(pitch.getMvpFeature3()) +
                        "&platform=" + encode(pitch.getPlatform()) +
                        "&integrations=" + encode(pitch.getIntegrations()) +
                        "&userValidation=" + encode(pitch.getUserValidation()) +
                        "&acquisitionStrategy=" + encode(pitch.getAcquisitionStrategy()) +
                        "&competitors=" + encode(competitors) +
                        "&status=" + encode(pitch.getStatus());

                postPayload(activeUrl, formPayload, "Pitch");
            } catch (Exception e) {
                logger.error("Error sending pitch submission to Google Sheets: {}", e.getMessage(), e);
            }
        });
    }

    /**
     * Sends job application submission securely to Google Sheets (Applications tab) via Google Apps Script Web App.
     */
    public void sendApplicationToSheets(JobApplication application) {
        String targetUrl = getTargetUrl();
        if (targetUrl == null || targetUrl.isEmpty()) {
            logger.info("Google Sheets integration: google.sheets.web.app.url is not configured.");
            return;
        }

        final String activeUrl = targetUrl;
        CompletableFuture.runAsync(() -> {
            try {
                String timestampStr = application.getAppliedAt() != null
                        ? application.getAppliedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                        : java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                String formPayload = "formType=" + encode("apply") +
                        "&timestamp=" + encode(timestampStr) +
                        "&fullName=" + encode(application.getFullName()) +
                        "&name=" + encode(application.getFullName()) +
                        "&email=" + encode(application.getEmail()) +
                        "&phone=" + encode(application.getPhone()) +
                        "&address=" + encode(application.getAddress()) +
                        "&location=" + encode(application.getAddress()) +
                        "&preferredRole=" + encode(application.getPreferredRole()) +
                        "&experience=" + encode(application.getExperience()) +
                        "&skills=" + encode(application.getSkills()) +
                        "&linkedin=" + encode(application.getLinkedin()) +
                        "&portfolio=" + encode(application.getPortfolio()) +
                        "&referralSource=" + encode(application.getReferralSource()) +
                        "&careerGoals=" + encode(application.getCareerGoals()) +
                        "&motivation=" + encode(application.getMotivation()) +
                        "&resumeFileName=" + encode(application.getResumeFileName()) +
                        "&status=" + encode(application.getStatus());

                postPayload(activeUrl, formPayload, "Application");
            } catch (Exception e) {
                logger.error("Error sending job application to Google Sheets: {}", e.getMessage(), e);
            }
        });
    }

    private void postPayload(String url, String formPayload, String label) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(formPayload))
                    .timeout(Duration.ofSeconds(15))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                logger.info("Successfully recorded {} submission to Google Sheets. Response: {}", label, response.body());
            } else if (response.statusCode() == 403) {
                logger.error("Google Sheets Web App returned 403 Forbidden! Check deployment 'Who has access' is set to 'Anyone'.");
            } else {
                logger.warn("Received status code {} from Google Sheets Web App for {}. Body: {}", response.statusCode(), label, response.body());
            }
        } catch (Exception e) {
            logger.error("HTTP error sending {} to Google Sheets: {}", label, e.getMessage(), e);
        }
    }

    private String encode(String value) {
        if (value == null) return "";
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

    private java.util.List<String> filterEmpty(String... items) {
        java.util.List<String> list = new java.util.ArrayList<>();
        if (items != null) {
            for (String item : items) {
                if (item != null && !item.trim().isEmpty()) {
                    list.add(item.trim());
                }
            }
        }
        return list;
    }
}
