document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const submenuTriggers = document.querySelectorAll('.submenu-trigger');
    const backToTopBtn = document.querySelector('.back-to-top');
    const contentImages = document.querySelectorAll('.content-image');

    // Mobile menu functionality
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Close all submenus when main menu is toggled
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
        });
    }

    // Submenu toggle for mobile
    if (submenuTriggers.length > 0) {
        submenuTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 767) {
                    e.preventDefault(); // Prevent navigating to the link
                    const submenu = trigger.nextElementSibling;
                    const isActive = submenu.classList.contains('active');

                    // Close all other submenus
                    document.querySelectorAll('.submenu').forEach(sub => {
                        sub.classList.remove('active');
                    });

                    // Toggle the current submenu
                    if (!isActive) {
                        submenu.classList.add('active');
                    }
                }
            });
        });
    }

    // Ensure submenu links are clickable
    document.querySelectorAll('.submenu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent submenu toggle when clicking a link
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 767 && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
        }
    });

    // Back to Top button functionality
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Image zoom functionality
    if (contentImages.length > 0) {
        contentImages.forEach(image => {
            const container = image.closest('.image-container');
            const zoomInBtn = container.querySelector('.zoom-in');
            const zoomOutBtn = container.querySelector('.zoom-out');
            
            let scale = 1;
            const scaleStep = 0.2;
            const minScale = 1;
            const maxScale = 2;

            const updateZoom = () => {
                image.style.transform = `scale(${scale})`;
            };

            if (zoomInBtn) {
                zoomInBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (scale < maxScale) {
                        scale += scaleStep;
                        updateZoom();
                    }
                });
            }

            if (zoomOutBtn) {
                zoomOutBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (scale > minScale) {
                        scale -= scaleStep;
                        updateZoom();
                    }
                });
            }

            image.addEventListener('click', () => {
                scale = 1;
                updateZoom();
            });
        });
    }
});