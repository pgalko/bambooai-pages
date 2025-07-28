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

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        if (modalId === 'demoModal') {
            const video = document.getElementById('demoVideo');
            video.pause();
            video.currentTime = 0;
        }
    }
}

// Event Listeners for showing modals
document.getElementById('showComingSoon').addEventListener('click', function(event) {
    event.preventDefault();
    showModal('comingSoonModal');
});

document.getElementById('showWaitlist').addEventListener('click', function(event) {
    event.preventDefault();
    showModal('waitlistModal');
});

document.getElementById('showDemo').addEventListener('click', function(event) {
    event.preventDefault();
    showModal('demoModal');
});

// Event Listeners for hiding modals
document.getElementById('hideComingSoon').addEventListener('click', () => hideModal('comingSoonModal'));
document.getElementById('hideWaitlist').addEventListener('click', () => hideModal('waitlistModal'));
document.getElementById('hideDemoModal').addEventListener('click', () => hideModal('demoModal'));

// Close modals on background click
document.getElementById('comingSoonModal').addEventListener('click', function(event) {
    if (event.target === this) {
        hideModal('comingSoonModal');
    }
});

document.getElementById('waitlistModal').addEventListener('click', function(event) {
    if (event.target === this) {
        hideModal('waitlistModal');
    }
});

document.getElementById('demoModal').addEventListener('click', function(event) {
    if (event.target === this) {
        hideModal('demoModal');
    }
});

// Close modals on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideModal('comingSoonModal');
        hideModal('waitlistModal');
        hideModal('demoModal');
    }
});
