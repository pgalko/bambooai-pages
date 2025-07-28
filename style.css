html {
    /* 
     * This is the global scaling control for the entire website.
     * 42% is the "sweet spot" you found. Adjust this single value
     * to make the entire UI larger or smaller.
    */
    font-size: 42%;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --accent-color: #50fa7b;
    --accent-hover: #3dd688;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    overflow-x: hidden;
    position: relative;
}

/* Animated background */
.background-animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(circle at 20% 80%, #2a2a2a 0%, #0a0a0a 50%);
}

.floating-particles {
    position: absolute;
    width: 100%;
    height: 100%;
}

.particle {
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    background: rgba(80, 250, 123, 0.8);
    border-radius: 50%;
    animation: float 20s infinite ease-in-out;
    filter: blur(0.08rem);
    box-shadow: 0 0 0.6rem rgba(80, 250, 123, 0.5);
}

@keyframes float {
    0% {
        transform: translateY(100vh) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-10rem) translateX(10rem);
        opacity: 0;
    }
}

/* Header */
header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 2rem 4rem;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(2rem);
    -webkit-backdrop-filter: blur(2rem);
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-content {
    max-width: 140rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 2.4rem;
    font-weight: 600;
}

.logo img {
    height: 4.6rem;
}

.logo span {
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 2.4rem;
}

.header-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0.8rem 1.6rem;
    border-radius: 1.6rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.header-link:hover {
    color: var(--accent-color);
    background: rgba(80, 250, 123, 0.1);
}

.header-link svg {
    width: 1.8rem;
    height: 1.8rem;
}

.app-button {
    padding: 1.4rem 3.2rem;
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
    border: none;
    border-radius: 2.4rem;
    color: #0a0a0a;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    display: inline-block;
    font-size: 1.5rem;
    letter-spacing: 0.05rem;
}

.app-button:hover {
    transform: translateY(-0.2rem) scale(1.02);
    box-shadow: 0 1.2rem 2.4rem rgba(80, 250, 123, 0.35);
}

/* Main content */
.main-content {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10rem 4rem;
    position: relative;
}

.hero-section {
    max-width: 100rem;
    text-align: center;
    z-index: 1;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    padding: 8rem 6rem;
    border-radius: 3.2rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.3);
}

.tagline {
    font-size: 1.6rem;
    color: var(--accent-color);
    margin-bottom: 3rem;
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    opacity: 0;
    animation: fadeInUp 1s ease forwards;
    font-weight: 500;
}

.main-title {
    font-size: clamp(3.6rem, 6vw, 7.2rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 4rem;
    opacity: 0;
    animation: fadeInUp 1s ease 0.2s forwards;
}

.philosophy-text {
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 5rem;
    opacity: 0;
    animation: fadeInUp 1s ease 0.4s forwards;
}

.philosophy-text em {
    color: var(--accent-color);
    font-style: normal;
    font-weight: 500;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(3rem);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Interactive elements */
.cta-section {
    margin-top: 6rem;
    opacity: 0;
    animation: fadeInUp 1s ease 0.6s forwards;
}

.explore-button {
    padding: 2rem 4.8rem;
    background: transparent;
    border: 0.2rem solid var(--accent-color);
    border-radius: 3.2rem;
    color: var(--accent-color);
    font-size: 1.7rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.05rem;
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    background: rgba(80, 250, 123, 0.05);
}

.explore-button:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(80, 250, 123, 0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.explore-button:hover:before {
    width: 40rem;
    height: 40rem;
}

.explore-button:hover {
    transform: translateY(-0.3rem) scale(1.02);
    box-shadow: 0 1.2rem 3.2rem rgba(80, 250, 123, 0.25);
    border-color: var(--accent-hover);
    background: rgba(80, 250, 123, 0.08);
}

/* Floating question marks */
.question-mark {
    position: absolute;
    font-size: 2.4rem;
    color: rgba(100, 255, 218, 0.2);
    animation: drift 15s infinite ease-in-out;
}

@keyframes drift {
    0%, 100% {
        transform: translate(0, 0) rotate(0deg);
    }
    33% {
        transform: translate(5rem, -3rem) rotate(120deg);
    }
    66% {
        transform: translate(-3rem, 2rem) rotate(240deg);
    }
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2000;
    padding: 4rem 2rem;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: rgba(20, 20, 20, 0.95);
    backdrop-filter: blur(2rem);
    -webkit-backdrop-filter: blur(2rem);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 3.2rem;
    padding: 0;
    width: 110rem;
    max-width: 92%;
    text-align: center;
    transform: scale(0.9) translateY(2rem);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.5);
    margin: auto;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    position: relative;
}

.modal-overlay.active .modal-content {
    transform: scale(1) translateY(0);
}

/* Specific styles for the video modal */
.modal-video {
    width: 120rem;
    background: #0a0a0a;
    padding: 5rem 3rem 3rem;
}

.modal-scroll-content {
    padding: 5rem 8rem 4rem;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: rgba(80, 250, 123, 0.3) transparent;
}

.modal-scroll-content::-webkit-scrollbar {
    width: 0.6rem;
}

.modal-scroll-content::-webkit-scrollbar-track {
    background: transparent;
}

.modal-scroll-content::-webkit-scrollbar-thumb {
    background: rgba(80, 250, 123, 0.3);
    border-radius: 0.3rem;
}

.modal-scroll-content::-webkit-scrollbar-thumb:hover {
    background: rgba(80, 250, 123, 0.5);
}

.modal-icon {
    width: 8rem;
    height: 8rem;
    margin: 0 auto 3rem;
    background: rgba(80, 250, 123, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(80, 250, 123, 0.4);
    }
    70% {
        box-shadow: 0 0 0 2rem rgba(80, 250, 123, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(80, 250, 123, 0);
    }
}

.modal-icon svg {
    width: 4rem;
    height: 4rem;
    stroke: var(--accent-color);
    stroke-width: 2;
}

.modal-title {
    font-size: 3.6rem;
    font-weight: 700;
    margin-bottom: 2.4rem;
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.modal-text {
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 2rem;
    text-align: left;
}

.modal-text:last-of-type {
    margin-bottom: 4rem;
}

.modal-close-x {
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 4rem;
    height: 4rem;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10;
}

.modal-close-x:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: rotate(90deg);
}

.modal-close-x svg {
    width: 2.4rem;
    height: 2.4rem;
    stroke: rgba(255, 255, 255, 0.5);
    stroke-width: 2;
    transition: stroke 0.3s ease;
}

.modal-close-x:hover svg {
    stroke: var(--accent-color);
}

/* Waitlist Form Styles */
.waitlist-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: left;
    margin-top: 1.5rem;
}

.waitlist-form .form-group {
    display: flex;
    flex-direction: column;
    position: relative;
}

.waitlist-form label {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--accent-color);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    opacity: 0.8;
}

.waitlist-form input,
.waitlist-form textarea {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 2rem;
    padding: 1.8rem 2.6rem;
    color: #ffffff;
    font-size: 1.8rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
}

.waitlist-form input::placeholder,
.waitlist-form textarea::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.waitlist-form input:hover,
.waitlist-form textarea:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
}

.waitlist-form input:focus,
.waitlist-form textarea:focus {
    outline: none;
    border-color: rgba(80, 250, 123, 0.5);
    background: rgba(80, 250, 123, 0.05);
    box-shadow: 0 0 2rem rgba(80, 250, 123, 0.15);
}

.waitlist-form textarea {
    resize: vertical;
    min-height: 10rem;
}

.submit-button {
    padding: 2rem 5.2rem;
    background: transparent;
    border: 0.2rem solid var(--accent-color);
    border-radius: 3.2rem;
    color: var(--accent-color);
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.05rem;
    backdrop-filter: blur(1rem);
    -webkit-backdrop-filter: blur(1rem);
    background: rgba(80, 250, 123, 0.05);
    margin-top: 3rem;
    align-self: center;
}

.submit-button:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(80, 250, 123, 0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-button:hover:before {
    width: 40rem;
    height: 40rem;
}

.submit-button:hover {
    transform: translateY(-0.3rem) scale(1.02);
    box-shadow: 0 1.2rem 3.2rem rgba(80, 250, 123, 0.25);
    border-color: var(--accent-hover);
    background: rgba(80, 250, 123, 0.08);
}

.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    background: #000;
    border-radius: 1.6rem;
    overflow: hidden;
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

/* Responsive */
/* 768px / 16px = 48em */
@media (max-width: 48em) {
    header {
        padding: 1.5rem 2rem;
    }

    .logo {
        font-size: 2rem;
        gap: 0.8rem;
    }

    .logo img {
        height: 3rem;
    }

    .header-link {
        font-size: 1.4rem;
        padding: 0.6rem 1.2rem;
    }

    .header-link .link-text {
        display: none;
    }

    .header-right {
        gap: 1.2rem;
    }

    .main-content {
        padding: 8rem 2rem;
    }

    .hero-section {
        padding: 4rem 3rem;
    }

    .philosophy-text {
        font-size: 1.8rem;
    }

    .explore-button {
        padding: 1.5rem 3rem;
        font-size: 1.6rem;
    }

    .modal-scroll-content {
        padding: 4rem 3rem 3rem;
    }
    
    .modal-title {
        font-size: 2.8rem;
    }
    
    .modal-text {
        font-size: 1.8rem !important;
    }
    
    .waitlist-form input,
    .waitlist-form textarea {
        padding: 1.6rem 2.2rem;
        font-size: 1.6rem;
    }
    
    .submit-button {
        padding: 1.8rem 4.4rem;
        font-size: 1.7rem;
    }
    
    .modal-close-x {
        top: 1.5rem;
        right: 1.5rem;
        width: 3.5rem;
        height: 3.5rem;
    }
    
    .modal-close-x svg {
        width: 2rem;
        height: 2rem;
    }
}

/* Large screens */
/* 1400px / 16px = 87.5em */
@media (min-width: 87.5em) {
    .modal-content {
        max-width: 120rem;
    }
    
    .modal-scroll-content {
        padding: 5rem 10rem 5rem;
    }
}

/* Small screens - prevent scrollbar */
/* 700px / 16px = 43.75em */
@media (max-height: 43.75em) {
    .modal-content {
        max-height: 95vh;
    }
    
    .modal-scroll-content {
        padding: 4rem 5rem 2rem;
    }
    
    .modal-title {
        font-size: 3.2rem;
        margin-bottom: 1.8rem;
    }
    
    .waitlist-form {
        gap: 2rem;
        margin-top: 1.5rem;
    }
    
    .waitlist-form label {
        margin-bottom: 0.8rem;
    }
    
    .waitlist-form input,
    .waitlist-form textarea {
        padding: 1.6rem 2.2rem;
    }
    
    .waitlist-form textarea {
        min-height: 8rem;
    }
    
    .submit-button {
        margin-top: 2.5rem;
    }
}
