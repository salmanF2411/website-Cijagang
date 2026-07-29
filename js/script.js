/* ============================================
   DESA CIJAGANG - CUSTOM JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', function () {
        setTimeout(function () {
            loadingScreen.classList.add('loaded');
            setTimeout(function () {
                loadingScreen.style.display = 'none';
            }, 600);
        }, 800);
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.navbar .nav-link');

    function handleNavbarScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // ============================================
    // ACTIVE NAV LINK ON SCROLL (ScrollSpy)
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile navbar
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    // ============================================
    // HERO SLIDESHOW
    // ============================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let slideInterval;

    // Load background images
    heroSlides.forEach(function (slide) {
        const bgUrl = slide.getAttribute('data-bg');
        if (bgUrl) {
            slide.style.backgroundImage = 'url(' + bgUrl + ')';
        }
    });

    function nextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (heroSlides.length > 1) {
        startSlideshow();
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.getElementById('statistik');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
            countersAnimated = true;

            counters.forEach(function (counter) {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    counter.textContent = current.toLocaleString('id-ID');

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('id-ID');
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Initial check

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');

    function handleBackToTop() {
        if (!backToTopBtn) return;

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // GALERI MODAL
    // ============================================
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImage = document.getElementById('galleryModalImage');
    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const galleryTriggers = document.querySelectorAll('.gallery-trigger');

    function openGalleryModal(trigger) {
        if (!galleryModal || !galleryModalImage || !galleryModalTitle) return;

        const imageUrl = trigger.getAttribute('href');
        const title = trigger.getAttribute('data-title') || 'Foto Galeri';

        if (!imageUrl) return;

        galleryModalImage.src = imageUrl;
        galleryModalImage.alt = title;
        galleryModalTitle.textContent = title;
        galleryModal.classList.add('is-open');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryModal() {
        if (!galleryModal) return;

        galleryModal.classList.remove('is-open');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (galleryModal && galleryModalImage && galleryModalTitle) {
        galleryTriggers.forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                openGalleryModal(this);
            });
        });

        document.querySelectorAll('[data-close-modal]').forEach(function (element) {
            element.addEventListener('click', function () {
                closeGalleryModal();
            });
        });

        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('is-open')) {
            closeGalleryModal();
        }
    });

    // ============================================
    // DETAIL MODAL
    // ============================================
    const detailModal = document.getElementById('detailModal');
    const detailModalImage = document.getElementById('detailModalImage');
    const detailModalBadge = document.getElementById('detailModalBadge');
    const detailModalTitle = document.getElementById('detailModalTitle');
    const detailModalDescription = document.getElementById('detailModalDescription');
    const detailModalHighlights = document.getElementById('detailModalHighlights');
    const detailTriggers = document.querySelectorAll('.detail-trigger');
    const detailCards = document.querySelectorAll('.potensi-card');

    function openDetailModal(trigger) {
        if (!detailModal || !detailModalImage || !detailModalBadge || !detailModalTitle || !detailModalDescription || !detailModalHighlights) return;

        const card = trigger.closest('.potensi-card');
        if (!card) return;

        const title = card.getAttribute('data-title') || 'Detail';
        const badge = card.getAttribute('data-badge') || 'Informasi';
        const image = card.getAttribute('data-image');
        const description = card.getAttribute('data-description') || '';
        const layout = card.getAttribute('data-layout');
        const highlights = JSON.parse(card.getAttribute('data-highlights') || '[]');

        detailModalImage.src = image || '';
        detailModalImage.alt = title;
        detailModalTitle.textContent = title;
        detailModalDescription.textContent = description;

        if (layout === 'simple') {
            detailModalBadge.style.display = 'none';
            detailModalHighlights.style.display = 'none';
        } else {
            detailModalBadge.style.display = 'inline-block';
            detailModalBadge.textContent = badge;
            detailModalHighlights.style.display = 'grid';
            detailModalHighlights.innerHTML = highlights.map(function (item) {
                return '<li>' + item + '</li>';
            }).join('');
        }

        detailModal.classList.add('is-open');
        detailModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDetailModal() {
        if (!detailModal) return;

        detailModal.classList.remove('is-open');
        detailModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    detailTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openDetailModal(this);
        });
    });

    detailCards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            if (e.target.closest('a, button, input, select, textarea')) {
                return;
            }

            const trigger = card.querySelector('.detail-trigger');
            if (trigger) {
                e.preventDefault();
                openDetailModal(trigger);
            }
        });
    });

    document.querySelectorAll('[data-close-detail]').forEach(function (element) {
        element.addEventListener('click', function () {
            closeDetailModal();
        });
    });

    if (detailModal) {
        detailModal.addEventListener('click', function (e) {
            if (e.target === detailModal) {
                closeDetailModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && detailModal && detailModal.classList.contains('is-open')) {
            closeDetailModal();
        }
    });

    // ============================================
    // TESTIMONI SLIDER
    // ============================================
    const testimoniTrack = document.getElementById('testimoniTrack');
    const prevBtn = document.getElementById('prevTestimoni');
    const nextBtn = document.getElementById('nextTestimoni');
    const dotsContainer = document.getElementById('testimoniDots');
    const testimoniCards = document.querySelectorAll('.testimoni-card');

    let currentTestimoni = 0;
    let testimoniPerView = 3;
    let testimoniAutoplay;

    function getTestimoniPerView() {
        if (window.innerWidth <= 767) return 1;
        if (window.innerWidth <= 991) return 2;
        return 3;
    }

    function updateTestimoniPerView() {
        testimoniPerView = getTestimoniPerView();
        createTestimoniDots();
        goToTestimoni(Math.min(currentTestimoni, getMaxTestimoniIndex()));
    }

    function getMaxTestimoniIndex() {
        return Math.max(0, testimoniCards.length - testimoniPerView);
    }

    function createTestimoniDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalDots = getMaxTestimoniIndex() + 1;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'testimoni-dot' + (i === currentTestimoni ? ' active' : '');
            dot.addEventListener('click', function () {
                goToTestimoni(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToTestimoni(index) {
        currentTestimoni = index;
        if (!testimoniTrack || testimoniCards.length === 0) return;

        const cardWidth = testimoniCards[0].offsetWidth + 24; // including gap
        testimoniTrack.style.transform = 'translateX(-' + (currentTestimoni * cardWidth) + 'px)';

        // Update dots
        const dots = document.querySelectorAll('.testimoni-dot');
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentTestimoni);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            const newIndex = currentTestimoni > 0 ? currentTestimoni - 1 : getMaxTestimoniIndex();
            goToTestimoni(newIndex);
            resetTestimoniAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const newIndex = currentTestimoni < getMaxTestimoniIndex() ? currentTestimoni + 1 : 0;
            goToTestimoni(newIndex);
            resetTestimoniAutoplay();
        });
    }

    function startTestimoniAutoplay() {
        testimoniAutoplay = setInterval(function () {
            const newIndex = currentTestimoni < getMaxTestimoniIndex() ? currentTestimoni + 1 : 0;
            goToTestimoni(newIndex);
        }, 4000);
    }

    function resetTestimoniAutoplay() {
        clearInterval(testimoniAutoplay);
        startTestimoniAutoplay();
    }

    // Initialize testimoni
    updateTestimoniPerView();
    startTestimoniAutoplay();
    window.addEventListener('resize', updateTestimoniPerView);

    // ============================================
    // LIVE CLOCK
    // ============================================
    const timeElement = document.getElementById('liveTime');
    const dateElement = document.getElementById('liveDate');

    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        if (timeElement) {
            timeElement.textContent = hours + ':' + minutes + ':' + seconds;
        }

        if (dateElement) {
            const dayName = dayNames[now.getDay()];
            const date = now.getDate();
            const monthName = monthNames[now.getMonth()];
            const year = now.getFullYear();
            dateElement.textContent = dayName + ', ' + date + ' ' + monthName + ' ' + year;
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    // ============================================
    // WEATHER WIDGET (Simple Static)
    // ============================================
    const weatherElement = document.getElementById('weatherInfo');
    if (weatherElement) {
        // Static weather display - can be replaced with API call
        const weatherData = [
            { icon: 'fa-cloud-sun', text: 'Cerah Berawan, 28°C' },
            { icon: 'fa-sun', text: 'Cuaca Cerah, 30°C' },
            { icon: 'fa-cloud', text: 'Berawan, 26°C' }
        ];
        const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
        weatherElement.innerHTML = randomWeather.text;
    }

    // ============================================
    // AOS INITIALIZATION
    // ============================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: function () {
                return window.innerWidth < 576;
            }
        });
    }

    // ============================================
    // PARALLAX EFFECT ON SCROLL (Subtle)
    // ============================================
    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = 'translateY(' + (scrolled * 0.2) + 'px)';
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
        }
    });

    // ============================================
    // THROTTLE HELPER (Performance)
    // ============================================
    // All scroll handlers are already lightweight,
    // but wrap heavy ones if needed in future

    console.log('🏡 Desa Cijagang Website loaded successfully!');
});
