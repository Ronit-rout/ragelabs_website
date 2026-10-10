/**
 * Rage Labs Page Transitions & Clean URL Prefetching Module
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:#080612;z-index:9999;opacity:0;pointer-events:none;transition:opacity 0.12s;';
        document.body.prepend(overlay);

        document.addEventListener('click', function(e) {
            var link = e.target.closest('a');
            if (!link) return;
            var href = link.getAttribute('href');
            if (!href || href.charAt(0) === '#' || href.indexOf('http') === 0 || href.indexOf('mailto') === 0 || href.indexOf('javascript') === 0) return;
            e.preventDefault();
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            requestAnimationFrame(function() {
                setTimeout(function() { window.location.href = href; }, 80);
            });
        });

        // Prefetch clean routes
        ['/', '/services', '/careers', '/contact', '/about', '/portfolio', '/work', '/insights'].forEach(function(route) {
            var link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
        });
    });
})();
