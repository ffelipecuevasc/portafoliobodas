/* ═══════════════════════════════════════════════════
   THEME SYSTEM
   ═══════════════════════════════════════════════════ */

(function () {
    const html         = document.documentElement;
    const toggleBtn    = document.getElementById('theme-toggle');
    const STORAGE_KEY  = 'fc-portfolio-theme';

    /**
     * Apply a theme ('light' | 'dark') to the document.
     * Also toggles the Tailwind 'dark' class for any
     * Tailwind dark: utilities used in the markup.
     */
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);

        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    /**
     * Restore the user's last choice (or system preference
     * on first visit).
     */
    function initTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            applyTheme(saved);
            return;
        }

        // Respect OS-level preference on first visit
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    /**
     * Toggle between light and dark, persist choice.
     */
    function toggleTheme() {
        const current = html.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';

        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);

        // Brief rotation animation feedback
        toggleBtn.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.28s, color 0.28s';
        toggleBtn.style.transform  = 'rotate(360deg) scale(1.1)';

        setTimeout(() => {
            toggleBtn.style.transform = '';
        }, 420);
    }

    // ── Wire up ──
    toggleBtn.addEventListener('click', toggleTheme);
    initTheme();


    /* ═══════════════════════════════════════════════════
       CARD HOVER — subtle card image brightness boost
       ═══════════════════════════════════════════════════ */

    document.querySelectorAll('.card').forEach(card => {
        const thumb = card.querySelector('.thumb');
        if (!thumb) return;

        card.addEventListener('mouseenter', () => {
            thumb.style.filter = 'brightness(1.06)';
        });

        card.addEventListener('mouseleave', () => {
            thumb.style.filter = '';
        });
    });


    /* ═══════════════════════════════════════════════════
       SCROLL-AWARE NAVBAR SHADOW
       Makes the navbar slightly more prominent when
       the right column is scrolled down.
       ═══════════════════════════════════════════════════ */

    const navbar   = document.getElementById('navbar');
    const rightCol = document.getElementById('right-col');

    if (rightCol) {
        rightCol.addEventListener('scroll', () => {
            if (rightCol.scrollTop > 10) {
                navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
            } else {
                navbar.style.boxShadow = '';
            }
        }, { passive: true });
    }

})();