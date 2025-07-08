document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.querySelector('.main-header');
    let headerHeight = 0;

    const updateHeaderHeight = () => {
        headerHeight = 75;
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    const scrollToTarget = (targetElement, behavior = 'smooth') => {
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight; 

            window.scrollTo({
                top: offsetPosition,
                behavior: behavior
            });
        }
    };

    document.querySelectorAll('.main-nav a[href^="#"], .sidebar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            
            scrollToTarget(targetEl, 'smooth');
            
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    const contentSections = document.querySelectorAll('.content-section');
    const updateActiveLink = () => {
        let current = '';
        contentSections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= headerHeight + 5 && rect.bottom >= headerHeight + 5) { 
                current = sec.id;
            }
        });

        document.querySelectorAll('#sidebar-menu li a').forEach(link => {
            link.classList.remove('active');
        });
        const currentLink = document.querySelector(`#sidebar-menu li a[href="#${current}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    };
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); 

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const closeSidebarBtn = document.querySelector('.close-sidebar');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburgerMenu.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            document.documentElement.style.scrollBehavior = 'auto';
            
            scrollToTarget(targetElement, 'auto');

            setTimeout(() => {
                document.documentElement.style.scrollBehavior = 'smooth';
                updateActiveLink(); 
            }, 50);
        }
    }
});
