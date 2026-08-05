/**
 * RageLabs Motion & Interactive Effects Engine (Accenture Benchmark Standard)
 * Features:
 * - Multi-Layer Background Engine: Volumetric Clouds, Glowing Bubbles, Dots & Network Lines
 * - Ambient Warm Gold/Yellow Background Glow Overlay
 * - Page-Specific Custom Background Animations
 * - Scroll Reveal Animations & Spotlight Glow
 * - Accenture Global Search Overlay with Ctrl+K / Cmd+K
 * - Topic Micro-Filters for Cards Grid
 * - Accessible Auto-Play Carousel with Play/Pause toggle (W3C)
 * - Card Quick-View / Detail Reveal Modals
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Force Light Mode Foundation
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');

    // 1. Subtle Warm Yellow Glare Accent (Restrained, Hero only)
    initSubtleWarmGlare();

    // 1b. Multi-Layer Interactive Background Engine (Bubbles, Network Lines & Mouse Interactions)
    initInteractiveCanvasBackground();

    // 2. Intersection Observer for Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-scale, .reveal-stagger, .reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Card Hover Tracking (.glow-card)
    const glowCards = document.querySelectorAll('.glow-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. Navbar Active Link Highlighting & Dark Crimson Styling
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('text-accent-yellow');
            link.classList.remove('text-white/90');
            if (!link.querySelector('.nav-active-bar')) {
                const bar = document.createElement('span');
                bar.className = 'nav-active-bar absolute -bottom-1 left-0 w-full h-[2.5px] bg-accent-yellow transition-all duration-300';
                link.appendChild(bar);
            }
        }
    });

    // 4b. Logo Hover Interaction Init
    initLogoHoverInteraction();

    // 5. Light & Seamless Mega-Menu Dropdown Engine
    initLightNavigationDropdown();

    // 6. Mobile Navigation Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function openMobileMenu() {
        if (mobileMenuDrawer) {
            mobileMenuDrawer.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        }
    }

    function closeMobileMenu() {
        if (mobileMenuDrawer) {
            mobileMenuDrawer.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // 7. Global Search Overlay System
    initSearchOverlay();

    // 8. Topic Micro-Filtering for Home & Portfolio Cards
    initTopicMicroFilters();

    // 9. Accessible Auto-Rotating Carousel
    initAccessibleCarousel();

    // 10. Card Quick-View Modal Engine
    initCardQuickView();

    // 11. Animated Stat Number Counters
    initCounterAnimations();

    // 12. Smooth Page Transitions
    initPageTransitions();

    // 13. Staggered Reveals
    initParallaxAndStagger();

    // 14. Global UI Micro-Interaction & Form Polish
    initGlobalUiPolish();
});

/**
 * Subtle Warm Yellow Glare Accent (Restrained, Hero only)
 */
function initSubtleWarmGlare() {
    let glare = document.getElementById('subtle-warm-glare');
    if (!glare) {
        glare = document.createElement('div');
        glare.id = 'subtle-warm-glare';
        glare.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden';
        glare.innerHTML = `
            <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-b from-[#f6bc18]/08 via-[#f6bc18]/04 to-transparent blur-[120px] pointer-events-none"></div>
        `;
        document.body.prepend(glare);
    }
}

/**
 * Multi-Layer Interactive Background Engine: Floating Bubbles, Constellation Network Lines & Mouse Repulsion
 */
function initInteractiveCanvasBackground() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let canvas = document.getElementById('interactive-bg-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'interactive-bg-canvas';
        canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-70 transition-opacity duration-500';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initElements();
    });

    const mouse = { x: null, y: null, radius: 180 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // 1. Floating Specular Bubbles
    const bubbles = [];
    class Bubble {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 14 + 6;
            this.vy = - (Math.random() * 0.5 + 0.2);
            this.vx = (Math.random() - 0.5) * 0.3;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.008;
            this.color = Math.random() > 0.4 ? 'rgba(246, 188, 24, ' : 'rgba(26, 16, 82, ';
            this.alpha = Math.random() * 0.3 + 0.15;
        }

        update() {
            this.y += this.vy;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * 0.4 + this.vx;

            if (this.y < -30) {
                this.y = height + 30;
                this.x = Math.random() * width;
            }

            // Mouse Repulsion
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 2.2;
                    this.y -= (dy / dist) * force * 2.2;
                }
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.color + this.alpha + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Inner Specular Highlight
            ctx.beginPath();
            ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.7})`;
            ctx.fill();
            ctx.restore();
        }
    }

    // 2. Constellation Dots & Interactive Network Lines
    const dots = [];
    class Dot {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.color = Math.random() > 0.45 ? 'rgba(246, 188, 24, ' : (Math.random() > 0.5 ? 'rgba(26, 16, 82, ' : 'rgba(37, 99, 235, ');
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.7)';
            ctx.fill();
        }
    }

    function initElements() {
        bubbles.length = 0;
        dots.length = 0;

        for (let i = 0; i < 20; i++) bubbles.push(new Bubble());
        for (let i = 0; i < 50; i++) dots.push(new Dot());
    }

    function drawLines() {
        const maxDist = 120;
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);

                    const grad = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
                    grad.addColorStop(0, dots[i].color + alpha + ')');
                    grad.addColorStop(1, dots[j].color + alpha + ')');

                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }

            // Interactive Line Connection to Mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = dots[i].x - mouse.x;
                const dy = dots[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(246, 188, 24, ' + alpha + ')';
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawLines();
        dots.forEach(d => { d.update(); d.draw(); });
        bubbles.forEach(b => { b.update(); b.draw(); });
        requestAnimationFrame(animate);
    }

    initElements();
    animate();
}

/**
 * 1. HOME PAGE: Interactive Constellation & Mouse Particle Field
 */
function initHomeConstellationAnimation() {
    let canvas = document.getElementById('page-custom-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'page-custom-canvas';
        canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-50 dark:opacity-65';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 65;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.2 + 1,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            color: Math.random() > 0.4 ? 'rgba(246, 188, 24, ' : (Math.random() > 0.5 ? 'rgba(26, 16, 82, ' : 'rgba(37, 99, 235, ')
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + '0.7)';
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 2. PORTFOLIO PAGE: Golden Hexagonal Matrix & Rising Laser Rays
 */
function initPortfolioHexMatrixAnimation() {
    let canvas = document.getElementById('page-custom-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'page-custom-canvas';
        canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-45 dark:opacity-60';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const hexagons = [];
    for (let i = 0; i < 35; i++) {
        hexagons.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 18 + 12,
            speedY: - (Math.random() * 0.6 + 0.2),
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function drawHexagon(x, y, size, angle, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const a = (i * Math.PI) / 3;
            const hx = size * Math.cos(a);
            const hy = size * Math.sin(a);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(246, 188, 24, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        hexagons.forEach(h => {
            h.y += h.speedY;
            h.rotation += h.rotSpeed;
            if (h.y < -50) h.y = height + 50;

            drawHexagon(h.x, h.y, h.size, h.rotation, h.alpha);
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 3. SERVICES PAGE: Digital Pulse Circuit Lines & Data Flashes
 */
function initServicesCircuitAnimation() {
    let canvas = document.getElementById('page-custom-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'page-custom-canvas';
        canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-55';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const pulses = [];
    for (let i = 0; i < 25; i++) {
        pulses.push({
            x: Math.random() * width,
            y: Math.floor(Math.random() * 15) * (height / 15),
            length: Math.random() * 120 + 60,
            speed: Math.random() * 3 + 1.5,
            color: Math.random() > 0.5 ? '246, 188, 24' : '114, 12, 19'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        pulses.forEach(p => {
            p.x += p.speed;
            if (p.x > width + p.length) p.x = -p.length;

            const grad = ctx.createLinearGradient(p.x, p.y, p.x - p.length, p.y);
            grad.addColorStop(0, `rgba(${p.color}, 0.8)`);
            grad.addColorStop(1, `rgba(${p.color}, 0)`);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.length, p.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, 1)`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 4. ABOUT PAGE: Golden Aurora Waves & Drifting Stardust
 */
function initAboutAuroraWaveAnimation() {
    let canvas = document.getElementById('page-custom-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'page-custom-canvas';
        canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-45 dark:opacity-60';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let tick = 0;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        tick += 0.015;

        ctx.beginPath();
        ctx.moveTo(0, height * 0.4);
        for (let x = 0; x < width; x += 20) {
            const y = Math.sin(x * 0.003 + tick) * 50 + Math.cos(x * 0.002 + tick * 0.8) * 30 + height * 0.4;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(246, 188, 24, 0.25)';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, height * 0.6);
        for (let x = 0; x < width; x += 20) {
            const y = Math.cos(x * 0.004 - tick * 1.2) * 60 + Math.sin(x * 0.0015 + tick) * 40 + height * 0.6;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(26, 16, 82, 0.2)';
        ctx.lineWidth = 3;
        ctx.stroke();

        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 5. CAREERS PAGE: Upward Rising Golden Spark Beams
 */
function initCareersSparkMatrixAnimation() {
    let canvas = document.getElementById('page-custom-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'page-custom-canvas';
        canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-50 dark:opacity-65';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const sparks = [];
    for (let i = 0; i < 40; i++) {
        sparks.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            vy: - (Math.random() * 1.2 + 0.4),
            vx: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.6 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        sparks.forEach(s => {
            s.y += s.vy;
            s.x += s.vx;
            if (s.y < 0) {
                s.y = height + 10;
                s.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(246, 188, 24, ${s.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(246, 188, 24, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * 6. CONTACT & PITCH PAGES: Interactive Magnetic Pulse Grid
 */
function initContactMagneticGridAnimation() {
    let canvas = document.getElementById('page-custom-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'page-custom-canvas';
        canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-55';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const spacing = 45;
    const mouse = { x: -1000, y: -1000 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let x = spacing / 2; x < width; x += spacing) {
            for (let y = spacing / 2; y < height; y += spacing) {
                const dx = mouse.x - x;
                const dy = mouse.y - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let radius = 1.2;
                let color = 'rgba(150, 150, 150, 0.25)';

                if (dist < 160) {
                    radius = 1.2 + (1 - dist / 160) * 3.5;
                    color = `rgba(246, 188, 24, ${0.8 - (dist / 160) * 0.5})`;
                }

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Global Search Overlay System (Accenture Standard)
 */
function initSearchOverlay() {
    const searchModal = document.getElementById('global-search-modal');
    const searchOpenBtns = document.querySelectorAll('.search-trigger-btn');
    const searchCloseBtn = document.getElementById('search-modal-close');
    const searchOverlay = document.getElementById('search-modal-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results-list');
    const topicChips = document.querySelectorAll('.search-chip');

    if (!searchModal) return;

    function openSearch() {
        searchModal.classList.remove('hidden');
        searchModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
    }

    function closeSearch() {
        searchModal.classList.add('hidden');
        searchModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        if (searchInput) searchInput.value = '';
        filterSearchResults('');
    }

    searchOpenBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
    if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (searchModal.classList.contains('hidden')) {
                openSearch();
            } else {
                closeSearch();
            }
        }
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
            closeSearch();
        }
    });

    if (searchInput && searchResultsContainer) {
        searchInput.addEventListener('input', (e) => {
            filterSearchResults(e.target.value.trim().toLowerCase());
        });
    }

    topicChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query') || chip.textContent.trim();
            if (searchInput) {
                searchInput.value = query;
                filterSearchResults(query.toLowerCase());
            }
        });
    });
}

function filterSearchResults(query) {
    const items = document.querySelectorAll('#search-results-list .search-item');
    let matchCount = 0;

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const keywords = item.getAttribute('data-keywords') || '';
        if (!query || text.includes(query) || keywords.toLowerCase().includes(query)) {
            item.classList.remove('hidden');
            matchCount++;
        } else {
            item.classList.add('hidden');
        }
    });

    const noResults = document.getElementById('search-no-results');
    if (noResults) {
        if (matchCount === 0 && query !== '') {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    }
}

/**
 * Topic Micro-Filters for Home & Portfolio Cards
 */
function initTopicMicroFilters() {
    const filterBtns = document.querySelectorAll('.topic-filter-btn');
    const filterableCards = document.querySelectorAll('.filterable-card');

    if (filterBtns.length === 0 || filterableCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-lg');
                b.classList.add('bg-white/80', 'dark:bg-white/5', 'text-gray-700', 'dark:text-gray-300', 'border', 'border-primary/10');
            });

            btn.classList.remove('bg-white/80', 'dark:bg-white/5', 'text-gray-700', 'dark:text-gray-300', 'border', 'border-primary/10');
            btn.classList.add('bg-primary', 'text-white', 'shadow-lg');

            const category = btn.getAttribute('data-category');

            filterableCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category || (cardCat && cardCat.includes(category))) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * W3C Accessible Auto-Rotating Carousel with Play/Pause & Counter
 */
function initAccessibleCarousel() {
    const carousel = document.getElementById('accenture-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const playPauseBtn = carousel.querySelector('.carousel-play-pause');
    const playPauseIcon = carousel.querySelector('.carousel-play-pause-icon');
    const counterDisplay = carousel.querySelector('.carousel-counter');
    const progressBar = carousel.querySelector('.carousel-progress-bar');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let isPlaying = true;
    let autoPlayTimer = null;
    const intervalDuration = 5000;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (counterDisplay) {
            counterDisplay.textContent = `${currentIndex + 1} / ${totalSlides}`;
        }

        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            if (isPlaying) {
                setTimeout(() => {
                    progressBar.style.transition = `width ${intervalDuration}ms linear`;
                    progressBar.style.width = '100%';
                }, 50);
            }
        }

        slides.forEach((slide, idx) => {
            slide.setAttribute('aria-hidden', idx === currentIndex ? 'false' : 'true');
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function startAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        isPlaying = true;
        if (playPauseIcon) playPauseIcon.textContent = 'pause';
        if (playPauseBtn) playPauseBtn.setAttribute('aria-label', 'Pause auto-rotating carousel');
        updateCarousel();
        autoPlayTimer = setInterval(nextSlide, intervalDuration);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        isPlaying = false;
        if (playPauseIcon) playPauseIcon.textContent = 'play_arrow';
        if (playPauseBtn) playPauseBtn.setAttribute('aria-label', 'Play auto-rotating carousel');
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
        }
    }

    function togglePlayPause() {
        if (isPlaying) stopAutoPlay();
        else startAutoPlay();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); if (isPlaying) startAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); if (isPlaying) startAutoPlay(); });
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);

    carousel.addEventListener('mouseenter', () => {
        if (isPlaying && autoPlayTimer) clearInterval(autoPlayTimer);
    });

    carousel.addEventListener('mouseleave', () => {
        if (isPlaying) startAutoPlay();
    });

    startAutoPlay();
}

/**
 * Card Quick-View & Detail Reveal Modal Engine
 */
function initCardQuickView() {
    const modal = document.getElementById('card-detail-modal');
    const closeBtn = document.getElementById('card-detail-close');
    const overlay = document.getElementById('card-detail-overlay');
    const triggers = document.querySelectorAll('.card-quickview-btn');

    if (!modal) return;

    const titleEl = document.getElementById('modal-card-title');
    const categoryEl = document.getElementById('modal-card-category');
    const descEl = document.getElementById('modal-card-desc');
    const metricsEl = document.getElementById('modal-card-metrics');
    const stackEl = document.getElementById('modal-card-stack');
    const linkEl = document.getElementById('modal-card-link');

    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const title = btn.getAttribute('data-title') || 'Project Case Study';
            const category = btn.getAttribute('data-category') || 'Enterprise Solution';
            const desc = btn.getAttribute('data-desc') || 'Full-scale digital architecture delivered with high performance, scalability, and security standard.';
            const metrics = btn.getAttribute('data-metrics') || '300% Speed Boost • 99.99% Uptime';
            const stack = btn.getAttribute('data-stack') || 'Spring Boot, Tailwind CSS, Next.js, MySQL';
            const link = btn.getAttribute('data-link');

            if (titleEl) titleEl.textContent = title;
            if (categoryEl) categoryEl.textContent = category;
            if (descEl) descEl.textContent = desc;
            if (metricsEl) metricsEl.textContent = metrics;

            if (linkEl) {
                if (link) {
                    linkEl.href = link;
                    linkEl.classList.remove('hidden');
                } else {
                    linkEl.classList.add('hidden');
                }
            }

            if (stackEl) {
                stackEl.innerHTML = '';
                stack.split(',').forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-primary/10 text-primary border border-primary/20';
                    span.textContent = tech.trim();
                    stackEl.appendChild(span);
                });
            }

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

/**
 * Light & Integrated Navigation Mega-Menu Dropdown Engine
 * Features:
 * - Clean, integrated white container (bg-white, border border-gray-200/80, shadow-xl shadow-black/5, rounded-2xl)
 * - Comfortably padded content (p-5), clear typography, comfortable spacing
 * - Hover bridge preventing dropdown dropouts
 * - Smooth 0.2s opacity & slide-down transition
 */
function initLightNavigationDropdown() {
    const header = document.querySelector('header');
    const nav = header ? header.querySelector('nav') : null;
    if (!header || !nav) return;

    const navItems = Array.from(nav.children).filter(item => {
        return item.querySelector('div[class*="absolute"]');
    });

    if (navItems.length === 0) return;

    header.classList.add('light-nav-enabled');

    if (!document.getElementById('light-nav-styles')) {
        const style = document.createElement('style');
        style.id = 'light-nav-styles';
        style.textContent = `
            header.light-nav-enabled nav div.group > div.absolute {
                display: none !important;
            }
            .light-dropdown-root {
                position: absolute;
                top: 100%;
                z-index: 100;
                pointer-events: none;
                opacity: 0;
                transform: translateY(4px);
                transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .light-dropdown-root.is-active {
                pointer-events: auto;
                opacity: 1;
                transform: translateY(8px);
            }
            .light-dropdown-bg {
                background: #ffffff;
                border: 1px solid rgba(229, 231, 235, 0.9);
                border-radius: 1rem;
                box-shadow: 0 16px 36px -10px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
                overflow: hidden;
                transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .light-dropdown-section {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.18s ease;
            }
            .light-dropdown-section.is-current {
                opacity: 1;
                pointer-events: auto;
            }
            .light-hover-bridge {
                position: absolute;
                top: -16px;
                left: 0;
                right: 0;
                height: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    let root = header.querySelector('.light-dropdown-root');
    if (!root) {
        root = document.createElement('div');
        root.className = 'light-dropdown-root';
        root.innerHTML = `
            <div class="light-hover-bridge"></div>
            <div class="light-dropdown-bg">
                <div class="light-dropdown-content-container relative w-full h-full"></div>
            </div>
        `;
        header.style.position = 'relative';
        header.appendChild(root);
    }

    const dropdownBg = root.querySelector('.light-dropdown-bg');
    const contentContainer = root.querySelector('.light-dropdown-content-container');

    const sections = [];
    let currentIndex = -1;
    let hideTimer = null;

    navItems.forEach((item, idx) => {
        const trigger = item.querySelector('a');
        const originalDropdown = item.querySelector('div[class*="absolute"]');
        if (!trigger || !originalDropdown) return;

        const section = document.createElement('div');
        section.className = 'light-dropdown-section p-5';
        section.setAttribute('data-index', idx);
        section.innerHTML = originalDropdown.innerHTML;
        contentContainer.appendChild(section);

        sections.push({
            trigger,
            item,
            section,
            index: idx
        });

        item.addEventListener('mouseenter', () => showSection(idx));
    });

    function showSection(targetIdx) {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }

        const target = sections[targetIdx];
        if (!target) return;

        currentIndex = targetIdx;

        const headerRect = header.getBoundingClientRect();
        const itemRect = target.item.getBoundingClientRect();

        target.section.style.visibility = 'hidden';
        target.section.style.display = 'block';
        target.section.classList.remove('is-current');

        const contentWidth = target.section.offsetWidth || 320;
        const contentHeight = target.section.offsetHeight || 160;

        target.section.style.visibility = '';
        target.section.style.display = '';

        const itemCenter = (itemRect.left - headerRect.left) + (itemRect.width / 2);
        let leftPos = itemCenter - (contentWidth / 2);

        const minLeft = 16;
        const maxLeft = headerRect.width - contentWidth - 16;
        leftPos = Math.max(minLeft, Math.min(leftPos, maxLeft));

        root.style.left = `${leftPos}px`;
        dropdownBg.style.width = `${contentWidth}px`;
        dropdownBg.style.height = `${contentHeight}px`;

        sections.forEach((sec, i) => {
            if (i === targetIdx) {
                sec.section.classList.add('is-current');
            } else {
                sec.section.classList.remove('is-current');
            }
        });

        root.classList.add('is-active');

        sections.forEach(sec => {
            const arrowIcon = sec.trigger.querySelector('.material-symbols-outlined');
            if (arrowIcon) {
                arrowIcon.style.transition = 'transform 0.2s ease';
                arrowIcon.style.transform = sec.index === targetIdx ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }

    function hideDropdown() {
        hideTimer = setTimeout(() => {
            root.classList.remove('is-active');
            currentIndex = -1;

            sections.forEach(sec => {
                const arrowIcon = sec.trigger.querySelector('.material-symbols-outlined');
                if (arrowIcon) arrowIcon.style.transform = 'rotate(0deg)';
            });
        }, 150);
    }

    header.addEventListener('mouseleave', hideDropdown);
    root.addEventListener('mouseenter', () => {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
    });
    root.addEventListener('mouseleave', hideDropdown);
}

/**
 * 11. Animated Stat Number Counters
 * Finds elements with data-counter or numeric stats in hero/sections and animates them on scroll
 */
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('[data-counter], .stat-number');
    if (counterElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('has-animated')) {
                entry.target.classList.add('has-animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counterElements.forEach(el => observer.observe(el));

    function animateCounter(el) {
        const text = el.textContent.trim();
        const match = text.match(/^([^\d]*)([\d\.]+)([^\d]*)$/);
        if (!match) return;

        const prefix = match[1] || '';
        const targetVal = parseFloat(match[2]);
        const suffix = match[3] || '';
        const duration = 1400; // ms
        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = (targetVal * easeProgress).toFixed(match[2].includes('.') ? 1 : 0);

            el.textContent = `${prefix}${currentVal}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = text;
            }
        }
        requestAnimationFrame(update);
    }
}

/**
 * 12. Smooth Page Transitions & Link Interception
 */
function initPageTransitions() {
    let overlay = document.getElementById('page-transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:#ffffff;z-index:99999;pointer-events:none;opacity:0;transition:opacity 0.2s ease-out;';
        document.body.appendChild(overlay);
    }

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || link.getAttribute('target') === '_blank') return;

        link.addEventListener('click', (e) => {
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;
            e.preventDefault();
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            setTimeout(() => {
                window.location.href = href;
            }, 200);
        });
    });

    window.addEventListener('pageshow', () => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
    });
}

/**
 * 13. Staggered Reveals
 */
function initParallaxAndStagger() {
    const cardGrids = document.querySelectorAll('.grid');
    cardGrids.forEach(grid => {
        const children = Array.from(grid.children);
        children.forEach((child, i) => {
            if (child.classList.contains('reveal-fade-up') || child.classList.contains('reveal-scale') || child.classList.contains('glow-card')) {
                child.style.transitionDelay = `${(i % 4) * 60}ms`;
            }
        });
    });
}

/**
 * 14. Global UI Micro-Interaction & Form Polish
 */
function initGlobalUiPolish() {
    if (document.getElementById('global-ui-polish-styles')) return;
    const style = document.createElement('style');
    style.id = 'global-ui-polish-styles';
    style.textContent = `
        button, .btn, a.bg-primary {
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        button:active, a.bg-primary:active {
            transform: scale(0.98) !important;
        }
        input:focus, select:focus, textarea:focus {
            box-shadow: 0 0 0 3px rgba(26, 16, 82, 0.12) !important;
            border-color: #1a1052 !important;
        }
        footer a {
            transition: color 0.2s ease;
        }
        footer a:hover {
            color: #1a1052 !important;
        }
        /* 360px Mobile Viewport Optimizations */
        @media (max-width: 380px) {
            #mobile-menu-drawer > div:last-child {
                width: 82vw !important;
                max-width: 290px !important;
            }
            h1 {
                font-size: 2.25rem !important;
                line-height: 1.15 !important;
            }
            footer {
                padding-left: 1rem !important;
                padding-right: 1rem !important;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 15. Logo Hover Interaction (Requirement 6)
 * Default state: Display logo icon only.
 * Hover state: Logo smoothly disappears (-translate-y-full opacity-0), "Rage Labs" slides up from below (+translate-y-0 opacity-100).
 * Fixed container prevents layout shift.
 */
function initLogoHoverInteraction() {
    const containers = document.querySelectorAll('.rage-logo-hover-container');
    containers.forEach(container => {
        const iconState = container.querySelector('.logo-icon-state');
        const textState = container.querySelector('.logo-text-state');
        if (!iconState || !textState) return;

        // Ensure fixed dimensions & smooth transition inline fallback
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
    });
}
