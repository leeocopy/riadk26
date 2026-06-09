/**
 * RIAD KA - CUSTOM HOMEPAGE SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. STICKY HEADER & MOBILE MENU
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // 2. HERO SLIDER
    const initSlider = () => {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-arrow');
        const nextBtn = document.querySelector('.next-arrow');
        
        if (slides.length === 0) return;

        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 6000;

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);
        const resetInterval = () => { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, intervalTime); };

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { goToSlide(index); resetInterval(); });
        });

        slideInterval = setInterval(nextSlide, intervalTime);
    };

    // 3. SCROLL ANIMATIONS (Intersection Observer)
    const initScrollAnimations = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!('IntersectionObserver' in window) || prefersReducedMotion) {
            elements.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        elements.forEach(el => observer.observe(el));
    };

    // 4. FAQ ACCORDION
    const initFAQ = () => {
        const questions = document.querySelectorAll('.faq-question');
        
        questions.forEach(question => {
            question.addEventListener('click', () => {
                const isActive = question.classList.contains('active');
                const icon = question.querySelector('.faq-icon');
                
                // Close all other open answers
                questions.forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                    const qIcon = q.querySelector('.faq-icon');
                    if (qIcon) qIcon.textContent = '+';
                });
                
                // Toggle current answer
                if (!isActive) {
                    question.classList.add('active');
                    const answer = question.nextElementSibling;
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    if (icon) icon.textContent = '−';
                }
            });
        });
    };

    // 5. ROOMS SLIDER DRAG & AUTO-SCROLL
    const initRoomsSlider = () => {
        const track = document.getElementById('roomsTrack');
        if (!track) return;

        // Clone children for seamless infinite loop
        const children = Array.from(track.children);
        children.forEach(child => {
            const clone = child.cloneNode(true);
            track.appendChild(clone);
        });

        // Auto-scroll function
        let isDown = false;
        let startX;
        let scrollLeft;
        let animationFrameId;

        const scrollStep = () => {
            if (!isDown) {
                track.scrollLeft += 1; // Smooth 1px per frame (60fps)
                // Reset when we reach exactly half of the total scroll width
                if (track.scrollLeft >= track.scrollWidth / 2) {
                    track.scrollLeft -= track.scrollWidth / 2; // Seamless loop back
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        const startAutoScroll = () => {
            // Respect prefers-reduced-motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            // Cancel any existing frame request to prevent speed-up
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        const stopAutoScroll = () => cancelAnimationFrame(animationFrameId);

        // Mouse Events for Dragging
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            stopAutoScroll();
            track.classList.add('active');
            track.style.scrollBehavior = 'auto'; // Disable smooth scroll for instant drag
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            if(isDown) {
                isDown = false;
                track.classList.remove('active');
                track.style.scrollBehavior = 'smooth';
                startAutoScroll();
            }
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('active');
            track.style.scrollBehavior = 'smooth';
            startAutoScroll();
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // Drag sensitivity
            track.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events
        track.addEventListener('touchstart', stopAutoScroll, {passive: true});
        track.addEventListener('touchend', startAutoScroll);

        startAutoScroll();
    };

    // 6. REVIEWS SLIDER DRAG & AUTO-SCROLL (Infinite Loop)
    const initReviewsSlider = () => {
        const track = document.getElementById('reviewsTrack');
        if (!track) return;

        const children = Array.from(track.children);
        
        // Clone at the beginning (reverse order for seamless loop)
        [...children].reverse().forEach(child => {
            track.insertBefore(child.cloneNode(true), track.firstChild);
        });
        
        // Clone at the end
        children.forEach(child => {
            track.appendChild(child.cloneNode(true));
        });

        const setWidth = track.scrollWidth / 3;
        
        // Initial scroll to center the original set (middle set)
        track.scrollLeft = setWidth + (setWidth / 2) - (track.offsetWidth / 2);

        let isDown = false;
        let startX;
        let scrollLeft;
        let animationFrameId;
        const speed = 1.2; // pixels per frame

        const scrollStep = () => {
            if (!isDown) {
                track.scrollLeft += speed;
                // Seamless loop: when reaching the end of the middle set, jump back to start of middle set
                if (track.scrollLeft >= setWidth * 2) {
                    track.scrollLeft -= setWidth;
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        const startAutoScroll = () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(scrollStep);
        };

        const stopAutoScroll = () => cancelAnimationFrame(animationFrameId);

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            stopAutoScroll();
            track.classList.add('active');
            track.style.scrollBehavior = 'auto';
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            if(isDown) {
                isDown = false;
                track.classList.remove('active');
                track.style.scrollBehavior = 'smooth';
                startAutoScroll();
            }
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.classList.remove('active');
            track.style.scrollBehavior = 'smooth';
            startAutoScroll();
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2;
            track.scrollLeft = scrollLeft - walk;
        });
        
        track.addEventListener('touchstart', stopAutoScroll, {passive: true});
        track.addEventListener('touchend', startAutoScroll);

        startAutoScroll();
    };

    // Initialize all
    initSlider();
    initScrollAnimations();
    initFAQ();
    initRoomsSlider();
    initReviewsSlider();
});
