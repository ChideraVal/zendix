const form = document.getElementById('demoForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function closeMenu() {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const endpoint = form.getAttribute('action');

    formStatus.textContent = '';
    formStatus.className = 'form-status';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
            form.reset();
            formStatus.textContent = data?.message || 'Your demo request was sent successfully.';
            formStatus.classList.add('success');
        } else {
            formStatus.textContent = data?.error || 'Something went wrong while sending your request.';
            formStatus.classList.add('error');
        }
    } catch (error) {
        formStatus.textContent = 'Network error. Please try again in a moment.';
        formStatus.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Demo';
    }
});