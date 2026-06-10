/**
 * RIAD KA — RiadXO Style Scripts
 * Scroll reveal, sliders, FAQ, drag navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. STICKY HEADER & MOBILE MENU
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
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

    // 3. SCROLL REVEAL — All sections (RiadXO style)
    const initScrollReveal = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!('IntersectionObserver' in window) || prefersReducedMotion) {
            document.querySelectorAll('.animate-on-scroll, .welcome-reveal, .ka-reveal, .ka-image-reveal').forEach(el => {
                el.classList.add('is-visible');
            });
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.08
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const revealElements = document.querySelectorAll(
            '.animate-on-scroll, .welcome-reveal, .ka-reveal, .ka-image-reveal'
        );
        revealElements.forEach(el => revealObserver.observe(el));
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

        let isDown = false;
        let startX;
        let scrollLeft;
        let animationFrameId;

        const scrollStep = () => {
            if (!isDown) {
                track.scrollLeft += 1;
                if (track.scrollLeft >= track.scrollWidth / 2) {
                    track.scrollLeft -= track.scrollWidth / 2;
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

    // 6. REVIEWS SLIDER DRAG & AUTO-SCROLL (Infinite Loop)
    const initReviewsSlider = () => {
        const track = document.getElementById('reviewsTrack');
        if (!track) return;

        const children = Array.from(track.children);
        
        [...children].reverse().forEach(child => {
            track.insertBefore(child.cloneNode(true), track.firstChild);
        });
        
        children.forEach(child => {
            track.appendChild(child.cloneNode(true));
        });

        const setWidth = track.scrollWidth / 3;
        
        track.scrollLeft = setWidth + (setWidth / 2) - (track.offsetWidth / 2);

        let isDown = false;
        let startX;
        let scrollLeft;
        let animationFrameId;
        const speed = 1.2;

        const scrollStep = () => {
            if (!isDown) {
                track.scrollLeft += speed;
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

    // 7. TYPEWRITER EFFECT — Hero Title & Subtitle
    const initTypewriter = () => {
        const titleEl = document.querySelector('.typewriter-text');
        const subtitleEl = document.querySelector('.typewriter-sub');
        const cursorEl = document.querySelector('.typewriter-cursor');
        const headerEl = document.querySelector('.hero-header');
        const subtypeEl = document.querySelector('.hero-subtype');
        const imageWrap = document.querySelector('.hero-image-sticky');
        
        if (!titleEl) return;
        
        const titleText = titleEl.getAttribute('data-text') || 'Riad KA';
        const subText = subtitleEl ? subtitleEl.getAttribute('data-text') : '';
        
        // Fade in header container
        setTimeout(() => {
            if (headerEl) headerEl.classList.add('is-visible');
        }, 300);
        
        // Type out title
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < titleText.length) {
                    titleEl.textContent += titleText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    // After title, show & type subtitle
                    setTimeout(() => {
                        if (subtypeEl) subtypeEl.classList.add('is-visible');
                        if (subtitleEl && subText) {
                            subtitleEl.textContent = '';
                            let j = 0;
                            const subInterval = setInterval(() => {
                                if (j < subText.length) {
                                    subtitleEl.textContent += subText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(subInterval);
                                    finishTyping();
                                }
                            }, 55);
                        } else {
                            finishTyping();
                        }
                    }, 250);
                }
            }, 130);
        }, 600);
        
        function finishTyping() {
            if (cursorEl) cursorEl.classList.add('typing-done');
            setTimeout(() => {
                if (imageWrap) imageWrap.classList.add('is-visible');
            }, 300);
        }
    };

    // Initialize all
    initSlider();
    initTypewriter();
    initScrollReveal();
    initFAQ();
    initRoomsSlider();
    initReviewsSlider();
});

