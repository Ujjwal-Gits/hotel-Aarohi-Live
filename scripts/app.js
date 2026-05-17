document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3. Rooms Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State
            filterBtns.forEach(b => {
                b.classList.remove('border-primary', 'text-black');
                b.classList.add('border-transparent', 'text-gray-400');
            });
            btn.classList.add('border-primary', 'text-black');
            btn.classList.remove('border-transparent', 'text-gray-400');

            // Filter logic
            const filter = btn.getAttribute('data-filter');
            roomCards.forEach(card => {
                if (filter === 'All' || card.getAttribute('data-type') === filter) {
                    card.classList.remove('hidden-room');
                    setTimeout(() => card.style.display = '', 50); // slight delay for anim
                } else {
                    card.classList.add('hidden-room');
                    setTimeout(() => card.style.display = 'none', 500); // Wait for anim
                }
            });
        });
    });

    // 4. Gallery Lightbox
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCat = document.getElementById('lightbox-cat');
    const lightboxClose = document.getElementById('lightbox-close');

    if(galleryImgs.length > 0 && lightbox) {
        galleryImgs.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImg.src = item.getAttribute('data-src');
                lightboxTitle.textContent = item.getAttribute('data-alt');
                lightboxCat.textContent = item.getAttribute('data-cat');
                lightbox.classList.add('active');
                setTimeout(() => lightboxImg.classList.remove('scale-95'), 10);
            });
        });

        const closeLightbox = () => {
            lightboxImg.classList.add('scale-95');
            setTimeout(() => lightbox.classList.remove('active'), 300);
        };

        lightbox.addEventListener('click', closeLightbox);
        lightboxClose.addEventListener('click', closeLightbox);
        lightboxImg.addEventListener('click', (e) => e.stopPropagation());
    }
});
