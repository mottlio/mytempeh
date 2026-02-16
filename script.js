// Email obfuscation - assemble email address to prevent spam bot scraping
function displayEmail() {
    const user = 'anda.mottl';
    const domain = 'yahoo';
    const tld = 'com';
    const email = user + '@' + domain + '.' + tld;

    const emailContainer = document.getElementById('email-container');
    if (emailContainer) {
        const link = document.createElement('a');
        link.href = 'mailto:' + email;
        link.textContent = email;
        link.style.color = '#4a7c59';
        link.style.textDecoration = 'none';
        link.style.fontWeight = 'bold';
        emailContainer.appendChild(link);
    }
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Display email
    displayEmail();
    const langButtons = document.querySelectorAll('.lang-btn');
    const enElements = document.querySelectorAll('.lang-en');
    const plElements = document.querySelectorAll('.lang-pl');

    // Check for saved language preference or default to English
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);

    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('preferredLanguage', lang);
        });
    });

    function setLanguage(lang) {
        // Update button states
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Show/hide content based on language
        if (lang === 'en') {
            enElements.forEach(el => el.style.display = '');
            plElements.forEach(el => el.style.display = 'none');
        } else if (lang === 'pl') {
            enElements.forEach(el => el.style.display = 'none');
            plElements.forEach(el => el.style.display = '');
        }
    }

    // Smooth scroll for internal links (if any are added in the future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle fade-in animation on load
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
