// contributors.js
document.addEventListener('DOMContentLoaded', () => {
    // **1. Smooth scrolling & mise à jour des liens actifs (votre code existant)**
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            const headerOffset = document.querySelector('.main-header').offsetHeight;
            const elementPos = targetEl.getBoundingClientRect().top + window.pageYOffset;
            const offsetPos = elementPos - headerOffset - 20;
            window.scrollTo({ top: offsetPos, behavior: 'smooth' });
        });
    });

    const contentSections = document.querySelectorAll('.content-section');
    const headerOffset = document.querySelector('.main-header').offsetHeight;
    const updateActiveLink = () => {
        let current = '';
        contentSections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= headerOffset + 50 && rect.bottom >= headerOffset + 50) {
                current = sec.id;
            }
        });
        document.querySelectorAll('#sidebar-menu li a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // **2. Toggle mobile sidebar + overlay**
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileSidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('.close-sidebar');

    hamburger.addEventListener('click', () => {
        mobileSidebar.classList.add('active');
        overlay.classList.add('active');
    });
    closeBtn.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    overlay.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});
