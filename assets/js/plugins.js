/* ============================================
   PLUGINS INITIALIZATION
   ============================================ */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {

        // ===== OWL CAROUSEL INITIALIZATION =====
        if (typeof $.fn.owlCarousel !== 'undefined') {
            $('.owl-carousel').each(function() {
                const $carousel = $(this);
                const items = $carousel.data('items') || 4;
                const autoplay = $carousel.data('autoplay') !== false;
                const loop = $carousel.data('loop') !== false;

                $carousel.owlCarousel({
                    items: items,
                    loop: loop,
                    autoplay: autoplay,
                    autoplayTimeout: 3000,
                    autoplayHoverPause: true,
                    margin: 30,
                    nav: true,
                    navText: ['<i class="ri-arrow-left-line"></i>', '<i class="ri-arrow-right-line"></i>'],
                    dots: true,
                    responsive: {
                        0: { items: 1 },
                        576: { items: 2 },
                        768: { items: 3 },
                        992: { items: items }
                    }
                });
            });
        }

        // ===== SWIPER INITIALIZATION =====
        if (typeof Swiper !== 'undefined') {
            const swipers = document.querySelectorAll('.swiper');
            swipers.forEach(function(swiperEl) {
                new Swiper(swiperEl, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        576: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        992: { slidesPerView: 4 }
                    }
                });
            });
        }

        // ===== ISOTOPE FILTER =====
        if (typeof Isotope !== 'undefined') {
            const grid = document.querySelector('.isotope-grid');
            if (grid) {
                const iso = new Isotope(grid, {
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows'
                });

                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(function(button) {
                    button.addEventListener('click', function() {
                        const filterValue = this.getAttribute('data-filter');
                        
                        // Update active class
                        filterButtons.forEach(function(btn) {
                            btn.classList.remove('active');
                        });
                        this.classList.add('active');

                        // Filter items
                        iso.arrange({ filter: filterValue });
                    });
                });
            }
        }

        // ===== GLIGHTBOX INITIALIZATION =====
        if (typeof GLightbox !== 'undefined') {
            const lightbox = GLightbox({
                selector: '.glightbox',
                touchNavigation: true,
                loop: true,
                autoplayVideos: true
            });
        }

        // ===== COUNTER UP INITIALIZATION =====
        if (typeof $.fn.counterUp !== 'undefined') {
            $('.counter').counterUp({
                delay: 10,
                time: 2000
            });
        }

        // ===== TOOLTIP INITIALIZATION (Bootstrap) =====
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // ===== POPOVER INITIALIZATION (Bootstrap) =====
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });

        // ===== ACCORDION SMOOTH SCROLL =====
        const accordionButtons = document.querySelectorAll('.accordion-button');
        accordionButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                setTimeout(function() {
                    const target = button.getAttribute('data-bs-target');
                    if (target) {
                        const targetElement = document.querySelector(target);
                        if (targetElement) {
                            const offsetTop = targetElement.offsetTop - 100;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 300);
            });
        });

    });

})();

