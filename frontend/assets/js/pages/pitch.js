/**
 * Rage Labs Startup Pitch Form Logic Module
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pitch-form');
    if (!form) return;

    const progressBar = document.getElementById('progress-bar');
    const progressLabel = document.getElementById('progress-label');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const assetsUpload = document.getElementById('assets-upload');
    const dropzone = document.querySelector('.border-dashed');

    // Drag and Drop Interactivity
    if (dropzone && assetsUpload) {
        dropzone.addEventListener('click', () => assetsUpload.click());

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.add('border-primary', 'bg-primary/10');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                dropzone.classList.remove('border-primary', 'bg-primary/10');
            }, false);
        });

        dropzone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                assetsUpload.files = files;
                updateDropzoneText(files);
            }
        });

        assetsUpload.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                updateDropzoneText(e.target.files);
            }
        });
    }

    function updateDropzoneText(files) {
        const names = Array.from(files).map(f => f.name).join(', ');
        const label = dropzone.querySelector('p:first-of-type');
        if (label) label.textContent = '📎 Attached: ' + names;
        updateProgress();
    }

    function updateProgress() {
        const inputs = form.querySelectorAll('input:not([type=file]):not([type=checkbox]), textarea');
        let filled = 0;
        inputs.forEach(el => {
            if (el.value && el.value.trim() !== '') filled++;
        });

        // Checkbox groups
        const checkboxes = form.querySelectorAll('input[type=checkbox]:checked');
        if (checkboxes.length > 0) filled++;

        if (assetsUpload && assetsUpload.files && assetsUpload.files.length > 0) {
            filled++;
        }

        const totalFields = inputs.length + 2;
        const pct = Math.min(100, Math.round((filled / totalFields) * 100));
        if (progressBar) progressBar.style.width = pct + '%';
        if (progressLabel) progressLabel.textContent = pct + '%';
    }

    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
    updateProgress();

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const founderName = document.getElementById('founderName') ? document.getElementById('founderName').value : '';
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const acquisitionStrategy = document.getElementById('acquisitionStrategy') ? document.getElementById('acquisitionStrategy').value : '';

        if (!founderName || !email || !acquisitionStrategy) {
            if (typeof showToast === 'function') {
                showToast('Please fill in all required fields (*)', 'error');
            }
            return;
        }

        const platformElements = form.querySelectorAll('input[name="platform"]:checked');
        const platforms = Array.from(platformElements).map(el => el.value).join(', ');

        const pitchData = {
            founderName: founderName,
            email: email,
            linkedin: document.getElementById('linkedin') ? document.getElementById('linkedin').value : '',
            twitter: document.getElementById('twitter') ? document.getElementById('twitter').value : '',
            pastProjects: document.getElementById('pastProjects') ? document.getElementById('pastProjects').value : '',
            primaryRole: document.getElementById('primaryRole') ? document.getElementById('primaryRole').value : '',
            weeklyHours: document.getElementById('weeklyHours') ? document.getElementById('weeklyHours').value : '',

            projectName: document.getElementById('projectName') ? document.getElementById('projectName').value : '',
            problem: document.getElementById('problem') ? document.getElementById('problem').value : '',
            solution: document.getElementById('solution') ? document.getElementById('solution').value : '',
            targetAudience: document.getElementById('targetAudience') ? document.getElementById('targetAudience').value : '',

            mvpFeature1: document.getElementById('mvpFeature1') ? document.getElementById('mvpFeature1').value : '',
            mvpFeature2: document.getElementById('mvpFeature2') ? document.getElementById('mvpFeature2').value : '',
            mvpFeature3: document.getElementById('mvpFeature3') ? document.getElementById('mvpFeature3').value : '',
            platform: platforms,
            integrations: document.getElementById('integrations') ? document.getElementById('integrations').value : '',

            userValidation: document.getElementById('userValidation') ? document.getElementById('userValidation').value : '',
            acquisitionStrategy: acquisitionStrategy,
            competitor1: document.getElementById('competitor1') ? document.getElementById('competitor1').value : '',
            competitor2: document.getElementById('competitor2') ? document.getElementById('competitor2').value : '',
            competitor3: document.getElementById('competitor3') ? document.getElementById('competitor3').value : ''
        };

        if (submitBtn) submitBtn.disabled = true;
        if (submitText) submitText.textContent = 'Submitting Pitch...';

        try {
            const response = await fetch('/api/pitch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pitchData)
            });

            if (response.ok) {
                if (progressBar) progressBar.style.width = '100%';
                if (progressLabel) progressLabel.textContent = '100%';

                if (typeof showToast === 'function') {
                    showToast('Pitch submitted! We\'ll review and reach out within 3–5 business days.', 'success');
                }
                form.reset();
                updateProgress();
                setTimeout(() => { window.location.href = '/thankyou?type=pitch'; }, 1500);
            } else {
                const err = await response.text();
                if (typeof showToast === 'function') {
                    showToast('Submission failed: ' + err, 'error');
                }
            }
        } catch (err) {
            console.error('Pitch Submission Error:', err);
            if (typeof showToast === 'function') {
                showToast('Could not connect to the server. Please check backend status.', 'error');
            }
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (submitText) submitText.textContent = 'Submit My Pitch';
        }
    });
});
