const correctAnswers = ['yeddi', 'Yeddi', 'YEDDI'];

const allImages = [
    'imgs/Img1.png',
    'imgs/Img2.png',
    'imgs/Img3.png',
    'imgs/Img4.png',
    'imgs/WhatsApp Image 2026-09-11 at 23.25.14.jpeg',
    'imgs/WhatsApp Image 2026-09-11 at 23.25.40.jpeg',
    'imgs/WhatsApp Image 2026-09-11 at 23.26.02.jpeg',
    'imgs/WhatsApp Image 2026-09-11 at 23.27.20.jpeg',
    'imgs/WhatsApp Image 2026-09-11 at 23.28.08.jpeg',
    'imgs/WhatsApp Image 2026-09-11 at 23.35.51.jpeg'
];

const zoomImages = [
    'imgs/Img1.png',
    'imgs/Img2.png',
    'imgs/Img3.png',
    'imgs/Img4.png'
];

let currentLightboxIndex = 0;
let isZoomScrollActive = false;
let galleryBuilt = false;
let zoomScrollHandler = null;
let zoomResizeHandler = null;


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');

    if (!container) return;

    const hearts = [
        '💖',
        '💕',
        '💗',
        '💓',
        '💝',
        '💘',
        '💟',
        '❤️',
        '🧡',
        '💛'
    ];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');

        heart.className = 'floating-heart';
        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;

        heart.style.animationDelay =
            `${Math.random() * 6}s`;

        heart.style.animationDuration =
            `${4 + Math.random() * 4}s`;

        container.appendChild(heart);
    }
}


/* =========================================================
   SPARKLES
========================================================= */

function createSparkles() {
    const container = document.getElementById('sparkles');

    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');

        sparkle.className = 'sparkle';

        sparkle.style.left =
            `${Math.random() * 100}%`;

        sparkle.style.top =
            `${Math.random() * 100}%`;

        sparkle.style.animationDelay =
            `${Math.random() * 2}s`;

        sparkle.style.animationDuration =
            `${1.5 + Math.random() * 1.5}s`;

        const size = 4 + Math.random() * 6;

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        container.appendChild(sparkle);
    }
}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {
    const colors = [
        '#e91e63',
        '#ff6b9d',
        '#ffd700',
        '#ffb347',
        '#ff69b4',
        '#ffffff',
        '#f8bbd0'
    ];

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');

        confetti.className = 'confetti';

        confetti.style.left =
            `${Math.random() * 100}vw`;

        confetti.style.top = '-10px';

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.width =
            `${6 + Math.random() * 8}px`;

        confetti.style.height =
            `${6 + Math.random() * 8}px`;

        confetti.style.animationDelay =
            `${Math.random() * 0.5}s`;

        confetti.style.animationDuration =
            `${2 + Math.random() * 2}s`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(screenId) {
    document
        .querySelectorAll('.screen')
        .forEach(screen => {
            screen.classList.remove('active');
        });

    const target =
        document.getElementById(screenId);

    if (target) {
        target.classList.add('active');
    }
}


/* =========================================================
   ANSWER
========================================================= */

function handleAnswer() {
    const input =
        document.getElementById('nicknameInput');

    const errorEl =
        document.getElementById('answerError');

    const submitBtn =
        document.getElementById('submitBtn');

    if (!input || !errorEl || !submitBtn) {
        return;
    }

    const value =
        input.value.trim();

    input.classList.remove(
        'wrong',
        'correct'
    );

    if (correctAnswers.includes(value)) {

        input.classList.add('correct');

        submitBtn.disabled = true;
        submitBtn.textContent = '✓';

        setTimeout(() => {

            const introPage =
                document.getElementById('pageIntro');

            const questionScreen =
                document.getElementById('questionScreen');

            const zoomPage =
                document.getElementById('pageZoomScroll');

            if (introPage) {
                introPage.classList.remove('active');
            }

            if (questionScreen) {
                questionScreen.classList.remove('active');
            }

            if (zoomPage) {
                zoomPage.classList.add('active');
            }

            /*
             * CRITICAL:
             * Do NOT lock the body here.
             * Mobile Safari/Chrome needs normal
             * document scrolling for the effect.
             */

            document.body.classList.remove(
                'lock-scroll'
            );

            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            /*
             * Start at top.
             */

            window.scrollTo(0, 0);

            setTimeout(() => {

                initZoomScroll();

                createConfetti();

            }, 100);

        }, 800);

    } else {

        input.classList.add('wrong');

        errorEl.classList.add('show');

        setTimeout(() => {

            errorEl.classList.remove('show');

            input.classList.remove('wrong');

        }, 3000);
    }
}


/* =========================================================
   ZOOM SCROLL
   DESKTOP + MOBILE
========================================================= */

function initZoomScroll() {
    isZoomScrollActive = true;

    // IMPORTANT:
    // Do NOT lock body scrolling while the photo sequence is active.
    document.body.classList.remove('lock-scroll');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    const stages = document.querySelectorAll('.zoom-stage');
    const spacer = document.getElementById('scrollSpacer');
    const scrollHint = document.getElementById('scrollHint');
    const gallerySection = document.getElementById('gallerySection');
    const zoomTrack = document.getElementById('zoomTrack');

    if (!stages.length || !spacer || !zoomTrack) return;

    zoomTrack.classList.add('active');

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const getViewportHeight = () => {
        return window.visualViewport
            ? window.visualViewport.height
            : window.innerHeight;
    };

    const vh = getViewportHeight();
    const numStages = zoomImages.length;

    /*
     * More scroll distance on mobile = smoother control.
     *
     * Desktop: 3 viewport heights / photo
     * Mobile:  3.5 viewport heights / photo
     */
    const stageHeight = isMobile ? 3.5 : 3;
    const totalScrollHeight = vh * numStages * stageHeight;

    spacer.style.height = `${totalScrollHeight}px`;

    /*
     * Starting zoom for each image.
     *
     * Img3 is deliberately smaller on mobile.
     * This creates the "diminished / zoomed-out" look you asked for.
     */
    const desktopStartScales = [
        0.80, // Img1
        0.80, // Img2
        0.80, // Img3
        0.40  // Img4 — was 0.70, now more zoomed out
    ];

    const mobileStartScales = [
        0.80, // Img1
        0.80, // Img2
        0.50, // Img3 — was 0.62, now more zoomed out
        0.70  // Img4
    ];

    const startScales = isMobile
        ? mobileStartScales
        : desktopStartScales;

    /*
     * Keep the rendered progress slightly behind the finger.
     * This removes the harsh/jittery feeling on mobile browsers.
     */
    let targetScrollY = window.scrollY;
    let renderedScrollY = window.scrollY;
    let animationFrame = null;

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function easeInOutCubic(t) {
        t = clamp(t, 0, 1);
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function easeOutCubic(t) {
        t = clamp(t, 0, 1);
        return 1 - Math.pow(1 - t, 3);
    }

    function render() {
        // Smoothly follow the actual scroll position.
        renderedScrollY += (targetScrollY - renderedScrollY) * 0.12; // was 0.18

        if (Math.abs(targetScrollY - renderedScrollY) < 0.1) { // was 0.15
            renderedScrollY = targetScrollY;
        }

        updateZoomStages(renderedScrollY);

        if (Math.abs(targetScrollY - renderedScrollY) > 0.1) { // was 0.15
            animationFrame = requestAnimationFrame(render);
        } else {
            animationFrame = null;
        }
    }

    function onScroll() {
        targetScrollY = window.scrollY;

        if (!animationFrame) {
            animationFrame = requestAnimationFrame(render);
        }
    }

    function updateZoomStages(scrollY) {
        const progress = scrollY / vh;

        // Hide hint
        if (scrollY > vh * 0.5) {
            scrollHint?.classList.add('hidden');
        } else {
            scrollHint?.classList.remove('hidden');
        }

        // Build gallery near the end
        const totalProgress = progress / (numStages * stageHeight);

        if (totalProgress >= 0.90 && !galleryBuilt) {
            gallerySection?.classList.add('visible');
            buildGallery();
            galleryBuilt = true;
        }

        stages.forEach((stage, index) => {
            const stageStart = index * stageHeight;
            const stageEnd = (index + 1) * stageHeight;

            const img = stage.querySelector('.zoom-image');

            if (!img) return;

            /*
             * Before photo
             */
            if (progress < stageStart) {
                stage.style.opacity = '0';
                stage.classList.remove('active');

                img.style.transform =
                    `translate3d(0,0,0) scale(${startScales[index]})`;

                return;
            }

            /*
             * After photo
             */
            if (progress >= stageEnd) {
                stage.style.opacity = '0';
                stage.classList.remove('active');

                img.style.transform =
                    'translate3d(0,0,0) scale(4)';

                return;
            }

            /*
             * Current photo
             */
            stage.classList.add('active');

            const localProgress = clamp(
                (progress - stageStart) / stageHeight,
                0,
                1
            );

            const eased = easeInOutCubic(localProgress);

            const startScale = startScales[index];
            const scale = startScale + ((4 - startScale) * eased);

            /*
             * Fade only during the final 18%.
             */
            let opacity = 1;

            if (localProgress > 0.82) {
                const fadeProgress =
                    (localProgress - 0.82) / 0.18;

                opacity = 1 - easeOutCubic(fadeProgress);
            }

            stage.style.opacity = opacity;

            img.style.transform =
                `translate3d(0,0,0) scale(${scale})`;

            /*
             * Crossfade next image.
             *
             * The next image starts VERY zoomed in and pulls back
             * into its starting scale.
             */
            if (index < numStages - 1) {
                const nextStage = stages[index + 1];
                const nextImg = nextStage.querySelector('.zoom-image');

                const transitionStart = stageEnd - (stageHeight * 0.22);
                const transitionEnd = stageEnd;

                if (
                    progress >= transitionStart &&
                    progress < transitionEnd
                ) {
                    const transitionProgress = clamp(
                        (progress - transitionStart) /
                        (transitionEnd - transitionStart),
                        0,
                        1
                    );

                    const transitionEase =
                        easeOutCubic(transitionProgress);

                    nextStage.classList.add('active');
                    nextStage.style.opacity = transitionEase;

                    if (nextImg) {
                        const nextStartScale = startScales[index + 1];

                        const nextScale =
                            4 -
                            ((4 - nextStartScale) * transitionEase);

                        nextImg.style.transform =
                            `translate3d(0,0,0) scale(${nextScale})`;
                    }
                }
            }
        });
    }

    window.addEventListener('scroll', onScroll, {
        passive: true
    });

    // Handle mobile browser viewport changes
    const handleViewportResize = () => {
        const newVh = getViewportHeight();

        if (Math.abs(newVh - vh) > 20) {
            const newHeight =
                newVh * numStages * stageHeight;

            spacer.style.height = `${newHeight}px`;
        }
    };

    if (window.visualViewport) {
        window.visualViewport.addEventListener(
            'resize',
            handleViewportResize
        );
    }

    // Reset all images

    stages.forEach((stage, index) => {
        const img = stage.querySelector('.zoom-image');
        const wrapper = stage.querySelector('.zoom-image-wrapper');

        // Size the wrapper so the image still fully covers the
        // viewport even at this stage's lowest (start) scale.
        if (wrapper) {
            const minScale = startScales[index];
            const safety = 1.08; // 8% buffer so edges never peek through
            const wrapperPercent = Math.max(124, (100 / minScale) * safety);
            const overscan = (wrapperPercent - 100) / 2;

            wrapper.style.top = `-${overscan}%`;
            wrapper.style.left = `-${overscan}%`;
            wrapper.style.width = `${wrapperPercent}%`;
            wrapper.style.height = `${wrapperPercent}%`;
        }

        stage.style.opacity = index === 0 ? '1' : '0';

        if (index === 0) {
            stage.classList.add('active');
        } else {
            stage.classList.remove('active');
        }

        if (img) {
            img.style.transform =
                `translate3d(0,0,0) scale(${startScales[index]})`;
        }
    });

    targetScrollY = window.scrollY;
    renderedScrollY = window.scrollY;

    updateZoomStages(window.scrollY);
}


/* =========================================================
   UPDATE ZOOM
========================================================= */

function updateZoomStages(
    scrollY,
    stages,
    vh,
    stageHeight,
    scrollHint,
    gallerySection,
    isMobile
) {

    const numStages =
        stages.length;

    const totalHeight =
        stageHeight * numStages;


    /*
     * Overall progress.
     */

    const overallProgress =
        Math.min(
            Math.max(
                scrollY / totalHeight,
                0
            ),
            1
        );


    /*
     * Hide scroll hint.
     */

    if (scrollHint) {

        if (scrollY > vh * 0.4) {

            scrollHint.classList.add(
                'hidden'
            );

        } else {

            scrollHint.classList.remove(
                'hidden'
            );
        }
    }


    /*
     * Build gallery near the end.
     */

    if (
        overallProgress >= 0.90 &&
        !galleryBuilt
    ) {

        if (gallerySection) {

            gallerySection.classList.add(
                'visible'
            );
        }

        buildGallery();

        galleryBuilt = true;
    }


    /*
     * Update each photo.
     */

    stages.forEach((stage, index) => {

        const img =
            stage.querySelector(
                '.zoom-image'
            );

        if (!img) {
            return;
        }


        const stageStart =
            index * stageHeight;

        const stageEnd =
            stageStart + stageHeight;


        /*
         * Local progress.
         */

        let localProgress =
            (
                scrollY -
                stageStart
            ) /
            stageHeight;


        localProgress =
            Math.min(
                Math.max(
                    localProgress,
                    0
                ),
                1
            );


        /*
         * Starting scale.
         *
         * Img1-3 = 0.80
         * Img4   = 0.70
         */

        const startScale =
            index === 3
                ? 0.70
                : 0.80;

        const maxScale =
            4.0;


        /* =================================================
           BEFORE CURRENT IMAGE
        ================================================= */

        if (scrollY < stageStart) {

            stage.style.opacity = '0';

            stage.style.visibility =
                'hidden';

            stage.classList.remove(
                'active'
            );

            img.style.transform =
                `scale(${startScale})`;

            return;
        }


        /* =================================================
           AFTER CURRENT IMAGE
        ================================================= */

        if (scrollY >= stageEnd) {

            stage.style.opacity = '0';

            stage.style.visibility =
                'hidden';

            stage.classList.remove(
                'active'
            );

            img.style.transform =
                `scale(${maxScale})`;

            return;
        }


        /* =================================================
           CURRENT IMAGE
        ================================================= */

        stage.style.visibility =
            'visible';

        stage.classList.add(
            'active'
        );


        /*
         * Smooth zoom.
         */

        const eased =
            easeInOutCubic(
                localProgress
            );


        /*
         * Scale:
         *
         * Img1: 0.80 → 4.0
         * Img2: 0.80 → 4.0
         * Img3: 0.80 → 4.0
         * Img4: 0.70 → 4.0
         */

        const scale =
            startScale +
            (
                maxScale -
                startScale
            ) * eased;


        img.style.transform =
            `scale(${scale})`;


        /*
         * Fade during final 20%.
         */

        let opacity = 1;


        if (localProgress > 0.80) {

            const fadeProgress =
                (
                    localProgress -
                    0.80
                ) / 0.20;

            opacity =
                1 -
                easeOutCubic(
                    fadeProgress
                );
        }


        stage.style.opacity =
            opacity;


        /* =================================================
           NEXT IMAGE CROSSFADE
        ================================================= */

        if (
            index <
            numStages - 1
        ) {

            const nextStage =
                stages[index + 1];

            const nextImg =
                nextStage.querySelector(
                    '.zoom-image'
                );


            /*
             * Start transition during
             * final 25% of current stage.
             *
             * Mobile gets slightly longer
             * transition for touch scrolling.
             */

            const transitionStart =
                isMobile
                    ? 0.70
                    : 0.733333;


            if (
                localProgress >
                transitionStart
            ) {

                let transitionProgress =
                    (
                        localProgress -
                        transitionStart
                    ) /
                    (
                        1 -
                        transitionStart
                    );


                transitionProgress =
                    Math.min(
                        Math.max(
                            transitionProgress,
                            0
                        ),
                        1
                    );


                const easedTransition =
                    easeOutCubic(
                        transitionProgress
                    );


                nextStage.style.visibility =
                    'visible';

                nextStage.style.opacity =
                    easedTransition;

                nextStage.classList.add(
                    'active'
                );


                /*
                 * Next image starts at 4x
                 * and zooms OUT.
                 *
                 * Img4 uses 0.70 as its final
                 * zoomed-out scale.
                 */

                const nextIndex =
                    index + 1;

                const nextStartScale =
                    4.0;

                const nextEndScale =
                    nextIndex === 3
                        ? 0.70
                        : 0.80;


                const nextScale =
                    nextStartScale -
                    (
                        nextStartScale -
                        nextEndScale
                    ) *
                    easedTransition;


                if (nextImg) {

                    nextImg.style.transform =
                        `scale(${nextScale})`;

                    nextImg.style.opacity =
                        '1';
                }
            }
        }
    });
}


/* =========================================================
   EASING
========================================================= */

function easeInOutCubic(t) {

    if (t < 0.5) {

        return 4 *
            t *
            t *
            t;
    }

    return 1 -
        Math.pow(
            -2 * t + 2,
            3
        ) / 2;
}


function easeOutCubic(t) {

    return 1 -
        Math.pow(
            1 - t,
            3
        );
}


/* =========================================================
   GALLERY
========================================================= */

function buildGallery() {

    const grid =
        document.getElementById(
            'galleryGrid'
        );

    if (!grid) {
        return;
    }

    if (grid.children.length > 0) {
        return;
    }


    allImages.forEach(
        (src, index) => {

            const item =
                document.createElement(
                    'div'
                );

            item.className =
                'gallery-item';

            item.style.animationDelay =
                `${0.1 + index * 0.05}s`;


            const img =
                document.createElement(
                    'img'
                );

            img.src = src;

            img.alt =
                `Memory ${index + 1}`;

            img.loading = 'lazy';


            item.appendChild(img);


            item.addEventListener(
                'click',
                () => openLightbox(index)
            );


            grid.appendChild(item);
        }
    );
}


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(index) {

    currentLightboxIndex =
        index;

    const lightbox =
        document.getElementById(
            'lightbox'
        );

    if (!lightbox) {
        return;
    }


    const img =
        lightbox.querySelector(
            'img'
        );

    if (!img) {
        return;
    }


    img.src =
        allImages[
        currentLightboxIndex
        ];


    lightbox.classList.add(
        'active'
    );


    document.body.style.overflow =
        'hidden';
}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    const lightbox =
        document.getElementById(
            'lightbox'
        );

    if (lightbox) {

        lightbox.classList.remove(
            'active'
        );
    }

    document.body.style.overflow =
        '';
}


/* =========================================================
   LIGHTBOX NAVIGATION
========================================================= */

function navigateLightbox(direction) {

    currentLightboxIndex =
        (
            currentLightboxIndex +
            direction +
            allImages.length
        ) %
        allImages.length;


    const lightbox =
        document.getElementById(
            'lightbox'
        );

    if (!lightbox) {
        return;
    }


    const img =
        lightbox.querySelector(
            'img'
        );

    if (!img) {
        return;
    }


    img.style.transform =
        'scale(0.9)';


    setTimeout(() => {

        img.src =
            allImages[
            currentLightboxIndex
            ];

        img.style.transform =
            'scale(1)';

    }, 150);
}


/* =========================================================
   LIGHTBOX KEYBOARD
========================================================= */

function handleLightboxKeydown(e) {

    if (e.key === 'Escape') {
        closeLightbox();
    }

    if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    }

    if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
}


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

    createFloatingHearts();

    createSparkles();


    /*
     * Begin button.
     */

    const startBtn =
        document.getElementById(
            'startBtn'
        );

    if (startBtn) {

        startBtn.addEventListener(
            'click',
            () => {

                showScreen(
                    'questionScreen'
                );

                document.body.classList.add(
                    'lock-scroll'
                );


                setTimeout(() => {

                    const input =
                        document.getElementById(
                            'nicknameInput'
                        );

                    if (input) {
                        input.focus();
                    }

                }, 300);
            }
        );
    }


    /*
     * Submit button.
     */

    const submitBtn =
        document.getElementById(
            'submitBtn'
        );

    if (submitBtn) {

        submitBtn.addEventListener(
            'click',
            handleAnswer
        );
    }


    /*
     * Enter key.
     */

    const nicknameInput =
        document.getElementById(
            'nicknameInput'
        );

    if (nicknameInput) {

        nicknameInput.addEventListener(
            'keydown',
            (e) => {

                if (e.key === 'Enter') {
                    handleAnswer();
                }

            }
        );


        nicknameInput.addEventListener(
            'input',
            () => {

                const errorEl =
                    document.getElementById(
                        'answerError'
                    );

                if (errorEl) {

                    errorEl.classList.remove(
                        'show'
                    );
                }
            }
        );
    }


    /*
     * Lightbox.
     */

    const lightbox =
        document.getElementById(
            'lightbox'
        );

    if (lightbox) {

        const closeBtn =
            lightbox.querySelector(
                '.lightbox-close'
            );

        const prevBtn =
            lightbox.querySelector(
                '.lightbox-prev'
            );

        const nextBtn =
            lightbox.querySelector(
                '.lightbox-next'
            );


        if (closeBtn) {

            closeBtn.addEventListener(
                'click',
                closeLightbox
            );
        }


        if (prevBtn) {

            prevBtn.addEventListener(
                'click',
                () => navigateLightbox(-1)
            );
        }


        if (nextBtn) {

            nextBtn.addEventListener(
                'click',
                () => navigateLightbox(1)
            );
        }


        lightbox.addEventListener(
            'click',
            (e) => {

                if (
                    e.target ===
                    lightbox
                ) {
                    closeLightbox();
                }

            }
        );
    }


    document.addEventListener(
        'keydown',
        handleLightboxKeydown
    );
}


/* =========================================================
   START
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    init
);