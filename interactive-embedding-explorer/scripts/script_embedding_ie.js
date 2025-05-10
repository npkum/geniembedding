const sentences = [
    "Investment banks are adopting AI-driven tools for risk management.",
    "Electric vehicles are becoming increasingly popular due to environmental concerns.",
    "Robo-advisors are becoming a preferred choice for managing personal investments.",
    "Remote work has transformed how companies operate across the globe.",
    "The stock market reacted positively to the latest economic reports.",
    "Vaccinations have significantly reduced the spread of infectious diseases.",
    "Smartphones have become essential tools for communication and productivity.",
    "Global warming poses serious threats to the environment and human life.",
    "Green bonds are gaining popularity among environmentally conscious investors.",
    "Space exploration is unlocking new possibilities for the future of humanity."
];

const plotContents = {
    technology: `

    `,
    space: `
        <h2>Space and Future</h2>
        <p>Explore embeddings for space exploration and future possibilities.</p>
        <div style="width:100%;height:500px;background:#f0f0f0;text-align:center;padding-top:50px;">
            plot_space.html
        </div>
    `,
    environment: `
        <h2>Environment and Climate Change</h2>
        <p>Visualizations of embeddings for environmental and climate change topics.</p>
        <div style="width:100%;height:500px;background:#f0f0f0;text-align:center;padding-top:50px;">
            plot_environment.html
        </div>
    `,
    investment: `
        <h2>Investment and Risk</h2>
        <p>Embeddings related to investment strategies and risk management.</p>
        <div style="width:100%;height:500px;background:#f0f0f0;text-align:center;padding-top:50px;">
            plot_investement.html
        </div>
    `
};

function loadPlot() {
    const selected = document.getElementById("querySelect").value;
    const plotFrame = document.getElementById("plotFrame");
    plotFrame.innerHTML = plotContents[selected] || '<p>No content available.</p>';
}

function generateSentenceTable() {
    let tableHTML = '<table class="sentence-table">';
    tableHTML += `
        <thead>
            <tr>
                <th class="index-column">ID</th>
                <th>Original Sentence</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    sentences.forEach((sentence, index) => {
        tableHTML += `
            <tr>
                <td>${index}</td>
                <td>${sentence}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    document.getElementById('sentenceTable').innerHTML = tableHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    // Generate table on page load
    generateSentenceTable();

    // Load initial plot content
    loadPlot();

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