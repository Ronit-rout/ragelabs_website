/**
 * Rage Labs Web Components & Template Partial Loader System
 * Provides top-level (<rage-navbar>, <rage-footer>, <rage-modals>)
 * and granular custom elements (<rage-footer-container>, <rage-navbar-logo>, etc.)
 */

const componentMap = {
    // Top-level components
    'rage-navbar': '/components/navbar.html',
    'rage-footer': '/components/footer.html',
    'rage-modals': '/components/modals.html'
};

async function loadComponent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
    } catch (e) {
        console.error(`Failed to load component from ${url}:`, e);
        return '';
    }
}

async function renderComponent(element, url) {
    const html = await loadComponent(url);
    if (html) {
        const temp = document.createElement('div');
        temp.innerHTML = html.trim();
        
        // Replace current element with loaded content nodes
        element.replaceWith(...temp.childNodes);

        // Re-initialize navbar scripts/events if navbar components rendered
        if (url.includes('navbar')) {
            if (typeof initAuth === 'function') initAuth();
            if (window.initNavbarEvents) window.initNavbarEvents();
        }
    }
}

function initCustomElements() {
    Object.entries(componentMap).forEach(([tagName, url]) => {
        if (!customElements.get(tagName)) {
            customElements.define(tagName, class extends HTMLElement {
                async connectedCallback() {
                    await renderComponent(this, url);
                }
            });
        }
    });
}

// Register all Web Components
initCustomElements();

window.initNavbarEvents = function() {
    // 1. Mobile Menu Events
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileMenuBtn && mobileMenuDrawer) {
        mobileMenuBtn.onclick = () => {
            mobileMenuDrawer.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        };
    }
    if (mobileMenuCloseBtn && mobileMenuDrawer) {
        mobileMenuCloseBtn.onclick = () => {
            mobileMenuDrawer.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        };
    }
    if (mobileMenuOverlay && mobileMenuDrawer) {
        mobileMenuOverlay.onclick = () => {
            mobileMenuDrawer.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        };
    }

    // 2. Active Navigation Link Highlighting
    const rawPath = window.location.pathname.replace(/\/$/, '') || '/';
    let cleanSegment = rawPath.split('/').pop().replace(/\.html$/, '').toLowerCase();
    
    // Normalize aliases: /capabilities, /see-what-we-do, /s -> work, /what-we-think -> insights
    if (cleanSegment === 'capabilities' || cleanSegment === 's' || cleanSegment === 'see-what-we-do' || cleanSegment === 'work') cleanSegment = 'work';
    if (cleanSegment === 'insights' || cleanSegment === 'what-we-think') cleanSegment = 'insights';

    document.querySelectorAll('header nav a, #mobile-menu-drawer nav a').forEach(link => {
        const href = (link.getAttribute('href') || '').replace(/\/$/, '');
        let hrefSegment = href.split('/').pop().replace(/\.html$/, '').toLowerCase();
        if (hrefSegment === 'capabilities' || hrefSegment === 's' || hrefSegment === 'see-what-we-do' || hrefSegment === 'work') hrefSegment = 'work';
        if (hrefSegment === 'insights' || hrefSegment === 'what-we-think') hrefSegment = 'insights';
        
        const isMatch = (href === rawPath) || 
                        (cleanSegment !== '' && hrefSegment === cleanSegment) || 
                        ((rawPath === '/' || cleanSegment === '') && (href === '/' || hrefSegment === 'index'));

        if (isMatch) {
            link.classList.add('text-accent-yellow');
            link.classList.remove('text-white/90');
            if (!link.querySelector('.nav-active-bar') && link.closest('header nav')) {
                const bar = document.createElement('span');
                bar.className = 'nav-active-bar absolute -bottom-1 left-0 w-full h-[2.5px] bg-accent-yellow transition-all duration-300';
                link.appendChild(bar);
            }
        }
    });

    // 3. START PROJECT Button Page-Specific Visibility
    const path = window.location.pathname.toLowerCase();
    const isSeeWhatWeDo = path === '/work' || path.includes('/work') || path.includes('see-what-we-do') || path.includes('capabilities') || path === '/s';
    const isWhatWeThink = path === '/insights' || path.includes('/insights') || path.includes('what-we-think');

    const startProjectBtn = document.getElementById('start-project-btn');
    if (startProjectBtn) {
        if (isSeeWhatWeDo || isWhatWeThink) {
            startProjectBtn.classList.remove('hidden');
            startProjectBtn.classList.add('inline-flex');
        } else {
            startProjectBtn.classList.add('hidden');
            startProjectBtn.classList.remove('inline-flex');
        }
    }

    const mobileStartProjectBtn = document.getElementById('mobile-start-project-btn');
    if (mobileStartProjectBtn) {
        if (isSeeWhatWeDo || isWhatWeThink) {
            mobileStartProjectBtn.classList.remove('hidden');
            mobileStartProjectBtn.classList.add('flex');
        } else {
            mobileStartProjectBtn.classList.add('hidden');
            mobileStartProjectBtn.classList.remove('flex');
        }
    }
};

// Process data-include attributes for general HTML inclusion
document.addEventListener('DOMContentLoaded', async () => {
    if (window.initNavbarEvents) window.initNavbarEvents();

    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
        const url = el.getAttribute('data-include');
        if (url) {
            const html = await loadComponent(url);
            if (html) {
                const temp = document.createElement('div');
                temp.innerHTML = html.trim();
                el.replaceWith(...temp.childNodes);
            }
        }
    }
});


