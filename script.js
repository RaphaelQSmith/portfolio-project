document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // 2. Betting Live-Odds Simulation
    const projectTechSpans = document.querySelectorAll('.project-tech');
    
    if (projectTechSpans.length > 0) {
        setInterval(() => {
            const mockOdd = (1.5 + Math.random() * 4).toFixed(2);
            const firstProjectHeader = projectTechSpans[0];
            firstProjectHeader.innerHTML = `Live Odds: ${mockOdd}x • React • Zustand`;
            firstProjectHeader.style.color = '#10b981';
            
            setTimeout(() => {
                firstProjectHeader.style.color = '#94a3b8';
            }, 500);
            
        }, 4000);
    }

    // 3. Technology Section Carousel Logic with Auto-Scroll
    const track = document.getElementById('techTrack');
    const prevBtn = document.getElementById('techPrev');
    const nextBtn = document.getElementById('techNext');

    if (track && prevBtn && nextBtn) {
        const scrollForward = () => {
            const card = track.querySelector('.tech-card');
            if (!card) return;
            
            const cardWidth = card.clientWidth + 24; // card width + gap
            
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
                track.scrollLeft = 0; 
            } else {
                track.scrollLeft += cardWidth; 
            }
        };

        nextBtn.addEventListener('click', () => {
            scrollForward();
            resetAutoScroll(); 
        });

        prevBtn.addEventListener('click', () => {
            const card = track.querySelector('.tech-card');
            if (!card) return;
            
            const cardWidth = card.clientWidth + 24;
            if (track.scrollLeft <= 0) {
                track.scrollLeft = track.scrollWidth; 
            } else {
                track.scrollLeft -= cardWidth;
            }
            resetAutoScroll(); 
        });

        let autoScrollTimer = setInterval(scrollForward, 3000); 

        function resetAutoScroll() {
            clearInterval(autoScrollTimer);
            autoScrollTimer = setInterval(scrollForward, 3000);
        }

        track.addEventListener('mouseenter', () => clearInterval(autoScrollTimer));
        track.addEventListener('mouseleave', () => {
            autoScrollTimer = setInterval(scrollForward, 3000);
        });
    }
});