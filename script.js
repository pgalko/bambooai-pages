// Create floating particles
        const particlesContainer = document.querySelector('.floating-particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (20 + Math.random() * 15) + 's';
            particlesContainer.appendChild(particle);
        }

        // Coming Soon Modal Functions
        function showComingSoon(event) {
            event.preventDefault();
            const modal = document.getElementById('comingSoonModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function hideComingSoon() {
            const modal = document.getElementById('comingSoonModal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Waitlist Modal Functions
        function showWaitlist(event) {
            event.preventDefault();
            const modal = document.getElementById('waitlistModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function hideWaitlist() {
            const modal = document.getElementById('waitlistModal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Demo Modal Functions
        function showDemoModal(event) {
            event.preventDefault();
            const modal = document.getElementById('demoModal');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function hideDemoModal() {
            const modal = document.getElementById('demoModal');
            const video = document.getElementById('demoVideo');
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Pause the video and reset its time to prevent it from playing in the background
            video.pause();
            video.currentTime = 0;
        }

        // Close modals on background click
        document.getElementById('comingSoonModal').addEventListener('click', function(event) {
            if (event.target === this) {
                hideComingSoon();
            }
        });

        document.getElementById('waitlistModal').addEventListener('click', function(event) {
            if (event.target === this) {
                hideWaitlist();
            }
        });

        document.getElementById('demoModal').addEventListener('click', function(event) {
            if (event.target === this) {
                hideDemoModal();
            }
        });

        // Close modals on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                hideComingSoon();
                hideWaitlist();
                hideDemoModal();
            }
        });
