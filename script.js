document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // GRAPHIC ANIMATION: INTERACTIVE CANVAS NETWORK BACKGROUND
    // ============================================================
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // Resize handler
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        });

        // Particle class definition
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8;
                this.vy = (Math.random() - 0.5) * 0.8;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off canvas boundaries
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#10b981'; // Emerald green theme accent
                ctx.fill();
            }
        }

        let particles = [];
        function initParticles() {
            particles = [];
            const particleCount = Math.floor((width * height) / 12000); // Responsive particle count
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw particles and connecting network lines
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Connect particles close to each other with a subtle line
                    if (distance < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(16, 185, 129, ${1 - distance / 110})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    }
    
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