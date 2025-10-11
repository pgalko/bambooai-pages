// Replace with your Google Apps Script deployment URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRf20J8lqnIpSdeEZ6HEumJYiV-AFwkZZmHk3mbjSAgu6V4awVPFATajAyNRiTuuK6/exec';

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
    video.pause();
    video.currentTime = 0;
}

async function submitWaitlistForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Get user IP
    let userIP = 'unknown';
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        userIP = ipData.ip;
    } catch (error) {
        console.log('Could not get IP');
    }
    
    // Get form data
    const formData = new FormData();
    formData.append('name', form.name.value);
    formData.append('email', form.email.value);
    formData.append('reason', form.reason.value);
    formData.append('userIP', userIP);
    
    // Update button state
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.text();
        
        if (result.includes('success')) {
            // Success - show confirmation and reset form
            submitButton.textContent = 'Added to Waitlist! ✓';
            submitButton.style.background = 'linear-gradient(135deg, #50fa7b 0%, #3dd688 100%)';
            submitButton.style.color = '#0a0a0a';
            form.reset();
            
            // Auto close modal after 2 seconds
            setTimeout(() => {
                hideWaitlist();
                // Reset button after modal closes
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.style.color = '';
                    submitButton.disabled = false;
                }, 300);
            }, 2000);
        } else {
            // Handle specific errors based on server response
            let errorMessage = 'Please try again.';
            
            if (result.includes('missing fields')) {
                errorMessage = 'Please fill in all fields.';
            } else if (result.includes('invalid email')) {
                errorMessage = 'Please enter a valid email address.';
            } else if (result.includes('duplicate email')) {
                errorMessage = 'This email is already on our waitlist!';
            } else if (result.includes('please provide more details')) {
                errorMessage = 'Please tell us more about why you\'re interested (at least 15 characters).';
            } else if (result.includes('rate limit exceeded')) {
                errorMessage = 'Too many submissions from your location. Please try again later.';
            } else if (result.includes('server error')) {
                errorMessage = 'Server error occurred. Please try again in a moment.';
            }
            
            alert(errorMessage);
            
            submitButton.textContent = 'Try Again';
            submitButton.disabled = false;
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Network error. Please try again.');
        
        submitButton.textContent = 'Try Again';
        submitButton.disabled = false;
    }
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

// Add form submission listener when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.querySelector('.waitlist-form');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', submitWaitlistForm);
    }
});

// ============================================
// SCREENSHOT SHOWCASE FUNCTIONALITY
// ============================================

// Tab System
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabSubtitle = document.getElementById('tabSubtitle');
    
    // Tab subtitles
    const subtitles = {
        'discover': 'The journey begins',
        'analyze': 'Deep dive into data',
        'configure': 'Your control center',
        'optimize': 'Refine your workflow'
    };
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Fade out current content
            tabSubtitle.style.opacity = '0';
            
            setTimeout(() => {
                // Update subtitle
                tabSubtitle.textContent = subtitles[targetTab];
                tabSubtitle.style.opacity = '1';
                
                // Switch tab panes
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    // Reset animations
                    const items = pane.querySelectorAll('.screenshot-item');
                    items.forEach(item => {
                        item.style.animation = 'none';
                    });
                });
                
                // Activate new pane
                const newPane = document.getElementById(targetTab);
                newPane.classList.add('active');
                
                // Trigger animations for new content
                setTimeout(() => {
                    const items = newPane.querySelectorAll('.screenshot-item');
                    items.forEach((item, index) => {
                        item.style.animation = `fadeInUp 0.5s ease ${0.1 * (index + 1)}s forwards`;
                    });
                }, 10);
            }, 200);
        });
    });
});

// Lightbox Modal
function openScreenshotModal(imageSrc, caption) {
    const modal = document.getElementById('screenshotModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = imageSrc;
    modalImage.alt = caption;
    modalCaption.textContent = caption;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeScreenshotModal() {
    const modal = document.getElementById('screenshotModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on background click
document.getElementById('screenshotModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeScreenshotModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('screenshotModal');
    
    // Close on ESC
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeScreenshotModal();
    }
    
    // Arrow key navigation in modal
    if (modal.classList.contains('active')) {
        const activeTab = document.querySelector('.tab-pane.active');
        const items = Array.from(activeTab.querySelectorAll('.screenshot-item'));
        const currentSrc = document.getElementById('modalImage').src;
        const currentIndex = items.findIndex(item => 
            item.querySelector('img').src === currentSrc
        );
        
        if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
            const nextItem = items[currentIndex + 1];
            const nextImg = nextItem.querySelector('img');
            const nextLabel = nextItem.querySelector('.screenshot-label').textContent;
            openScreenshotModal(nextImg.src, nextLabel);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const prevItem = items[currentIndex - 1];
            const prevImg = prevItem.querySelector('img');
            const prevLabel = prevItem.querySelector('.screenshot-label').textContent;
            openScreenshotModal(prevImg.src, prevLabel);
        }
    }
});

// Preload images for smooth transitions
window.addEventListener('load', function() {
    const images = document.querySelectorAll('.screenshot-frame img');
    images.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });
});
