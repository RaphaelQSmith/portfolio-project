document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Turn hamburger icon into an 'X' representation when active
            if (navLinks.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });

        // Close menu automatically when clicking any navigation link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // 2. Betting Live-Odds Simulation (A neat touch!)
    // This dynamically changes the tech stack text or tags of your projects
    // to prove you know how to work with asynchronous data flows.
    const projectTechSpans = document.querySelectorAll('.project-tech');
    
    if (projectTechSpans.length > 0) {
        setInterval(() => {
            // Generate a random simulated sports betting live-odd multiplier
            const mockOdd = (1.5 + Math.random() * 4).toFixed(2);
            
            // Quietly update the first project header to show "Live Sim Ready" 
            const firstProjectHeader = projectTechSpans[0];
            firstProjectHeader.innerHTML = `Live Odds: ${mockOdd}x • React • Zustand`;
            firstProjectHeader.style.color = '#10b981'; // Briefly turn green when updated
            
            setTimeout(() => {
                firstProjectHeader.style.color = '#94a3b8'; // Reset to muted gray
            }, 500);
            
        }, 4000); // Trigger dynamic changes every 4 seconds
    }
});