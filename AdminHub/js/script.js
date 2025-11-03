// Smooth video switching on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (video && video.paused) video.play();
            sections.forEach(sec => {
                if (sec !== entry.target) sec.classList.remove('visible');
            });
        } else {
            if (video && !video.paused) video.pause();
        }
    });
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));

// Button scroll effect
function scrollToNext() {
    document.querySelector('#section2').scrollIntoView({ behavior: 'smooth' });
}