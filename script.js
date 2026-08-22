document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const textToType = "decisions driven by data. results powered by ai.";
    const typewriterElement = document.getElementById('typewriter');
    let i = 0;

    function typeWriter() {
        if (!typewriterElement) return;
        if (i < textToType.length) {
            typewriterElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Typing speed
        }
    }

    // --- Resume Modal Logic ---
    (function initResumeModal() {
        const overlay = document.getElementById('resumeModalOverlay');
        const iframe = document.getElementById('resumeIframe');
        const openBtn = document.getElementById('open-resume-btn');
        const closeBtn = document.getElementById('closeResumeModal');
        const footerClose = document.getElementById('resumeFooterClose');
        if (!overlay || !openBtn) return;

        let iframeLoaded = false;

        function openModal() {
            if (!iframeLoaded) {
                iframe.src = iframe.getAttribute('data-src');
                iframeLoaded = true;
            }
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (footerClose) footerClose.addEventListener('click', closeModal);

        // Close on overlay click (outside modal)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
        });
    })();

    // Hide UI for boot sequence
    document.body.style.overflow = 'hidden';
    const uiElements = document.querySelectorAll('header, .hero-content, section');
    uiElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 1.5s ease-in-out';
    });

    // 2. Animate Numbers in About Section
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateNumbers() {
        if (animated) return;
        animated = true;

        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.innerText = target;
                }
            };
            updateNumber();
        });
    }

    // 3. Protected Certificate Viewer System
    const skillData = {
        excel: {
            name: 'Microsoft Excel',
            cert: 'Excel Skills for Business Specialization',
            issuer: 'Macquarie University Ã‚Â· Coursera',
            image: 'excel.jpg',
            hasCert: true
        },
        mysql: {
            name: 'MySQL',
            cert: 'SQL for Data Science',
            issuer: 'University of California, Davis Ã‚Â· Coursera',
            image: 'mysql.jpg',
            hasCert: true
        },
        powerbi: {
            name: 'Power BI',
            cert: 'Microsoft Power BI Data Analyst Professional Certificate',
            issuer: 'Microsoft Ã‚Â· Coursera',
            image: 'powerbi.jpg',
            hasCert: true
        },
        statistics: {
            name: 'Statistics',
            cert: 'Statistics with Python Specialization',
            issuer: 'University of Michigan Ã‚Â· Coursera',
            image: 'statistics.jpg',
            hasCert: true
        },
        python: {
            name: 'Python',
            cert: 'Python for Everybody Specialization',
            issuer: 'University of Michigan Ã‚Â· Coursera',
            image: 'python.jpg',
            hasCert: true
        },
        ml: {
            name: 'Machine Learning',
            cert: 'Machine Learning Specialization',
            issuer: 'Stanford University Ã‚Â· DeepLearning.AI Ã‚Â· Coursera',
            image: 'ml.jpg',
            hasCert: true
        },
        deeplearning: {
            name: 'Deep Learning',
            cert: 'Artificial Intelligence Essentials',
            issuer: 'I.T.VEDANT',
            image: 'deeplearning.jpg',
            hasCert: true
        }
    };

    // DOM references for certificate viewer
    const certViewer = document.getElementById('certViewer');
    const certViewerClose = document.getElementById('certViewerClose');
    const certViewerIcon = document.getElementById('certViewerIcon');
    const certViewerTitle = document.getElementById('certViewerTitle');
    const certViewerSubtitle = document.getElementById('certViewerSubtitle');
    const certCanvasContainer = document.getElementById('certCanvasContainer');
    const certCanvas = document.getElementById('certCanvas');
    const certOngoingContainer = document.getElementById('certOngoingContainer');
    const certBadgeRow = document.getElementById('certBadgeRow');
    const certCtx = certCanvas ? certCanvas.getContext('2d') : null;
    const skillItems = document.querySelectorAll('.skill-logo-item');

    // Render certificate image onto canvas (protected Ã¢â‚¬â€ no <img> exposed)
    // Tries multiple extensions as fallback: .jpg Ã¢â€ â€™ .jpeg Ã¢â€ â€™ .png Ã¢â€ â€™ .webp
    function renderCertOnCanvas(basePath, callback) {
        if (!certCtx) return;

        // Derive base name without extension for fallback attempts
        const dotIdx = basePath.lastIndexOf('.');
        const baseName = dotIdx !== -1 ? basePath.substring(0, dotIdx) : basePath;
        const extensions = ['.jpg', '.jpeg', '.png', '.webp'];

        // Start with opacity 0 for smooth fade-in
        certCanvas.style.opacity = '0';
        certCanvas.style.transition = 'opacity 0.5s ease';

        // Set minimum height to prevent layout shift during loading
        certCanvasContainer.style.minHeight = '300px';
        certCanvasContainer.classList.add('loading');

        let attemptIndex = 0;

        function tryLoad() {
            if (attemptIndex >= extensions.length) {
                // All extensions failed Ã¢â‚¬â€ show clean placeholder
                const w = 660, h = 400;
                certCanvas.width = w;
                certCanvas.height = h;
                certCtx.fillStyle = '#0c1018';
                certCtx.fillRect(0, 0, w, h);
                certCtx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
                certCtx.lineWidth = 1.5;
                certCtx.setLineDash([6, 6]);
                certCtx.strokeRect(40, 40, w - 80, h - 80);
                certCtx.setLineDash([]);
                certCtx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                certCtx.font = '15px Inter, sans-serif';
                certCtx.textAlign = 'center';
                certCtx.fillText('Certificate will appear here once the image is added', w / 2, h / 2 - 8);
                certCtx.fillStyle = 'rgba(255, 255, 255, 0.12)';
                certCtx.font = '11px monospace';
                certCtx.fillText(`Place image at: ${baseName}.jpg`, w / 2, h / 2 + 18);
                certCanvasContainer.classList.remove('loading');
                certCanvasContainer.style.minHeight = '';
                certCanvas.style.opacity = '1';
                if (callback) callback();
                return;
            }

            const src = baseName + extensions[attemptIndex];
            const img = new Image();

            img.onload = function () {
                // Size canvas to image aspect ratio, constrained to modal width
                const maxW = 660;
                const scale = Math.min(maxW / img.width, 1);
                const w = Math.floor(img.width * scale);
                const h = Math.floor(img.height * scale);
                certCanvas.width = w;
                certCanvas.height = h;
                certCanvas.style.height = 'auto';

                // Draw certificate image
                certCtx.drawImage(img, 0, 0, w, h);

                // Draw canvas-level watermark (baked into pixel data)
                certCtx.save();
                certCtx.translate(w / 2, h / 2);
                certCtx.rotate(-0.42);
                certCtx.font = `bold ${Math.max(16, w * 0.04)}px Inter, sans-serif`;
                certCtx.fillStyle = 'rgba(255, 255, 255, 0.045)';
                certCtx.textAlign = 'center';
                certCtx.textBaseline = 'middle';
                const wmText = 'PREVIEW ONLY  Ã‚Â·  JeevaKanna.E';
                const spacing = Math.max(60, h * 0.18);
                for (let row = -3; row <= 3; row++) {
                    certCtx.fillText(wmText, 0, row * spacing);
                }
                certCtx.restore();

                certCanvasContainer.classList.remove('loading');
                certCanvasContainer.style.minHeight = '';
                // Smooth fade-in
                requestAnimationFrame(() => {
                    certCanvas.style.opacity = '1';
                });
                if (callback) callback();
            };

            img.onerror = function () {
                // Try next extension
                attemptIndex++;
                tryLoad();
            };

            img.src = src;
        }

        tryLoad();
    }

    function openCertViewer(skillKey) {
        const data = skillData[skillKey];
        if (!data) return;

        // Clone icon
        const item = document.querySelector(`.skill-logo-item[data-skill="${skillKey}"]`);
        const svgClone = item.querySelector('.skill-icon-wrap svg').cloneNode(true);
        certViewerIcon.innerHTML = '';
        certViewerIcon.appendChild(svgClone);

        certViewerTitle.textContent = data.name;

        // Reset visibility
        certCanvasContainer.classList.remove('visible');
        certOngoingContainer.classList.remove('visible');

        if (data.hasCert) {
            certViewerSubtitle.textContent = data.issuer || '';
            certCanvasContainer.classList.add('visible');
            renderCertOnCanvas(data.image);

            certBadgeRow.innerHTML = `
                <div class="cert-badge-pill">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    ${data.cert}
                </div>
            `;
        } else {
            certViewerSubtitle.textContent = 'Ongoing Specialization';
            certOngoingContainer.classList.add('visible');

            certBadgeRow.innerHTML = `
                <div class="cert-badge-pill ongoing">
                    <span class="ongoing-pulse"></span>
                    Currently Learning
                </div>
            `;
        }

        certViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCertViewer() {
        certViewer.classList.remove('active');
        document.body.style.overflow = '';
        // Clear canvas after transition
        setTimeout(() => {
            if (certCtx) {
                certCtx.clearRect(0, 0, certCanvas.width, certCanvas.height);
            }
        }, 500);
    }

    // Click handlers for skill items
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            openCertViewer(item.getAttribute('data-skill'));
        });
    });

    // Close handlers
    if (certViewerClose) {
        certViewerClose.addEventListener('click', closeCertViewer);
    }
    if (certViewer) {
        certViewer.addEventListener('click', (e) => {
            if (e.target === certViewer) closeCertViewer();
        });
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ PROTECTION LAYER Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    // Block right-click on the entire viewer
    if (certViewer) {
        certViewer.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    // Block drag on all elements inside the viewer
    document.addEventListener('dragstart', (e) => {
        if (certViewer && certViewer.classList.contains('active')) {
            e.preventDefault();
        }
    });

    // Block common save/inspect keyboard shortcuts when viewer is open
    document.addEventListener('keydown', (e) => {
        // Always allow Escape to close
        if (e.key === 'Escape') {
            closeCertViewer();
            return;
        }

        // Only block shortcuts when viewer is active
        if (!certViewer || !certViewer.classList.contains('active')) return;

        const blocked = [
            // Ctrl+S (Save)
            (e.ctrlKey && e.key === 's'),
            // Ctrl+Shift+I (DevTools)
            (e.ctrlKey && e.shiftKey && e.key === 'I'),
            // Ctrl+Shift+J (Console)
            (e.ctrlKey && e.shiftKey && e.key === 'J'),
            // Ctrl+U (View Source)
            (e.ctrlKey && e.key === 'u'),
            // Ctrl+Shift+C (Inspector)
            (e.ctrlKey && e.shiftKey && e.key === 'C'),
            // Ctrl+P (Print)
            (e.ctrlKey && e.key === 'p'),
            // F12 (DevTools)
            (e.key === 'F12'),
            // PrintScreen
            (e.key === 'PrintScreen'),
        ];

        if (blocked.some(Boolean)) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Block touch long-press context menu on mobile
    if (certViewer) {
        certViewer.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) e.preventDefault();
        }, { passive: false });
    }

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    animateNumbers();
                }
            }
        });
    }, { threshold: 0.3 });

    const aboutSection = document.getElementById('about');
    const skillsSection = document.getElementById('skills');

    if (aboutSection) observer.observe(aboutSection);

    // 4. Hero Background Layers
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;

    // Layer 1: Floating Neural Network Background
    const nnNodes = [];
    const numNNNodes = 45;

    // Boot Sequence Variables
    let bootPhase = 'INIT';
    let bootTimer = 60;
    const bootMessages = [
        "Initializing Neural Hub...",
        "Loading Model Tensors...",
        "Syncing Data Pipelines...",
        "AI Core Agent Online."
    ];
    let bootMsgIndex = 0;
    let systemAlpha = 0;

    // Mouse parallax (throttled to 24ms to prevent main thread blocking)
    let mouseX = 0, mouseY = 0;
    let lastMouseMoveTime = 0;
    document.addEventListener('mousemove', e => {
        const now = Date.now();
        if (now - lastMouseMoveTime >= 24) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastMouseMoveTime = now;
        }
    });

    // Layout caching to prevent layout thrashing
    const sectionLayouts = {};
    function cacheSectionLayouts() {
        const sections = ['hero', 'about', 'skills', 'experience', 'contact'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                sectionLayouts[id] = {
                    top: el.offsetTop,
                    height: el.offsetHeight
                };
            }
        });
    }

    // Emergency performance recovery parameters
    let travelEffectsDisabled = false;
    let consecutiveSlowFrames = 0;
    let lastFrameTime = performance.now();
    let fps = 60;
    let fpsFrameCount = 0;
    let fpsLastUpdateTime = performance.now();


    // ML Ops buttons (canvas drawn)
    const decisionButtons = [];

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Procedural Abstract Neural Network Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    let faceNodes = [];        // Dynamic active nodes in the network
    let faceConnections = [];  // Dynamic nearest-neighbor connections
    let pulseSignals = [];     // Traveling data energy signals
    let sparkParticles = [];   // Sparks when connections lock in
    let clusterRings = [];     // Rotating tech rings at cluster centers

    // Immersive Neural Navigation Nodes Configuration
    const navNodes = [
        { id: 'hero', label: 'Home', targetX: 0.84, targetY: 0.16, x: 0, y: 0, hoverAlpha: 0, activeAlpha: 0, pulsePhase: 0, ringAngle: 0, selected: true, magneticX: 0, magneticY: 0, hovered: false },
        { id: 'about', label: 'About', targetX: 0.72, targetY: 0.32, x: 0, y: 0, hoverAlpha: 0, activeAlpha: 0, pulsePhase: Math.PI * 0.4, ringAngle: 1.2, selected: false, magneticX: 0, magneticY: 0, hovered: false },
        { id: 'skills', label: 'Skills', targetX: 0.86, targetY: 0.48, x: 0, y: 0, hoverAlpha: 0, activeAlpha: 0, pulsePhase: Math.PI * 0.8, ringAngle: 2.4, selected: false, magneticX: 0, magneticY: 0, hovered: false },
        { id: 'experience', label: 'Experience', targetX: 0.74, targetY: 0.64, x: 0, y: 0, hoverAlpha: 0, activeAlpha: 0, pulsePhase: Math.PI * 1.0, ringAngle: 3.0, selected: false, magneticX: 0, magneticY: 0, hovered: false },
        { id: 'contact', label: 'Contact', targetX: 0.86, targetY: 0.80, x: 0, y: 0, hoverAlpha: 0, activeAlpha: 0, pulsePhase: Math.PI * 1.6, ringAngle: 4.8, selected: false, magneticX: 0, magneticY: 0, hovered: false }
    ];

    // Nav node DOM elements are cached after container cloning below
    let travelWaves = []; // shockwave ripples expanding from clicked nodes
    let chainPulses = []; // pulses traveling along the navigation chain

    // Cinematic Camera and AI Neural Travel State Control
    let isTraveling = false;
    let travelProgress = 0; // 0 to 1 progression
    let travelPath = []; // Coordinates of path nodes [{x, y}, ...]
    let travelSamples = []; // Catmull-Rom samples for distance-based progression
    let travelStartNode = null;
    let travelEndNode = null;
    let travelTimer = 0;
    let travelDuration = 90; // Calculated dynamically per transition
    let activeBeaconNode = null;

    let isTransitioning = false;
    let lastClickTime = 0;
    const clickCooldown = 1200; // 1200ms click cooldown
    const hoverDebounceMs = 80;
    let hoverTimeout = null;
    let travelTimeoutTimer = null;

    const defaultCamera = {
        x: 0,
        y: 0,
        zoom: 1.0,
        rotation: 0.0
    };
    
    const camera = {
        x: defaultCamera.x,
        y: defaultCamera.y,
        zoom: defaultCamera.zoom,
        rotation: defaultCamera.rotation
    };

    // Shared coordinate translator applying parallax, magnetic shifts, and camera projections
    const getParallaxCoord = (node) => {
        const px = (mouseX / width - 0.5) * 22;
        const py = (mouseY / height - 0.5) * 12;
        const f = node.parallaxFactor !== undefined ? node.parallaxFactor : 0.8;
        const mx = node.magneticX || 0;
        const my = node.magneticY || 0;
        
        let x = node.x + px * f + mx;
        let y = node.y + py * f + my;
        
        // Always apply camera projections to allow dynamic resizing and shifting per section
        x = (x - camera.x) * camera.zoom + width / 2;
        y = (y - camera.y) * camera.zoom + height / 2;
        
        if (camera.rotation !== 0) {
            const dx = x - width / 2;
            const dy = y - height / 2;
            const cos = Math.cos(camera.rotation);
            const sin = Math.sin(camera.rotation);
            x = width / 2 + dx * cos - dy * sin;
            y = height / 2 + dx * sin + dy * cos;
        }
        
        return { x, y };
    };

    // Configurations
    const MIN_NODE_SPACING = 36;  // Spacing threshold to prevent stacked nodes
    const NODE_LIFESPAN    = 9999; // Nodes never expire passively Ã¢â‚¬â€ only fade during deploy
    const MAX_ACTIVE_NODES = 80;  // Soft ceiling; oldest gently retired when exceeded

    // Session-locked Neural Layout Generation State
    let sessionNetworkGenerated = false;
    let lockedFaceNodes = [];
    let lockedFaceConnections = [];
    let lockedNavNodesMapping = []; // stores indices of selected nodes in lockedFaceNodes

    function preGenerateNeuralNetwork() {
        const tempNodes = [];
        const tempConnections = [];

        // Simulate robot's organic wander path and trySpawnProceduralNode calls
        let rx = width * 0.62;
        let ry = height * 0.40;
        let rvx = 0, rvy = 0;
        let rWanderX = width * (0.52 + Math.random() * 0.36);
        let rWanderY = height * (0.16 + Math.random() * 0.68);

        function simulateSpawnNode(x, y) {
            if (tempNodes.length >= MAX_ACTIVE_NODES) return;

            const angle = Math.random() * Math.PI * 2;
            const distance = 25 + Math.random() * 55;
            const proposedX = x + Math.cos(angle) * distance;
            const proposedY = y + Math.sin(angle) * distance;

            const constrainedX = Math.max(width * 0.48, Math.min(width * 0.92, proposedX));
            const constrainedY = Math.max(height * 0.12, Math.min(height * 0.88, proposedY));

            // Collision check: prevent duplicate coords
            for (const other of tempNodes) {
                const dx = constrainedX - other.x;
                const dy = constrainedY - other.y;
                if (Math.sqrt(dx * dx + dy * dy) < MIN_NODE_SPACING) {
                    return;
                }
            }

            const rand = Math.random();
            const category = rand < 0.22 ? 'eye' : (rand < 0.62 ? 'brain' : 'outer');

            const node = {
                x: constrainedX,
                y: constrainedY,
                targetX: constrainedX / width,
                targetY: constrainedY / height,
                placed: false,
                alpha: 0,
                life: NODE_LIFESPAN,
                pulsePhase: Math.random() * Math.PI * 2,
                glowR: 2.2 + Math.random() * 2.8,
                isEye: category === 'eye',
                isBrain: category === 'brain',
                isOuter: category === 'outer',
                scale: 0.55 + Math.random() * 0.65,
                parallaxFactor: 0.4 + Math.random() * 0.8,
                magneticX: 0,
                magneticY: 0,
                hovered: false,
                selected: false
            };

            tempNodes.push(node);

            // Establish connections
            const searchRadius = 145 + Math.random() * 30;
            const maxConnections = 3;
            let localConns = [];

            for (const other of tempNodes) {
                if (other === node) continue;
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < searchRadius) {
                    localConns.push({ node: other, dist });
                }
            }

            localConns.sort((a, b) => a.dist - b.dist);
            const connsToMake = localConns.slice(0, maxConnections);

            connsToMake.forEach(c => {
                tempConnections.push({
                    nodeA: node,
                    nodeB: c.node,
                    alpha: 0,
                    drawProgress: 0,
                    dist: c.dist
                });
            });
        }

        // Simulate 520 placement frames
        for (let step = 0; step < 520; step++) {
            const dx = rWanderX - rx;
            const dy = rWanderY - ry;
            const distToTarget = Math.hypot(dx, dy);

            if (distToTarget < 50 || !rWanderX) {
                rWanderX = width * (0.52 + Math.random() * 0.36);
                rWanderY = height * (0.16 + Math.random() * 0.68);
            }

            const steerX = (dx / distToTarget) * 0.28;
            const steerY = (dy / distToTarget) * 0.28;

            rvx += steerX;
            rvy += steerY;
            rvx *= 0.94;
            rvy *= 0.94;

            rx += rvx;
            ry += rvy;

            if (step % 8 === 0 && tempNodes.length < MAX_ACTIVE_NODES) {
                simulateSpawnNode(rx, ry);
            }
        }

        // Filter valid pool of nodes for labels
        const bX = Math.round(Math.max(width * 0.57, 520));
        const bY = Math.round(height * 0.78);
        const validNodes = tempNodes.filter(n => {
            // Must be on the right half to clear hero text
            if (n.x < width * 0.50) return false;
            // Clear navbar
            if (n.y < 110) return false;
            // Clear footer
            if (n.y > height - 60) return false;
            // Clear ML buttons
            if (n.x > bX - 40 && n.y > bY - 50) return false;
            
            // Must be connected (connection count >= 2)
            const connCount = tempConnections.filter(c => c.nodeA === n || c.nodeB === n).length;
            if (connCount < 2) return false;
            
            return true;
        });

        // Safe placement: choose navigation nodes dynamically matching navNodes.length with min distance 180px (fallback to 130px)
        const targetNodeCount = navNodes.length;
        let selectedNodes = [];
        let currentMinDistance = 180;
        while (selectedNodes.length < targetNodeCount && currentMinDistance >= 130) {
            let attempts = 0;
            while (selectedNodes.length < targetNodeCount && attempts < 100) {
                attempts++;
                selectedNodes = [];
                const shuffled = [...validNodes].sort(() => Math.random() - 0.5);
                
                for (const node of shuffled) {
                    let tooClose = false;
                    for (const sel of selectedNodes) {
                        const dist = Math.hypot(node.x - sel.x, node.y - sel.y);
                        if (dist < currentMinDistance) {
                            tooClose = true;
                            break;
                        }
                    }
                    if (!tooClose) {
                        selectedNodes.push(node);
                        if (selectedNodes.length === targetNodeCount) break;
                    }
                }
            }
            if (selectedNodes.length < targetNodeCount) {
                currentMinDistance -= 10;
            }
        }

        // Fallback pick if still unfulfilled
        if (selectedNodes.length < targetNodeCount) {
            selectedNodes = validNodes.slice(0, targetNodeCount);
        }

        // Sort by Y coordinate so vertical scroll order matches vertical screen order
        selectedNodes.sort((a, b) => a.y - b.y);

        // Lock layout references
        lockedFaceNodes = tempNodes;
        lockedFaceConnections = tempConnections;
        lockedNavNodesMapping = selectedNodes.map(n => tempNodes.indexOf(n));
        sessionNetworkGenerated = true;
    }

    function initFaceNodes() {
        if (!sessionNetworkGenerated) {
            preGenerateNeuralNetwork();
        } else {
            // Re-scale locked nodes dynamically on canvas resize
            lockedFaceNodes.forEach(node => {
                node.x = node.targetX * width;
                node.y = node.targetY * height;
            });
            lockedFaceConnections.forEach(c => {
                c.dist = Math.hypot(c.nodeA.x - c.nodeB.x, c.nodeA.y - c.nodeB.y);
            });
        }

        // Copy locked structure to live network arrays
        faceNodes = lockedFaceNodes;
        faceConnections = lockedFaceConnections;

        // Map navigation nodes to faceNodes and synchronise coordinates
        navNodes.forEach((nav, idx) => {
            const mappedIdx = lockedNavNodesMapping[idx];
            const node = faceNodes[mappedIdx];
            if (node) {
                nav.faceNodeRef = node;
                
                nav.x = node.x;
                nav.y = node.y;
                nav.targetX = node.targetX;
                nav.targetY = node.targetY;
                nav.parallaxFactor = node.parallaxFactor;
            }
        });

        pulseSignals = [];
        sparkParticles = [];
        clusterRings = [];
        
        // Reset robot wandering variables
        robot.vx = 0;
        robot.vy = 0;
        robot.wanderTargetX = 0;
        robot.wanderTargetY = 0;
        robot.placeTimer = 0;
    }

    function trySpawnProceduralNode(x, y) {
        if (faceNodes.length >= MAX_ACTIVE_NODES) return;

        // Radial offset distribution for organic neural branching
        const angle = Math.random() * Math.PI * 2;
        const distance = 25 + Math.random() * 55; // Spread offset
        const proposedX = x + Math.cos(angle) * distance;
        const proposedY = y + Math.sin(angle) * distance;

        // Constrain coordinates to safe viewport boundaries (right section)
        const constrainedX = Math.max(width * 0.48, Math.min(width * 0.92, proposedX));
        const constrainedY = Math.max(height * 0.12, Math.min(height * 0.88, proposedY));

        // Collision check: prevent duplicate coords and direct stack-ups
        for (const other of faceNodes) {
            const dx = constrainedX - other.x;
            const dy = constrainedY - other.y;
            if (Math.sqrt(dx * dx + dy * dy) < MIN_NODE_SPACING) {
                return; // Reject coordinate
            }
        }

        // Color and tech categorization
        const rand = Math.random();
        const category = rand < 0.22 ? 'eye' : (rand < 0.62 ? 'brain' : 'outer');

        const node = {
            x: constrainedX,
            y: constrainedY,
            placed: true,
            alpha: 0,
            life: NODE_LIFESPAN,
            pulsePhase: Math.random() * Math.PI * 2,
            glowR: 2.2 + Math.random() * 2.8,
            isEye: category === 'eye',
            isBrain: category === 'brain',
            isOuter: category === 'outer',
            scale: 0.55 + Math.random() * 0.65,
            parallaxFactor: 0.4 + Math.random() * 0.8
        };

        faceNodes.push(node);

        // Emit visual connection sparks
        for (let i = 0; i < 4; i++) {
            sparkParticles.push({
                x: node.x, y: node.y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                size: 1 + Math.random() * 2.2,
                life: 1,
                decay: 0.035 + Math.random() * 0.045
            });
        }

        // Establish connections based on real nearest-neighbor proximity
        const searchRadius = 145 + Math.random() * 30;
        const maxConnections = 3;
        let localConns = [];

        for (const other of faceNodes) {
            if (other === node) continue;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < searchRadius) {
                localConns.push({ node: other, dist });
            }
        }

        // Weave nearby navigation nodes into the procedural network
        navNodes.forEach(nav => {
            const dx = node.x - nav.x;
            const dy = node.y - nav.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < searchRadius) {
                localConns.push({ node: nav, dist });
            }
        });

        localConns.sort((a, b) => a.dist - b.dist);
        const connsToMake = localConns.slice(0, maxConnections);

        connsToMake.forEach(c => {
            faceConnections.push({
                nodeA: node,
                nodeB: c.node, // Actual object reference to dodge index shifting
                alpha: 0,
                drawProgress: 0,
                dist: c.dist
            });
        });

        // Spawn rotating tech rings at cluster locations
        if (localConns.length >= 4 && Math.random() < 0.20 && clusterRings.length < 5) {
            clusterRings.push({
                x: node.x,
                y: node.y,
                maxR: 28 + Math.random() * 42,
                currentR: 0,
                speed: (0.01 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1),
                alpha: 0.12 + Math.random() * 0.18,
                color: node.isEye ? '0, 240, 255' : '124, 77, 255'
            });
        }
    }

    function initButtons() {
        decisionButtons.length = 0;
        // Right side of hero Ã¢â‚¬â€ in the neural-network canvas area
        // width*0.57 places them clearly to the right; clamped so they never
        // creep into the left hero text on any screen size.
        const bX = Math.round(Math.max(width * 0.57, 520));
        const bY = Math.round(height * 0.78);
        decisionButtons.push({ type: 'TRAIN',  x: bX,       y: bY, width: 130, height: 40, active: 0, color: '#7c4dff' });
        decisionButtons.push({ type: 'DEPLOY', x: bX + 150, y: bY, width: 140, height: 40, active: 0, color: '#00f0ff' });
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Floating Background Stars Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const bgStars = Array.from({ length: 60 }, () => ({
        x: Math.random(), y: Math.random(),
        r: 0.3 + Math.random() * 1.0,
        alpha: 0.04 + Math.random() * 0.12,
        speed: 0.00008 + Math.random() * 0.0001
    }));

    function drawBackground() {
        // Deep dark gradient (slightly dimmed during travel to enhance focus on active route)
        const grad = ctx.createRadialGradient(width * 0.7, height * 0.4, 0, width * 0.7, height * 0.4, width * 0.6);
        let darkAdd = isTraveling ? 0.3 * Math.sin(travelProgress * Math.PI) : 0;
        grad.addColorStop(0, `rgba(0, 18, 48, ${0.55 - darkAdd})`);
        grad.addColorStop(1, `rgba(3, 5, 8, ${darkAdd * 0.4})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtle grid
        ctx.strokeStyle = 'rgba(0, 180, 255, 0.025)';
        ctx.lineWidth = 1;
        for (let y = 0; y < height; y += 70) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }
        for (let x = 0; x < width; x += 70) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }

        // Stars / ambient particles
        bgStars.forEach(s => {
            s.y -= s.speed;
            if (s.y < 0) { s.y = 1; s.x = Math.random(); }
            ctx.beginPath();
            ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 200, 255, ${s.alpha})`;
            ctx.fill();
        });
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ HUD Rings inside brain Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const hudRings = [
        { r: 0.08, speed: 0.004, dashLen: 6, gap: 4, color: '0, 240, 255', alpha: 0.18 },
        { r: 0.12, speed: -0.003, dashLen: 4, gap: 8, color: '124, 77, 255', alpha: 0.13 },
        { r: 0.17, speed: 0.002, dashLen: 12, gap: 6, color: '0, 200, 255', alpha: 0.09 },
    ];
    let hudAngle = 0;
    let hudAlpha = 0; // fades in after face complete

    function drawHUD() {
        if (isTraveling || hudAlpha <= 0) return;
        // HUD center = center of brain region
        const cx = width * 0.68;
        const cy = height * 0.30;
        const baseR = Math.min(width, height) * 0.13;

        // Parallax offset
        const px = (mouseX / width - 0.5) * 12;
        const py = (mouseY / height - 0.5) * 8;

        ctx.save();
        ctx.translate(cx + px, cy + py);
        ctx.globalAlpha *= hudAlpha;

        hudRings.forEach((ring, ri) => {
            const rr = baseR * ring.r / 0.08; // proportional
            // Actually use ring.r as fraction of baseR
            const r = baseR * [1, 1.5, 2.1][ri];
            const angle = hudAngle * ring.speed * 200 + ri;
            ctx.save();
            ctx.rotate(angle);
            ctx.setLineDash([ring.dashLen, ring.gap]);
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha * hudAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);

            // tick marks
            for (let t = 0; t < 8; t++) {
                const ta = (t / 8) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(Math.cos(ta) * (r - 4), Math.sin(ta) * (r - 4));
                ctx.lineTo(Math.cos(ta) * (r + 4), Math.sin(ta) * (r + 4));
                ctx.strokeStyle = `rgba(${ring.color}, ${0.35 * hudAlpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();
        });

        // Central energy dot
        const t = Date.now() * 0.001;
        const pulseR = 4 + Math.sin(t * 3) * 2;
        ctx.beginPath();
        ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${0.6 * hudAlpha})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Neural wave rings expanding
        const waveT = (t * 0.7) % 1;
        ctx.beginPath();
        ctx.arc(0, 0, waveT * baseR * 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${(1 - waveT) * 0.12 * hudAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Procedural Network Rendering & Lifespan Decay Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    let faceAlpha = 1; // Controlled by fade states
    let constructionPhase = 0; // 0=inactive,1=placing,2=connecting,3=glowing,4=hold,5=fadeout

    function updatePulseSignals() {
        if (constructionPhase < 3) return;
        // Spawn energy signals flowing along active connection lines
        if (Math.random() < 0.07 && faceConnections.length > 0) {
            const conn = faceConnections[Math.floor(Math.random() * faceConnections.length)];
            // Allow pulses on any node with remaining alpha Ã¢â‚¬â€ not just fresh ones
            if (conn.nodeA.alpha > 0.15 && conn.nodeB.alpha > 0.15) {
                pulseSignals.push({ conn, t: 0, speed: 0.008 + Math.random() * 0.014, fwd: Math.random() > 0.5 });
            }
        }
        for (let i = pulseSignals.length - 1; i >= 0; i--) {
            const sig = pulseSignals[i];
            sig.t += sig.speed;
            // Prune pulse only when it has finished travelling or both nodes are invisible
            if (sig.t >= 1 || (sig.conn.nodeA.alpha <= 0 && sig.conn.nodeB.alpha <= 0)) {
                pulseSignals.splice(i, 1);
            }
        }
    }

    function updateProceduralNetwork() {
        // Ã¢â€â‚¬Ã¢â€â‚¬ Phase flags Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
        // Nodes do NOT age during phases 0-4 (IDLE Ã¢â€ â€™ HOLD).
        // Aging only begins after deploy is triggered (constructionPhase 5 = fadeout).
        const isDeploying  = constructionPhase >= 5;
        const isBuilding   = constructionPhase === 1; // PLACING phase only

        for (let i = faceNodes.length - 1; i >= 0; i--) {
            const n = faceNodes[i];

            // Fade nodes IN quickly when freshly placed
            if (n.placed && n.alpha < 1 && !isDeploying) {
                n.alpha = Math.min(1, n.alpha + 0.07);
            }

            // Continuous micro ambient drift Ã¢â‚¬â€ keeps the network feeling alive (paused during travel)
            if (!isTraveling) {
                n.pulsePhase += 0.012;
                n.x += Math.cos(n.pulsePhase * 0.5) * 0.12;
                n.y += Math.sin(n.pulsePhase * 0.8) * 0.12;
            }

            // Ã¢â€â‚¬Ã¢â€â‚¬ Lifespan logic Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
            if (isDeploying) {
                // After deploy click: staggered fade Ã¢â‚¬â€ oldest nodes fade first.
                // Each node gets a unique decay speed based on its position in the
                // array (older = lower index = faster decay).
                const ageFactor = 1.0 - (i / Math.max(1, faceNodes.length - 1));
                n.life -= 0.6 + ageFactor * 1.4; // oldest: ~2.0/frame, newest: ~0.6/frame
            }
            // During building: nodes never age passively.
            // Overcrowding is handled by the soft-cap block below.

            // Alpha decay: only once the node is in its final 80-frame death ramp
            if (n.life <= 80) {
                n.alpha = Math.max(0, n.life / 80);
            }

            // Remove fully expired nodes
            if (n.life <= 0) {
                faceNodes.splice(i, 1);
            }
        }

        // Update active connections and draw progress
        for (let i = faceConnections.length - 1; i >= 0; i--) {
            const c = faceConnections[i];
            const nA = c.nodeA;
            const nB = c.nodeB;

            // Prune connection if either node is fully gone
            const lifeA = nA.life !== undefined ? nA.life : 9999;
            const lifeB = nB.life !== undefined ? nB.life : 9999;
            if (lifeA <= 0 || lifeB <= 0) {
                faceConnections.splice(i, 1);
                continue;
            }

            // Skip if either node is not placed yet
            if (!nA.placed || !nB.placed) {
                c.alpha = 0;
                c.drawProgress = 0;
                continue;
            }

            // Grow line length smoothly
            if (c.drawProgress < 1) {
                c.drawProgress = Math.min(1, c.drawProgress + 0.05);
            }

            // Connection alpha tracks the dimmer of its two nodes
            const alphaA = nA.alpha !== undefined ? nA.alpha : 1.0;
            const alphaB = nB.alpha !== undefined ? nB.alpha : 1.0;
            c.alpha = Math.min(alphaA, alphaB);
        }

        // Ã¢â€â‚¬Ã¢â€â‚¬ Soft capacity cap Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
        // When over MAX_ACTIVE_NODES, gently retire the very oldest nodes at a
        // slow rate so removal is never visible as a sudden pop.
        if (faceNodes.length > MAX_ACTIVE_NODES) {
            const excess = faceNodes.length - MAX_ACTIVE_NODES;
            for (let i = 0; i < excess; i++) {
                if (faceNodes[i]) {
                    // Force a slow-burn exit: push life into the fade ramp
                    faceNodes[i].life = Math.min(faceNodes[i].life, 70 + i * 4);
                }
            }
        }
    }

    function drawFace() {
        if (constructionPhase === 0) return;

        // Drive lifespan and calculations updates synchronously within requestAnimationFrame
        updateProceduralNetwork();

        ctx.save();

        // Parallax calculations
        const px = (mouseX / width - 0.5) * 22;
        const py = (mouseY / height - 0.5) * 12;
        ctx.globalAlpha *= faceAlpha;



        // Draw active connections
        for (const conn of faceConnections) {
            if (conn.alpha <= 0) continue;
            const nA = conn.nodeA, nB = conn.nodeB;
            
            const lifeA = nA.life !== undefined ? nA.life : 9999;
            const lifeB = nB.life !== undefined ? nB.life : 9999;
            if (lifeA <= 0 || lifeB <= 0) continue;

            // Dim connection lines if traveling
            let alphaMult = 1.0;

            const alphaA = nA.alpha !== undefined ? nA.alpha : 1.0;
            const alphaB = nB.alpha !== undefined ? nB.alpha : 1.0;
            const baseAlpha = conn.alpha * 0.28 * Math.min(alphaA, alphaB) * alphaMult;
            
            const phaseA = nA.pulsePhase !== undefined ? nA.pulsePhase : 0;
            const phaseB = nB.pulsePhase !== undefined ? nB.pulsePhase : 0;
            const pulseAdd = constructionPhase >= 3 ? 0.08 + Math.sin(phaseA + phaseB) * 0.04 : 0;

            const pA = getParallaxCoord(nA);
            const pB = getParallaxCoord(nB);

            const endX = pA.x + (pB.x - pA.x) * conn.drawProgress;
            const endY = pA.y + (pB.y - pA.y) * conn.drawProgress;

            // Brighten line if it is connected to a hovered navigation node or if camera is near during travel
            const isHoveredConn = !isTraveling && (nA.hovered || nB.hovered);
            const isPathConn = isTraveling && travelPath.includes(nA) && travelPath.includes(nB);
            let strokeColor = '30, 120, 255';
            let strokeOpacity = baseAlpha + pulseAdd;
            let strokeWidth = 0.8;

            if (isTraveling && !isPathConn) {
                // Fast lightweight path for surrounding connections (faded slightly)
                strokeOpacity = baseAlpha * 0.05;
                strokeWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(pA.x, pA.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = `rgba(${strokeColor}, ${strokeOpacity})`;
                ctx.lineWidth = strokeWidth;
                ctx.stroke();
                continue;
            }

            if (isHoveredConn) {
                strokeColor = '0, 240, 255'; // electric cyan
                strokeOpacity = 0.82;
                strokeWidth = 1.6;
            } else if (isPathConn && travelSamples && travelSamples.length > 0) {
                const curPt = getPointAtLengthProgress(travelSamples, travelProgress);
                const midX = (nA.x + nB.x) / 2;
                const midY = (nA.y + nB.y) / 2;
                const distToMid = Math.hypot(midX - curPt.x, midY - curPt.y);
                const maxLineGlowDist = 150;
                let lineGlowBoost = 0;
                if (distToMid < maxLineGlowDist) {
                    lineGlowBoost = (1.0 - distToMid / maxLineGlowDist) * 1.2;
                }
                strokeColor = '0, 240, 255'; // electric cyan
                strokeOpacity = 0.95 + lineGlowBoost * 0.05;
                strokeWidth = 2.0 + lineGlowBoost * 1.5;
            }

            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = `rgba(${strokeColor}, ${strokeOpacity})`;
            ctx.lineWidth = strokeWidth;
            ctx.stroke();
        }

        // Draw active data pulses
        for (const sig of pulseSignals) {
            const nA = sig.conn.nodeA, nB = sig.conn.nodeB;
            
            const lifeA = nA.life !== undefined ? nA.life : 9999;
            const lifeB = nB.life !== undefined ? nB.life : 9999;
            if (lifeA <= 0 || lifeB <= 0) continue;

            const pA = getParallaxCoord(nA);
            const pB = getParallaxCoord(nB);

            const t = sig.fwd ? sig.t : (1 - sig.t);
            const sx = pA.x + (pB.x - pA.x) * t;
            const sy = pA.y + (pB.y - pA.y) * t;

            ctx.beginPath();
            ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00f0ff';
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Render rotating tech rings at cluster centers
        for (const ring of clusterRings) {
            if (ring.currentR <= 0) continue;
            ctx.save();
            const p = getParallaxCoord({ x: ring.x, y: ring.y, parallaxFactor: 0.6 });
            ctx.translate(p.x, p.y);
            ctx.rotate(Date.now() * 0.0006 * ring.speed * 100);
            ctx.setLineDash([6, 8]);
            ctx.beginPath();
            const radius = ring.currentR * (isTraveling ? camera.zoom : 1.0);
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha * faceAlpha})`;
            ctx.lineWidth = 1 * (isTraveling ? camera.zoom : 1.0);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }

        // Render visual sparks
        for (let i = sparkParticles.length - 1; i >= 0; i--) {
            const sp = sparkParticles[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.life -= sp.decay;
            if (sp.life <= 0) {
                sparkParticles.splice(i, 1);
                continue;
            }
            ctx.beginPath();
            ctx.arc(sp.x + px * 0.5, sp.y + py * 0.5, sp.size * sp.life, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${sp.life * 0.85})`;
            ctx.fill();
        }

        // Render active nodes
        for (let i = 0; i < faceNodes.length; i++) {
            const n = faceNodes[i];
            if (!n.placed || n.alpha <= 0) continue;

            // Lightweight depth blur simulation for non-path nodes during travel
            const isPathNode = !isTraveling || travelPath.includes(n);
            if (isTraveling && !isPathNode) {
                const blurVal = Math.sin(travelProgress * Math.PI); // peak blur at midpoint
                const alphaMult = 0.03 * (1.0 - blurVal * 0.5);
                const sizeMult = 1.0 + blurVal * 1.8; // expand to simulate bokeh blur
                const pr = (n.glowR + Math.sin(n.pulsePhase) * 0.7) * n.scale * sizeMult;
                let coreRGB;
                if (n.isEye) coreRGB = '0, 240, 255';
                else if (n.isBrain) coreRGB = '140, 100, 255';
                else coreRGB = '40, 160, 255';
                
                const p = getParallaxCoord(n);
                ctx.beginPath();
                ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${coreRGB}, ${0.45 * n.alpha * alphaMult})`;
                ctx.fill();
                continue;
            }

            n.pulsePhase += 0.018;

            // Calculate distance to camera during travel to trigger brief pulses and fade back
            let travelReact = 0;
            let alphaMult = 1.0;
            if (isTraveling && travelSamples && travelSamples.length > 0) {
                const curPt = getPointAtLengthProgress(travelSamples, travelProgress);
                const distToCamera = Math.hypot(n.x - curPt.x, n.y - curPt.y);
                
                const maxReactDist = 80;
                if (distToCamera < maxReactDist) {
                    travelReact = (1.0 - distToCamera / maxReactDist) * 1.5;
                    alphaMult = 0.06 + (1.0 - distToCamera / maxReactDist) * 0.94;
                } else {
                    alphaMult = 0.06;
                }
            }

            // Check if this node is connected to a hovered navNode
            let isReacting = false;
            if (!isTraveling) {
                for (const conn of faceConnections) {
                    if ((conn.nodeA === n && conn.nodeB.hovered) || (conn.nodeB === n && conn.nodeA.hovered)) {
                        isReacting = true;
                        break;
                    }
                }
            }

            const reactBoost = isReacting ? 0.45 + Math.sin(Date.now() * 0.012) * 0.28 : 0;
            const pr = (n.glowR + Math.sin(n.pulsePhase) * 0.7) * n.scale;
            const glowBoost = (constructionPhase >= 3 ? 0.5 + Math.sin(n.pulsePhase * 2) * 0.3 : 0) + reactBoost + travelReact;

            let coreRGB, glowRGB;
            if (n.isEye) {
                coreRGB = '0, 240, 255'; glowRGB = '0, 240, 255';
            } else if (n.isBrain) {
                coreRGB = '140, 100, 255'; glowRGB = '100, 60, 255';
            } else {
                coreRGB = '40, 160, 255'; glowRGB = '20, 80, 255';
            }

            const p = getParallaxCoord(n);

            // Halo glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, pr + 4.5 + glowBoost * 6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${glowRGB}, ${(0.035 + glowBoost * 0.04) * n.alpha * alphaMult})`;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${coreRGB}, ${(0.78 + glowBoost * 0.22) * n.alpha * alphaMult})`;
            ctx.shadowBlur = (isTraveling && !isPathNode) ? 0 : 6 + glowBoost * 8;
            ctx.shadowColor = `rgba(${coreRGB}, 0.75)`;
            ctx.fill();
            ctx.shadowBlur = 0;

            if (isTraveling && !isPathNode) {
                ctx.filter = 'none';
            }
        }

        ctx.restore();
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Particle system Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const particles = [];
    const particlePool = [];
    
    function getParticle(props) {
        let p;
        if (particlePool.length > 0) {
            p = particlePool.pop();
        } else {
            p = {};
        }
        p.isSplineParticle = props.isSplineParticle || false;
        p.t = props.t !== undefined ? props.t : 0;
        p.speed = props.speed !== undefined ? props.speed : 0;
        p.x = props.x !== undefined ? props.x : 0;
        p.y = props.y !== undefined ? props.y : 0;
        p.vx = props.vx !== undefined ? props.vx : 0;
        p.vy = props.vy !== undefined ? props.vy : 0;
        p.life = props.life !== undefined ? props.life : 1;
        p.decay = props.decay !== undefined ? props.decay : 0.018;
        p.size = props.size !== undefined ? props.size : 1;
        p.color = props.color || '0, 240, 255';
        return p;
    }

    function recycleParticle(p) {
        particlePool.push(p);
    }

    function spawnParticle(x, y, color = '0, 240, 255', burst = false) {
        const count = burst ? 6 : 1;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = burst ? (1.5 + Math.random() * 2.5) : (0.4 + Math.random() * 0.8);
            particles.push(getParticle({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.018 + Math.random() * 0.025,
                size: burst ? (1 + Math.random() * 2) : (0.6 + Math.random() * 1.2),
                color
            }));
        }
    }

    function updateParticles() {
        // Enforce a strict cap of 120 particles, recycling excess to the pool
        if (particles.length > 120) {
            const excess = particles.length - 120;
            for (let i = 0; i < excess; i++) {
                const p = particles.shift();
                if (p) recycleParticle(p);
            }
        }

        const hoveredNav = navNodes.find(n => n.hovered);
        const px = (mouseX / width - 0.5) * 22;
        const py = (mouseY / height - 0.5) * 12;

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // If spline particle, animate along the Catmull-Rom travelSamples spline path
            if (p.isSplineParticle) {
                p.t += p.speed;
                if (p.t >= 1.0) {
                    const removed = particles.splice(i, 1)[0];
                    if (removed) recycleParticle(removed);
                    continue;
                }
                const pos = getPointAtLengthProgress(travelSamples, p.t);
                p.x = pos.x;
                p.y = pos.y;
                p.life = Math.sin(p.t * Math.PI); // fade in/out
                continue;
            }

            // Apply magnetic attraction towards hovered navigation node
            if (hoveredNav) {
                const targetX = hoveredNav.x + px * 0.8 + hoveredNav.magneticX;
                const targetY = hoveredNav.y + py * 0.8 + hoveredNav.magneticY;
                
                const dx = targetX - p.x;
                const dy = targetY - p.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist < 180 && dist > 4) {
                    const pull = (1.0 - dist / 180) * 0.45;
                    p.vx += (dx / dist) * pull;
                    p.vy += (dy / dist) * pull;
                }
            }

            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.95; p.vy *= 0.95;
            p.life -= p.decay;
            if (p.life <= 0) {
                const removed = particles.splice(i, 1)[0];
                if (removed) recycleParticle(removed);
            }
        }

        // Spawn particles drawing into the hovered navNode
        if (hoveredNav && Math.random() < 0.28) {
            const targetX = hoveredNav.x + px * 0.8 + hoveredNav.magneticX;
            const targetY = hoveredNav.y + py * 0.8 + hoveredNav.magneticY;
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 60;
            const sx = targetX + Math.cos(angle) * dist;
            const sy = targetY + Math.sin(angle) * dist;
            
            particles.push(getParticle({
                x: sx,
                y: sy,
                vx: -Math.cos(angle) * (1.2 + Math.random() * 1.6),
                vy: -Math.sin(angle) * (1.2 + Math.random() * 1.6),
                life: 1.0,
                decay: 0.015 + Math.random() * 0.015,
                size: 0.8 + Math.random() * 1.3,
                color: '0, 240, 255'
            }));
        }

        // Spawn particles flowing down the spline path during travel (reduced for performance stability)
        if (isTraveling && Math.random() < 0.10 && travelSamples && travelSamples.length > 0) {
            const startT = travelProgress + Math.random() * (1.0 - travelProgress) * 0.5;
            if (startT < 1.0) {
                particles.push(getParticle({
                    isSplineParticle: true,
                    t: startT,
                    speed: 0.008 + Math.random() * 0.012,
                    size: 1.0 + Math.random() * 1.5,
                    color: '0, 240, 255'
                }));
            }
        }
    }

    function drawParticles() {
        for (const p of particles) {
            let x = p.x;
            let y = p.y;
            let size = p.size * p.life;
            
            if (isTraveling) {
                x = (x - camera.x) * camera.zoom + width / 2;
                y = (y - camera.y) * camera.zoom + height / 2;
                size *= camera.zoom;
                
                if (camera.rotation !== 0) {
                    const dx = x - width / 2;
                    const dy = y - height / 2;
                    const cos = Math.cos(camera.rotation);
                    const sin = Math.sin(camera.rotation);
                    x = width / 2 + dx * cos - dy * sin;
                    y = height / 2 + dx * sin + dy * cos;
                }
            }
            
            ctx.beginPath();
            ctx.arc(x, Math.max(0.1, size) > 50 ? y : y, Math.max(0.1, size), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.75})`;
            ctx.fill();
        }
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Robot Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const robot = {
        x: 0, y: 0,
        vx: 0, vy: 0,             // Velocity vectors for steering physics
        targetX: 0, targetY: 0,
        wanderTargetX: 0,
        wanderTargetY: 0,
        pulse: 0, facing: 1,
        phase: 'BOOT',  // BOOT Ã¢â€ â€™ IDLE Ã¢â€ â€™ FLY_TO_START Ã¢â€ â€™ PLACING Ã¢â€ â€™ CONNECTING Ã¢â€ â€™ GLOW Ã¢â€ â€™ HOLD Ã¢â€ â€™ DEPLOY_FLY Ã¢â€ â€™ CYCLE_WAIT Ã¢â€ â€™ IDLE
        timer: 0,
        nodeIndex: 0,
        placeTimer: 0,
        connectProgress: 0,
        glowIntensity: 0,
        holdTimer: 0,
        fadeAlpha: 1,
        cycleTimer: 0,
    };

    function getTrainBtn() { return decisionButtons.find(b => b.type === 'TRAIN'); }
    function getDeployBtn() { return decisionButtons.find(b => b.type === 'DEPLOY'); }

    function initRobotPosition() {
        const tb = getTrainBtn();
        if (tb) {
            robot.x = tb.x + tb.width / 2;
            robot.y = tb.y - 35;
            robot.targetX = robot.x;
            robot.targetY = robot.y;
            robot.vx = 0;
            robot.vy = 0;
        }
    }

    function updateRobot() {
        robot.pulse += 0.05;

        // Boot phase locking
        if (bootPhase !== 'READY') {
            if (bootPhase === 'INIT' || bootPhase === 'POWER_ON' || bootPhase === 'TYPING' || bootPhase === 'LAUNCH') {
                robot.x = width / 2;
                robot.y = height / 2;
                if (bootPhase === 'TYPING') {
                    robot.x += (Math.random() - 0.5) * 1.5;
                    robot.y += (Math.random() - 0.5) * 0.5;
                }
            } else if (bootPhase === 'TRANSITION') {
                const tb = getTrainBtn();
                const tx = tb ? tb.x + tb.width / 2 : 137;
                const ty = tb ? tb.y - 35 : height * 0.60 - 35;
                robot.x += (tx - robot.x) * 0.04;
                robot.y += (ty - robot.y) * 0.04;
                robot.facing = 1;
            }
            return;
        }

        // --- Main state machine ---
        if (robot.phase === 'BOOT') {
            robot.phase = 'IDLE';
            robot.timer = 90;
            initRobotPosition();
        }

        if (robot.phase === 'IDLE') {
            // Hover near TRAIN button
            const tb = getTrainBtn();
            if (tb) {
                robot.targetX = tb.x + tb.width / 2;
                robot.targetY = tb.y - 35;
            }
            robot.x += (robot.targetX - robot.x) * 0.025;
            robot.y += (robot.targetY - robot.y) * 0.025;
            robot.y += Math.sin(robot.pulse * 1.4) * 0.9;
            robot.x += Math.cos(robot.pulse * 0.8) * 0.4;
            robot.facing = 1;

            if (tb) tb.active = Math.min(1, tb.active + 0.015);

            robot.timer--;
            if (robot.timer <= 0) {
                if (tb) tb.active = 1.0;
                robot.phase = 'FLY_TO_START';
                robot.nodeIndex = 0;
                robot.placeTimer = 0;
                constructionPhase = 1;
                faceAlpha = 1;
                initFaceNodes(); 
                hudAlpha = 0;
            }

        } else if (robot.phase === 'FLY_TO_START') {
            // Pick starting center point
            robot.targetX = width * 0.62;
            robot.targetY = height * 0.40;
            robot.x += (robot.targetX - robot.x) * 0.08;
            robot.y += (robot.targetY - robot.y) * 0.08;
            spawnParticle(robot.x, robot.y, '0, 240, 255');
            robot.facing = 1;

            const dist = Math.hypot(robot.x - robot.targetX, robot.y - robot.targetY);
            if (dist < 25) {
                robot.phase = 'PLACING';
                robot.placeTimer = 0;
                robot.nodeIndex = 0;
                // Generate initial wander target
                robot.wanderTargetX = width * (0.52 + Math.random() * 0.36);
                robot.wanderTargetY = height * (0.16 + Math.random() * 0.68);
            }

        } else if (robot.phase === 'PLACING') {
            robot.placeTimer++;

            // Momentum-based organic wander steering physics
            const nextNode = faceNodes[robot.nodeIndex];
            if (nextNode) {
                robot.wanderTargetX = nextNode.x;
                robot.wanderTargetY = nextNode.y;
            }

            const dx = robot.wanderTargetX - robot.x;
            const dy = robot.wanderTargetY - robot.y;
            const distToTarget = Math.hypot(dx, dy);

            // Apply smooth acceleration force
            const steerX = (dx / (distToTarget || 1)) * 0.28;
            const steerY = (dy / (distToTarget || 1)) * 0.28;

            robot.vx += steerX;
            robot.vy += steerY;

            // Drag force limit speed to make robot glide gracefully
            robot.vx *= 0.94;
            robot.vy *= 0.94;

            robot.x += robot.vx;
            robot.y += robot.vy;

            // Particle trail exhaust
            if (Math.random() < 0.65) {
                spawnParticle(robot.x + (Math.random() - 0.5) * 8, robot.y + (Math.random() - 0.5) * 8, '0, 200, 255');
            }

            // Deploy nodes at a consistent rate into organic webs
            const spawnRate = 8;
            if (robot.placeTimer % spawnRate === 0 && robot.nodeIndex < faceNodes.length) {
                const node = faceNodes[robot.nodeIndex];
                if (node) {
                    node.placed = true;
                    // Spawn connection sparks at node position
                    for (let i = 0; i < 4; i++) {
                        sparkParticles.push({
                            x: node.x, y: node.y,
                            vx: (Math.random() - 0.5) * 3,
                            vy: (Math.random() - 0.5) * 3,
                            size: 1 + Math.random() * 2.2,
                            life: 1,
                            decay: 0.035 + Math.random() * 0.045
                        });
                    }
                }
                robot.nodeIndex++;
            }

            robot.facing = robot.vx > 0.1 ? 1 : (robot.vx < -0.1 ? -1 : robot.facing);

            // Holographic targeting laser connects last placed node
            let lastPlaced = null;
            for (let i = robot.nodeIndex - 1; i >= 0; i--) {
                if (faceNodes[i] && faceNodes[i].placed) {
                    lastPlaced = faceNodes[i];
                    break;
                }
            }
            if (lastPlaced) {
                ctx.beginPath();
                ctx.moveTo(robot.x, robot.y);
                ctx.lineTo(lastPlaced.x, lastPlaced.y);
                ctx.strokeStyle = `rgba(0, 240, 255, ${0.30 + Math.sin(robot.pulse * 8) * 0.20})`;
                ctx.lineWidth = 1.2;
                ctx.setLineDash([4, 6]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Complete training phase after generating enough organic web structure (500 frames)
            if (robot.placeTimer >= 520) {
                robot.phase = 'CONNECTING';
                robot.connectProgress = 0;
                robot.targetX = width * 0.52;
                robot.targetY = height * 0.45;
                constructionPhase = 2;
            }

        } else if (robot.phase === 'CONNECTING') {
            // Drift robot towards observe location
            robot.x += (robot.targetX - robot.x) * 0.03;
            robot.y += (robot.targetY - robot.y) * 0.03;
            robot.y += Math.sin(robot.pulse * 2) * 1.0;
            robot.facing = 1;

            // Open up connection progress
            robot.connectProgress += 0.015;
            const numShow = Math.floor(robot.connectProgress * faceConnections.length);
            for (let i = 0; i < Math.min(numShow, faceConnections.length); i++) {
                const c = faceConnections[i];
                c.alpha = Math.min(1, c.alpha + 0.06);
                c.drawProgress = Math.min(1, c.drawProgress + 0.06);
            }

            // Grow dynamic tech rings
            clusterRings.forEach(r => {
                r.currentR += (r.maxR - r.currentR) * 0.05;
            });

            if (robot.connectProgress >= 1.05) {
                robot.phase = 'GLOW';
                robot.glowIntensity = 0;
                constructionPhase = 3;
            }

        } else if (robot.phase === 'GLOW') {
            robot.glowIntensity += 0.015;
            hudAlpha = Math.min(1, robot.glowIntensity * 1.2);
            hudAngle += 0.01;

            robot.y += Math.sin(robot.pulse * 3) * 1.5;
            robot.x += Math.cos(robot.pulse * 1.5) * 0.6;

            faceNodes.forEach(n => { n.pulsePhase += 0.05; });
            clusterRings.forEach(r => {
                r.currentR += (r.maxR - r.currentR) * 0.05;
            });

            if (robot.glowIntensity >= 1.0) {
                robot.phase = 'HOLD';
                robot.holdTimer = 300;  // Extended Ã¢â‚¬â€ let the full network be admired
                constructionPhase = 4;
            }

        } else if (robot.phase === 'HOLD') {
            robot.holdTimer--;
            hudAngle += 0.008;
            faceNodes.forEach(n => { n.pulsePhase += 0.025; });

            const tb = getTrainBtn();
            if (tb) {
                robot.targetX = tb.x + tb.width / 2;
                robot.targetY = tb.y - 35;
            }
            robot.x += (robot.targetX - robot.x) * 0.02;
            robot.y += (robot.targetY - robot.y) * 0.02;
            robot.y += Math.sin(robot.pulse * 1.5) * 0.8;
            robot.facing = -1; // face left toward controls

            if (robot.holdTimer <= 0) {
                robot.phase = 'DEPLOY_FLY';
                const db = getDeployBtn();
                if (db) db.active = 0;
            }

        } else if (robot.phase === 'DEPLOY_FLY') {
            // faceAlpha stays at 1.0 Ã¢â‚¬â€ network remains fully visible while robot flies.
            // The dissolve begins only after the robot lands and clicks Deploy.
            hudAlpha = Math.max(0, hudAlpha - 0.005);
            hudAngle += 0.005;
            faceNodes.forEach(n => { n.pulsePhase += 0.02; });

            const db = getDeployBtn();
            if (db) {
                robot.targetX = db.x + db.width / 2;
                robot.targetY = db.y - 35;
            }
            robot.x += (robot.targetX - robot.x) * 0.055;
            robot.y += (robot.targetY - robot.y) * 0.055;
            robot.facing = -1;
            spawnParticle(robot.x, robot.y, '0, 240, 255');

            const dist = Math.hypot(robot.x - robot.targetX, robot.y - robot.targetY);
            if (dist < 15 && db) {
                db.active = 1.0;
                // Deploy burst Ã¢â‚¬â€ scatter particles from every node for an elegant dispersion
                faceNodes.forEach(n => {
                    if (Math.random() < 0.6) {
                        spawnParticle(n.x, n.y, n.isEye ? '0, 240, 255' : (n.isBrain ? '140, 80, 255' : '40, 160, 255'), true);
                    }
                });
                spawnParticle(db.x + db.width / 2, db.y + db.height / 2, '0, 240, 255', true);
                robot.phase = 'CYCLE_WAIT';
                robot.cycleTimer = 360;  // Extended dissolve time
                constructionPhase = 5;   // Triggers per-node staggered fade in updateProceduralNetwork
            }

        } else if (robot.phase === 'CYCLE_WAIT') {
            robot.cycleTimer--;
            // Gentle faceAlpha fade Ã¢â‚¬â€ network dissolves softly over 360 frames
            faceAlpha = Math.max(0, faceAlpha - (1.0 / 360));
            hudAlpha  = Math.max(0, hudAlpha  - 0.005);
            hudAngle += 0.003;

            const db = getDeployBtn();
            if (db && db.active > 0) db.active -= 0.008;

            robot.y += Math.sin(robot.pulse * 1.5) * 0.6;

            if (robot.cycleTimer <= 0) {
                robot.phase = 'IDLE';
                robot.timer = 100;
                constructionPhase = 0;
                faceAlpha = 1;
                hudAlpha = 0;
                preGenerateNeuralNetwork(); // Regenerate dynamic layout for the next cycle
                initFaceNodes();
                const tb = getTrainBtn();
                if (tb) tb.active = 0;
            }
        }
    }

    function drawRobot() {
        ctx.save();
        
        let rx = robot.x;
        let ry = robot.y;
        let rScale = 1.5;
        
        // Project robot coordinates using camera zoom and translation
        rx = (rx - camera.x) * camera.zoom + width / 2;
        ry = (ry - camera.y) * camera.zoom + height / 2;
        rScale *= camera.zoom;
        
        ctx.translate(rx, ry);
        const floatY = Math.sin(robot.pulse) * 3 * camera.zoom;
        ctx.translate(0, floatY);
        ctx.scale(robot.facing * rScale, rScale);

        const cW = '#f0f4ff', cG = '#6a7e95', cD = '#080c14', cC = '#00f0ff';

        // Ambient glow
        ctx.beginPath();
        ctx.arc(0, -5, 28, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${0.05 + Math.sin(robot.pulse * 2) * 0.025})`;
        ctx.fill();

        // Legs
        ctx.fillStyle = cG;
        ctx.beginPath(); ctx.roundRect(-6, 12, 5, 10, 2); ctx.fill();
        ctx.beginPath(); ctx.roundRect(1, 12, 5, 10, 2); ctx.fill();
        ctx.fillStyle = cW;
        ctx.beginPath(); ctx.roundRect(-8, 20, 8, 5, 2); ctx.fill();
        ctx.beginPath(); ctx.roundRect(0, 20, 8, 5, 2); ctx.fill();

        // Body
        ctx.fillStyle = cW;
        ctx.beginPath(); ctx.roundRect(-11, -5, 22, 19, 6); ctx.fill();
        ctx.fillStyle = cD;
        ctx.beginPath(); ctx.roundRect(-7, -2, 14, 10, 3); ctx.fill();
        ctx.fillStyle = cC;
        ctx.shadowBlur = 8 + Math.sin(robot.pulse * 3) * 3; ctx.shadowColor = cC;
        ctx.beginPath(); ctx.arc(0, 3, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Neck
        ctx.fillStyle = cG;
        ctx.fillRect(-3, -10, 6, 6);

        // Head
        ctx.fillStyle = cW;
        ctx.beginPath(); ctx.roundRect(-17, -28, 34, 24, 11); ctx.fill();
        ctx.fillStyle = cD;
        ctx.beginPath(); ctx.roundRect(-14, -26, 28, 17, 7); ctx.fill();

        // Eyes
        let eyeScaleY = 1;
        if (bootPhase === 'INIT') eyeScaleY = 0;
        else if (bootPhase === 'POWER_ON') eyeScaleY = Math.min(1, 1 - bootTimer / 40);
        else if (robot.phase === 'PLACING') eyeScaleY = 0.5 + Math.sin(robot.pulse * 7) * 0.3;
        else if (Math.random() > 0.985) eyeScaleY = 0.08;

        if (eyeScaleY > 0) {
            ctx.fillStyle = cC;
            ctx.shadowBlur = 12 + Math.sin(robot.pulse * 8) * 4; ctx.shadowColor = cC;
            ctx.save();
            ctx.scale(1, eyeScaleY);
            ctx.beginPath(); ctx.arc(-5, -18, 2.8, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(5, -18, 2.8, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
            ctx.shadowBlur = 0;
        }

        // Antennae
        ctx.fillStyle = cG;
        ctx.fillRect(-13, -32, 1.5, 5); ctx.fillRect(11, -32, 1.5, 5);
        ctx.fillStyle = cC;
        ctx.shadowBlur = 5; ctx.shadowColor = cC;
        ctx.beginPath(); ctx.arc(-12.25, -32, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(11.75, -32, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;

        // Back arm
        ctx.fillStyle = cG;
        ctx.beginPath(); ctx.roundRect(-15, -2, 5, 13, 2.5); ctx.fill();

        // Laptop body
        ctx.fillStyle = '#151c2a';
        ctx.beginPath();
        ctx.moveTo(-3, 5); ctx.lineTo(18, 9); ctx.lineTo(16, 11); ctx.lineTo(-5, 7); ctx.fill();

        // Laptop screen
        ctx.fillStyle = '#040810';
        ctx.beginPath();
        ctx.moveTo(18, 9); ctx.lineTo(18, -5); ctx.lineTo(2, -7); ctx.lineTo(-3, 5); ctx.fill();

        // Laptop screen activity
        if (robot.phase === 'PLACING' || robot.phase === 'CONNECTING' || robot.phase === 'GLOW') {
            const col = robot.phase === 'PLACING' ? '#7c4dff' : '#00f0ff';
            ctx.fillStyle = col; ctx.shadowBlur = 6; ctx.shadowColor = col;
            const t = robot.pulse;
            ctx.fillRect(5, -2, 1.5, 2.5 + Math.sin(t * 4) * 2);
            ctx.fillRect(8.5, -0.5, 1.5, 1.5 + Math.sin(t * 5 + 1) * 1.5);
            ctx.fillRect(12, -3, 1.5, 4 + Math.sin(t * 3 + 2) * 2);
            ctx.shadowBlur = 0;
        }

        // Front arm
        ctx.fillStyle = cW;
        ctx.beginPath(); ctx.roundRect(-3, 1, 13, 4, 2); ctx.fill();
        ctx.fillStyle = cC;
        ctx.beginPath(); ctx.arc(-3, 3, 2.2, 0, Math.PI * 2); ctx.fill();

        // Holographic scan fan (during PLACING)
        if (robot.phase === 'PLACING') {
            ctx.beginPath();
            ctx.moveTo(6, -18);
            ctx.lineTo(90, -40); ctx.lineTo(90, 10);
            ctx.fillStyle = `rgba(0, 220, 255, ${0.03 + Math.sin(robot.pulse * 5) * 0.015})`;
            ctx.fill();
        }

        ctx.restore();
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Control Panel Buttons Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    function drawButtons() {
        if (decisionButtons.length === 0) return;
        
        // Project panel boundaries using camera
        const first = decisionButtons[0];
        const last  = decisionButtons[decisionButtons.length - 1];
        
        // Project coordinates
        const pFirstX = (first.x - camera.x) * camera.zoom + width / 2;
        const pFirstY = (first.y - camera.y) * camera.zoom + height / 2;
        const pLastX = (last.x - camera.x) * camera.zoom + width / 2;
        const pLastY = (last.y - camera.y) * camera.zoom + height / 2;
        
        const btnScale = camera.zoom;
        
        const panelX = pFirstX - 12 * btnScale;
        const panelY = pFirstY - 22 * btnScale;
        const panelW = (pLastX + last.width * btnScale) - pFirstX + 24 * btnScale;
        const panelH = 64 * btnScale;

        // Glass panel background
        ctx.fillStyle = 'rgba(8, 14, 28, 0.52)';
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1 * btnScale;
        ctx.beginPath(); ctx.roundRect(panelX, panelY, panelW, panelH, 8 * btnScale); ctx.fill(); ctx.stroke();

        // Panel label
        ctx.font = `${8 * btnScale}px monospace`;
        ctx.fillStyle = 'rgba(143, 157, 181, 0.28)';
        ctx.textAlign = 'left';
        ctx.fillText('ML_OPS.CONSOLE', panelX + 12 * btnScale, panelY + 11 * btnScale);

        decisionButtons.forEach(btn => {
            if (btn.active > 0) btn.active -= 0.008;
            const rgb = btn.type === 'TRAIN' ? '124, 77, 255' : '0, 240, 255';
            ctx.fillStyle = `rgba(${rgb}, ${0.06 + btn.active * 0.18})`;
            ctx.strokeStyle = btn.color;
            ctx.lineWidth = (1 + btn.active * 1.5) * btnScale;
            
            const bx = (btn.x - camera.x) * camera.zoom + width / 2;
            const by = (btn.y - camera.y) * camera.zoom + height / 2;
            const bw = btn.width * btnScale;
            const bh = btn.height * btnScale;
            
            if (btn.active > 0) { ctx.shadowBlur = 12 * btn.active * btnScale; ctx.shadowColor = btn.color; }
            ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 5 * btnScale); ctx.fill(); ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.font = `bold ${10 * btnScale}px monospace`;
            ctx.fillStyle = btn.active > 0.2 ? '#fff' : btn.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(btn.type === 'TRAIN' ? '>> TRAIN MODEL' : '> DEPLOY MODEL', bx + bw / 2, by + bh / 2);
            if (btn.active > 0) {
                ctx.fillStyle = btn.color;
                ctx.fillRect(bx + 6 * btnScale, by + bh - 5 * btnScale, (bw - 12 * btnScale) * (0.4 + Math.random() * 0.6), 2 * btnScale);
            }
        });
        ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Boot Sequence Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    function updateBootSequence() {
        if (bootPhase === 'READY') return;
        bootTimer--;
        if (bootPhase === 'INIT') {
            if (bootTimer <= 0) { bootPhase = 'POWER_ON'; bootTimer = 40; }
        } else if (bootPhase === 'POWER_ON') {
            if (bootTimer <= 0) { bootPhase = 'TYPING'; bootTimer = 40; }
        } else if (bootPhase === 'TYPING') {
            if (bootTimer <= 0) {
                if (bootMsgIndex < bootMessages.length - 1) { bootMsgIndex++; bootTimer = 45; }
                else { bootPhase = 'LAUNCH'; bootTimer = 40; }
            }
        } else if (bootPhase === 'LAUNCH') {
            if (bootTimer <= 0) {
                systemAlpha += 0.025;
                if (systemAlpha >= 1) {
                    systemAlpha = 1; bootPhase = 'TRANSITION'; bootTimer = 60;
                    uiElements.forEach(el => el.style.opacity = 1);
                }
            }
        } else if (bootPhase === 'TRANSITION') {
            if (bootTimer <= 0) { bootPhase = 'READY'; setTimeout(typeWriter, 500); }
        }
    }

    function drawBootText() {
        if (bootPhase === 'READY' || bootPhase === 'INIT' || bootPhase === 'POWER_ON') return;
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        const yPos = height / 2 + 80;
        for (let j = 0; j <= bootMsgIndex; j++) {
            let msg = bootMessages[j];
            const isVerified = j < bootMsgIndex || (bootPhase === 'LAUNCH' && bootTimer <= 0) || bootPhase === 'TRANSITION';
            let prefix = '', alpha = 0.8;
            if (isVerified) { prefix = '[ OK ] '; alpha = 1.0; }
            else if (j === bootMsgIndex && (bootPhase === 'TYPING' || bootPhase === 'LAUNCH')) {
                prefix = '> '; alpha = 1.0;
                if (bootPhase === 'TYPING') {
                    const chars = Math.floor((1 - bootTimer / 40) * msg.length);
                    msg = msg.substring(0, chars);
                }
                if (Math.floor(Date.now() / 200) % 2 === 0) msg += '_';
            }
            ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.fillText(prefix + msg, width / 2, yPos + j * 28);
        }
        ctx.textAlign = 'left';
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Stage label overlay Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const stageLabels = ['', '01  START', '02  LAYING DOTS', '03  CONNECTING', '04  DEPLOYING INTELLIGENCE', '04  DEPLOYING INTELLIGENCE', ''];
    let labelAlpha = 0;

    function drawStageLabel() {
        if (constructionPhase === 0 || constructionPhase > 5) return;
        labelAlpha = Math.min(1, labelAlpha + 0.02);
        const label = stageLabels[constructionPhase] || '';
        if (!label) return;
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = `rgba(0, 240, 255, ${0.4 * labelAlpha})`;
        ctx.textAlign = 'left';
        const tb = getTrainBtn();
        const ly = tb ? tb.y + tb.height + 22 : height * 0.67;
        ctx.fillText(label, 74, ly);
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Immersive Neural Navigation Helpers Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    function getGraphAdjacency() {
        const adj = new Map();
        function addEdge(u, v, dist) {
            if (!adj.has(u)) adj.set(u, []);
            if (!adj.has(v)) adj.set(v, []);
            adj.get(u).push({ node: v, dist });
            adj.get(v).push({ node: u, dist });
        }
        
        // 1. Navigation chain edges (Home <-> About <-> Skills <-> Experience <-> Contact)
        for (let i = 0; i < navNodes.length - 1; i++) {
            const u = navNodes[i];
            const v = navNodes[i + 1];
            const dist = Math.hypot(u.x - v.x, u.y - v.y);
            addEdge(u, v, dist);
        }
        
        // 2. Procedural faceConnections edges (only if both nodes exist and are active)
        faceConnections.forEach(c => {
            if (c.nodeA && c.nodeB) {
                const lifeA = c.nodeA.life !== undefined ? c.nodeA.life : 9999;
                const lifeB = c.nodeB.life !== undefined ? c.nodeB.life : 9999;
                if (lifeA > 0 && lifeB > 0 && c.nodeA.alpha > 0 && c.nodeB.alpha > 0) {
                    const dist = c.dist || Math.hypot(c.nodeA.x - c.nodeB.x, c.nodeA.y - c.nodeB.y);
                    addEdge(c.nodeA, c.nodeB, dist);
                }
            }
        });
        
        return adj;
    }

    function findShortestPath(startNode, endNode) {
        const adj = getGraphAdjacency();
        const distances = new Map();
        const previous = new Map();
        const pq = [];
        const visited = new Set();
        
        adj.forEach((edges, node) => {
            distances.set(node, node === startNode ? 0 : Infinity);
            pq.push({ node, dist: node === startNode ? 0 : Infinity });
        });
        
        if (!adj.has(startNode) || !adj.has(endNode)) {
            return fallbackChainPath(startNode, endNode);
        }
        
        while (pq.length > 0) {
            pq.sort((a, b) => a.dist - b.dist);
            const { node: curr, dist: d } = pq.shift();
            
            if (d === Infinity) break;
            if (curr === endNode) break;
            if (visited.has(curr)) continue;
            visited.add(curr);
            
            const edges = adj.get(curr) || [];
            for (const edge of edges) {
                if (visited.has(edge.node)) continue;
                const alt = d + edge.dist;
                if (alt < (distances.get(edge.node) || Infinity)) {
                    distances.set(edge.node, alt);
                    previous.set(edge.node, curr);
                    
                    const pqItem = pq.find(item => item.node === edge.node);
                    if (pqItem) {
                        pqItem.dist = alt;
                    } else {
                        pq.push({ node: edge.node, dist: alt });
                    }
                }
            }
        }
        
        const path = [];
        let curr = endNode;
        const pathVisited = new Set();
        while (curr) {
            if (pathVisited.has(curr) || path.length >= 50) {
                break; // Prevent infinite routing loop or excessive depth
            }
            pathVisited.add(curr);
            path.push(curr);
            curr = previous.get(curr);
        }
        path.reverse();
        
        if (path.length > 0 && path[0] === startNode) {
            return path;
        }
        
        return fallbackChainPath(startNode, endNode);
    }

    function fallbackChainPath(startNode, endNode) {
        const startIndex = navNodes.indexOf(startNode);
        const endIndex = navNodes.indexOf(endNode);
        const chainPath = [];
        if (startIndex === -1 || endIndex === -1) return [startNode, endNode];
        
        if (startIndex <= endIndex) {
            for (let i = startIndex; i <= endIndex; i++) {
                chainPath.push(navNodes[i]);
            }
        } else {
            for (let i = startIndex; i >= endIndex; i--) {
                chainPath.push(navNodes[i]);
            }
        }
        return chainPath;
    }

    function easePower2InOut(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function validateCameraCoordinates() {
        if (
            isNaN(camera.x) || camera.x === null || camera.x === undefined ||
            isNaN(camera.y) || camera.y === null || camera.y === undefined ||
            isNaN(camera.zoom) || camera.zoom === null || camera.zoom === undefined ||
            isNaN(camera.rotation) || camera.rotation === null || camera.rotation === undefined
        ) {
            console.warn("Camera invalid state detected, resetting coordinates.");
            camera.x = defaultCamera.x;
            camera.y = defaultCamera.y;
            camera.zoom = defaultCamera.zoom;
            camera.rotation = defaultCamera.rotation;
            return false;
        }
        return true;
    }

    function getCatmullRomPoint(p0, p1, p2, p3, t) {
        const t2 = t * t;
        const t3 = t2 * t;
        
        const x = 0.5 * (
            (2 * p1.x) +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
        );
        
        const y = 0.5 * (
            (2 * p1.y) +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
        );
        
        return { x, y };
    }

    function sampleSplineByDistance(path) {
        const M = path.length;
        if (M < 2) return [];
        
        const pts = [];
        // P_0 control point
        pts.push({
            x: 2 * path[0].x - path[1].x,
            y: 2 * path[0].y - path[1].y,
            parallaxFactor: 2 * (path[0].parallaxFactor !== undefined ? path[0].parallaxFactor : 0.8) - (path[1].parallaxFactor !== undefined ? path[1].parallaxFactor : 0.8),
            magneticX: 2 * (path[0].magneticX || 0) - (path[1].magneticX || 0),
            magneticY: 2 * (path[0].magneticY || 0) - (path[1].magneticY || 0)
        });
        // P_1 ... P_M
        for (let i = 0; i < M; i++) {
            pts.push({
                x: path[i].x,
                y: path[i].y,
                parallaxFactor: path[i].parallaxFactor !== undefined ? path[i].parallaxFactor : 0.8,
                magneticX: path[i].magneticX || 0,
                magneticY: path[i].magneticY || 0
            });
        }
        // P_{M+1} control point
        pts.push({
            x: 2 * path[M-1].x - path[M-2].x,
            y: 2 * path[M-1].y - path[M-2].y,
            parallaxFactor: 2 * (path[M-1].parallaxFactor !== undefined ? path[M-1].parallaxFactor : 0.8) - (path[M-2].parallaxFactor !== undefined ? path[M-2].parallaxFactor : 0.8),
            magneticX: 2 * (path[M-1].magneticX || 0) - (path[M-2].magneticX || 0),
            magneticY: 2 * (path[M-1].magneticY || 0) - (path[M-2].magneticY || 0)
        });
        
        const samples = [];
        let accumDist = 0;
        samples.push({
            dist: 0,
            x: path[0].x,
            y: path[0].y,
            parallaxFactor: path[0].parallaxFactor !== undefined ? path[0].parallaxFactor : 0.8,
            magneticX: path[0].magneticX || 0,
            magneticY: path[0].magneticY || 0
        });
        
        let prevX = path[0].x;
        let prevY = path[0].y;
        
        const S = 30;
        for (let i = 0; i < M - 1; i++) {
            const p0 = pts[i];
            const p1 = pts[i + 1];
            const p2 = pts[i + 2];
            const p3 = pts[i + 3];
            
            for (let j = 1; j <= S; j++) {
                const t = j / S;
                const pt = getCatmullRomPoint(p0, p1, p2, p3, t);
                
                const parallaxFactor = p1.parallaxFactor + (p2.parallaxFactor - p1.parallaxFactor) * t;
                const magneticX = p1.magneticX + (p2.magneticX - p1.magneticX) * t;
                const magneticY = p1.magneticY + (p2.magneticY - p1.magneticY) * t;
                
                const d = Math.hypot(pt.x - prevX, pt.y - prevY);
                accumDist += d;
                
                samples.push({
                    dist: accumDist,
                    x: pt.x,
                    y: pt.y,
                    parallaxFactor,
                    magneticX,
                    magneticY
                });
                
                prevX = pt.x;
                prevY = pt.y;
            }
        }
        return samples;
    }

    function getPointAtLengthProgress(samples, progress) {
        if (!samples || samples.length === 0) return { x: 0, y: 0, parallaxFactor: 0.8, magneticX: 0, magneticY: 0 };
        const targetDist = progress * samples[samples.length - 1].dist;
        
        let low = 0;
        let high = samples.length - 1;
        let best = 0;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (samples[mid].dist <= targetDist) {
                best = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        if (best >= samples.length - 1) {
            return samples[samples.length - 1];
        }
        
        const s0 = samples[best];
        const s1 = samples[best + 1];
        const dSpan = s1.dist - s0.dist;
        
        let ratio = 0;
        if (dSpan > 0) {
            ratio = (targetDist - s0.dist) / dSpan;
        }
        
        return {
            x: s0.x + (s1.x - s0.x) * ratio,
            y: s0.y + (s1.y - s0.y) * ratio,
            parallaxFactor: s0.parallaxFactor + (s1.parallaxFactor - s0.parallaxFactor) * ratio,
            magneticX: s0.magneticX + (s1.magneticX - s0.magneticX) * ratio,
            magneticY: s0.magneticY + (s1.magneticY - s0.magneticY) * ratio
        };
    }

    function drawHighlightedRoute() {
        if (!isTraveling || !travelSamples || travelSamples.length < 2) return;
        
        ctx.save();
        
        // Project all spline points relative to camera parallax once per frame
        const projectedPoints = travelSamples.map(s => getParallaxCoord(s));
        
        const aberrationOffset = Math.sin(travelProgress * Math.PI) * 4.5;

        // 1. Cyan offset line
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        projectedPoints.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x - aberrationOffset, p.y);
            else ctx.lineTo(p.x - aberrationOffset, p.y);
        });
        ctx.stroke();

        // 2. Magenta offset line
        ctx.strokeStyle = 'rgba(224, 64, 251, 0.45)';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        projectedPoints.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x + aberrationOffset, p.y);
            else ctx.lineTo(p.x + aberrationOffset, p.y);
        });
        ctx.stroke();

        // 3. Central core sharp white line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        projectedPoints.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        
        ctx.restore();
    }

    function completeTravelReveal() {
        // Clear emergency unlock safety timeout
        if (travelTimeoutTimer) {
            clearTimeout(travelTimeoutTimer);
            travelTimeoutTimer = null;
        }

        try {
            isTraveling = false;
            
            const section = travelEndNode ? document.getElementById(travelEndNode.id) : null;
            if (section) {
                // Clear reveal-active from all section elements
                document.querySelectorAll('main > section').forEach(sec => {
                    sec.classList.remove('reveal-active');
                });
                
                // Snap scroll instantly in the background
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo(0, section.offsetTop);
                
                // Activate destination's staggered CSS entrance
                section.classList.add('reveal-active');
                
                // Remove travel layout filters from body
                document.body.classList.remove('neural-traveling');
                
                // Set active selection
                navNodes.forEach(node => {
                    node.selected = (node.id === travelEndNode.id);
                });
            }
            
            // Reset camera transforms back to defaultCamera values
            camera.x = defaultCamera.x;
            camera.y = defaultCamera.y;
            camera.zoom = defaultCamera.zoom;
            camera.rotation = defaultCamera.rotation;
            
            // Reset/clear travel paths and signals
            travelPath = [];
            travelSamples = [];
            console.log("Route destroyed");
            
            activeBeaconNode = null;
            travelWaves = [];
            chainPulses = [];
            pulseSignals = [];
            
            // Recycle all active particles and empty active array
            while (particles.length > 0) {
                recycleParticle(particles.pop());
            }
            console.log("Particles removed");
            
            // Reset canvas context filter
            ctx.filter = 'none';
            
            if (travelEndNode) {
                // Spawn destination portal ripple
                travelWaves.push({
                    x: travelEndNode.x,
                    y: travelEndNode.y,
                    r: 0,
                    maxR: Math.max(width, height) * 0.45,
                    speed: 13,
                    alpha: 1.0
                });
                
                // Disperse particles out of portal
                spawnParticle(travelEndNode.x, travelEndNode.y, '0, 240, 255', true);
                spawnParticle(travelEndNode.x, travelEndNode.y, '124, 77, 255', true);
            }
            console.log("Arrival complete");
        } catch (e) {
            console.error("Error during travel reveal:", e);
        } finally {
            isTransitioning = false;
            console.log("Transition cleaned");
            console.log("Cleanup complete: true");
        }
    }

    function drawNavigationChain() {
        if (isTraveling || bootPhase !== 'READY') return;
        
        const px = (mouseX / width - 0.5) * 22;
        const py = (mouseY / height - 0.5) * 12;
        
        for (let i = 0; i < navNodes.length - 1; i++) {
            const nA = navNodes[i];
            const nB = navNodes[i + 1];
            
            const pA = getParallaxCoord(nA);
            const pB = getParallaxCoord(nB);
            
            const isHoveredConn = nA.hovered || nB.hovered;
            
            let opacity = 0.28;
            let widthVal = 0.8;
            let color = '30, 120, 255'; // electric blue
            
            if (isHoveredConn) {
                opacity = 0.85;
                widthVal = 1.6;
                color = '0, 240, 255'; // electric cyan
            } else if (nA.selected || nB.selected) {
                opacity = 0.55;
                widthVal = 1.2;
                color = '124, 77, 255'; // futuristic purple
            }
            
            // Neon glow shadow line
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle = `rgba(${color}, ${opacity * 0.22 * systemAlpha})`;
            ctx.lineWidth = widthVal * 3.5;
            ctx.stroke();
            
            // Core line
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle = `rgba(${color}, ${opacity * systemAlpha})`;
            ctx.lineWidth = widthVal;
            ctx.stroke();
        }
    }

    function updateAndDrawChainPulses() {
        if (isTraveling) return;
        for (let i = chainPulses.length - 1; i >= 0; i--) {
            const cp = chainPulses[i];
            cp.t += cp.speed;
            
            const nA = navNodes[cp.fromIndex];
            const nB = navNodes[cp.toIndex];
            
            const pA = getParallaxCoord(nA);
            const pB = getParallaxCoord(nB);
            
            // Current position of the pulse
            const pxPos = pA.x + (pB.x - pA.x) * cp.t;
            const pyPos = pA.y + (pB.y - pA.y) * cp.t;
            
            // Draw pulse core
            ctx.beginPath();
            ctx.arc(pxPos, pyPos, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#00f0ff';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#00f0ff';
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Spawn some particles as it travels
            if (Math.random() < 0.3) {
                particles.push(getParticle({
                    x: pxPos,
                    y: pyPos,
                    vx: (Math.random() - 0.5) * 1.0,
                    vy: (Math.random() - 0.5) * 1.0,
                    life: 0.8,
                    decay: 0.03,
                    size: 1 + Math.random() * 1.5,
                    color: '0, 240, 255'
                }));
            }
            
            if (cp.t >= 1) {
                // Propagate to the next node in the chain
                const nextIndex = cp.toIndex + cp.direction;
                if (nextIndex >= 0 && nextIndex < navNodes.length) {
                    chainPulses.push({
                        fromIndex: cp.toIndex,
                        toIndex: nextIndex,
                        t: 0,
                        speed: 0.025,
                        direction: cp.direction
                    });
                }
                chainPulses.splice(i, 1);
            }
        }
    }

    function updateAndDrawTravelWaves() {
        for (let i = travelWaves.length - 1; i >= 0; i--) {
            const w = travelWaves[i];
            w.r += w.speed;
            w.alpha = Math.max(0, 1.0 - w.r / w.maxR);
            
            // Draw neon purple outer glow
            ctx.beginPath();
            ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(124, 77, 255, ${w.alpha * 0.22})`;
            ctx.lineWidth = 14;
            ctx.stroke();
            
            // Draw electric cyan core wave
            ctx.beginPath();
            ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 240, 255, ${w.alpha * 0.45})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            // Illuminate any connections or nodes that the wave passes through
            faceNodes.forEach(n => {
                const dx = n.x - w.x;
                const dy = n.y - w.y;
                const dist = Math.hypot(dx, dy);
                if (Math.abs(dist - w.r) < 35) {
                    n.pulsePhase += 0.25; // Make it pulse
                    if (Math.random() < 0.12) {
                        spawnParticle(n.x, n.y, '0, 240, 255');
                    }
                }
            });
            
            if (w.r >= w.maxR) {
                travelWaves.splice(i, 1);
            }
        }
    }

    function drawNavigationNodes() {
        if (bootPhase !== 'READY') return;
        
        navNodes.forEach(node => {
            // Skip non-path navigation nodes during travel to optimize draw calls
            if (isTraveling && !travelPath.includes(node)) {
                return;
            }
            
            node.hoverAlpha += (node.hovered ? 1 : 0 - node.hoverAlpha) * 0.12;
            node.activeAlpha += (node.selected ? 1 : 0 - node.activeAlpha) * 0.12;
            node.ringAngle += 0.015;
            
            const p = getParallaxCoord(node);
            
            // Pulse logic: slow breathing heartbeat
            const pulseRate = 0.0015;
            const basePulse = Math.sin(Date.now() * pulseRate * Math.PI * 2 + node.pulsePhase) * 1.2;
            
            const baseSize = 8;
            const outerPulseSize = basePulse * (1.0 + node.hoverAlpha * 0.4);
            
            // If traveling, react or fade based on camera proximity
            let travelReact = 0;
            let alphaMult = 1.0;
            if (isTraveling && travelSamples && travelSamples.length > 0) {
                const curPt = getPointAtLengthProgress(travelSamples, travelProgress);
                const distToCamera = Math.hypot(node.x - curPt.x, node.y - curPt.y);
                
                if (travelPath.includes(node)) {
                    const maxReactDist = 80;
                    if (distToCamera < maxReactDist) {
                        travelReact = (1.0 - distToCamera / maxReactDist) * 1.5;
                        alphaMult = 0.06 + (1.0 - distToCamera / maxReactDist) * 0.94;
                    } else {
                        alphaMult = 0.06;
                    }
                } else {
                    alphaMult = 0.06;
                }
            }
            
            // 1. Layered Neon Aura (layered glow circles)
            ctx.beginPath();
            ctx.arc(p.x, p.y, baseSize * 2.8 + outerPulseSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${(0.05 + node.hoverAlpha * 0.08 + node.activeAlpha * 0.12) * systemAlpha * alphaMult})`;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, baseSize * 1.8 + outerPulseSize * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(124, 77, 255, ${(0.10 + node.hoverAlpha * 0.12 + node.activeAlpha * 0.18) * systemAlpha * alphaMult})`;
            ctx.fill();
            
            // 2. Rotating energy ring
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(node.ringAngle);
            ctx.strokeStyle = `rgba(0, 240, 255, ${(0.3 + node.hoverAlpha * 0.5 + node.activeAlpha * 0.7) * systemAlpha * alphaMult})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 5]);
            ctx.beginPath();
            ctx.arc(0, 0, baseSize * 1.5 + basePulse * 0.3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            
            // 3. Central Core Node (neural appearance)
            ctx.beginPath();
            ctx.arc(p.x, p.y, baseSize + basePulse * 0.4, 0, Math.PI * 2);
            const coreColor = node.selected ? '0, 240, 255' : (node.hovered ? '0, 240, 255' : '124, 77, 255');
            ctx.fillStyle = `rgba(${coreColor}, ${(0.85 + node.hoverAlpha * 0.15 + node.activeAlpha * 0.15) * systemAlpha * alphaMult})`;
            ctx.shadowBlur = isTraveling ? (travelReact * 12) : (8 + node.hoverAlpha * 6 + node.activeAlpha * 10);
            ctx.shadowColor = `rgba(${coreColor}, 0.8)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function sendChainPulses(clickedIndex) {
        if (clickedIndex > 0) {
            chainPulses.push({
                fromIndex: clickedIndex,
                toIndex: clickedIndex - 1,
                t: 0,
                speed: 0.03,
                direction: -1
            });
        }
        if (clickedIndex < navNodes.length - 1) {
            chainPulses.push({
                fromIndex: clickedIndex,
                toIndex: clickedIndex + 1,
                t: 0,
                speed: 0.03,
                direction: 1
            });
        }
    }

    function sendEnergyPulsesFromNavNode(navNode) {
        faceConnections.forEach(conn => {
            if (conn.nodeA === navNode) {
                pulseSignals.push({
                    conn,
                    t: 0,
                    speed: 0.015 + Math.random() * 0.012,
                    fwd: true
                });
            } else if (conn.nodeB === navNode) {
                pulseSignals.push({
                    conn,
                    t: 0,
                    speed: 0.015 + Math.random() * 0.012,
                    fwd: false
                });
            }
        });
        
        const clickedIndex = navNodes.indexOf(navNode);
        if (clickedIndex !== -1) {
            sendChainPulses(clickedIndex);
        }
    }

    // Setup Neural Navigation Event Listeners via Event Delegation on parent container
    const navContainer = document.getElementById('neural-nav-container');
    if (navContainer) {
        // Clean any previous event listeners on page reload by cloning the container element
        const clonedContainer = navContainer.cloneNode(true);
        navContainer.parentNode.replaceChild(clonedContainer, navContainer);

        // Cache nav node DOM elements from the active cloned container
        navNodes.forEach(node => {
            node.domElement = clonedContainer.querySelector(`.neural-nav-node[data-target="${node.id}"]`);
        });

        // Hover delegation (mouseover)
        clonedContainer.addEventListener('mouseover', (e) => {
            if (isTransitioning) return;
            const nodeEl = e.target.closest('.neural-nav-node');
            if (!nodeEl) return;

            const targetId = nodeEl.getAttribute('data-target');
            const node = navNodes.find(n => n.id === targetId);
            if (!node) return;

            // Prevent duplicate triggers if already hovered
            if (node.hovered) return;

            // Debounce mouseenter hover events by 80ms to prevent rapid CPU thrashing
            if (hoverTimeout) clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                if (isTransitioning) return;
                node.hovered = true;

                // Spawn gravity pull particles
                const px = (mouseX / width - 0.5) * 22;
                const py = (mouseY / height - 0.5) * 12;
                const targetX = node.x + px * 0.8 + node.magneticX;
                const targetY = node.y + py * 0.8 + node.magneticY;

                for (let i = 0; i < 5; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 50 + Math.random() * 50;
                    const sx = targetX + Math.cos(angle) * dist;
                    const sy = targetY + Math.sin(angle) * dist;
                    particles.push(getParticle({
                        x: sx,
                        y: sy,
                        vx: -Math.cos(angle) * (1.2 + Math.random() * 1.5),
                        vy: -Math.sin(angle) * (1.2 + Math.random() * 1.5),
                        life: 1.0,
                        decay: 0.015,
                        size: 0.8 + Math.random() * 1.2,
                        color: '0, 240, 255'
                    }));
                }
            }, hoverDebounceMs);
        });

        // Hover leave delegation (mouseout)
        clonedContainer.addEventListener('mouseout', (e) => {
            const nodeEl = e.target.closest('.neural-nav-node');
            if (!nodeEl) return;

            // Check if pointer moved inside the same node
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && nodeEl.contains(relatedTarget)) return;

            const targetId = nodeEl.getAttribute('data-target');
            const node = navNodes.find(n => n.id === targetId);
            if (node) {
                node.hovered = false;
            }

            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }
        });

        // Click delegation
        clonedContainer.addEventListener('click', (e) => {
            const nodeEl = e.target.closest('.neural-nav-node');
            if (!nodeEl) return;

            e.preventDefault();

            const targetId = nodeEl.getAttribute('data-target');
            const node = navNodes.find(n => n.id === targetId);
            if (node) {
                startNeuralTravel(node, false);
            }
        });
    }

    // Unified Travel sequence function for both canvas click and top navbar clicks
    function startNeuralTravel(node, isFromNavbar) {
        // If performance recovery has triggered, immediately fall back to native smooth scrolling
        if (travelEffectsDisabled) {
            const sectionEl = document.getElementById(node.id);
            if (sectionEl) {
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo({ top: sectionEl.offsetTop, behavior: 'smooth' });
                // Reset scroll position of target section inner scroll wrapper
                const scrollInner = sectionEl.querySelector('.section-scroll-inner');
                if (scrollInner) scrollInner.scrollTop = 0;
            }
            navNodes.forEach(n => {
                n.selected = (n.id === node.id);
            });
            return;
        }

        const now = Date.now();
        // Centralized Transition Lock: block click/hover and prevent spam clicks
        if (isTransitioning || node.selected || (now - lastClickTime < clickCooldown)) {
            return;
        }
        lastClickTime = now;
        isTransitioning = true;
        isNavbarTraveling = isFromNavbar;
        console.log("Travel sequence started to node: " + node.id + " (navbar: " + isFromNavbar + ")");

        // Set up emergency unlock safety timer (scaled for 60% slower travel)
        if (travelTimeoutTimer) clearTimeout(travelTimeoutTimer);
        travelTimeoutTimer = setTimeout(() => {
            console.warn("Safety travel timeout fired! Forcing cleanup.");
            completeTravelReveal();
            isNavbarTraveling = false;
        }, isFromNavbar ? 4000 : 4800);

        try {
            // Pre-validation guard system
            if (!node || !node.id) {
                throw new Error("Invalid destination node");
            }

            // Reset target section scroll position immediately
            const targetSectionEl = document.getElementById(node.id);
            if (targetSectionEl) {
                const scrollInner = targetSectionEl.querySelector('.section-scroll-inner');
                if (scrollInner) scrollInner.scrollTop = 0;
            }

            const startNode = navNodes.find(n => n.selected) || navNodes[0];
            if (!startNode) {
                throw new Error("Invalid start node");
            }
            
            travelStartNode = startNode;
            travelEndNode = node;

            // Kill active GSAP tweens if any
            if (window.gsap) {
                window.gsap.killTweensOf("*");
            }

            // 1. Generate path and distance-based samples using spline router
            travelPath = findShortestPath(startNode, node);
            console.log("route found: " + (travelPath.length > 0) + ", length: " + travelPath.length);
            
            if (!travelPath || travelPath.length === 0) {
                throw new Error("Pathfinding returned empty route");
            }

            travelSamples = sampleSplineByDistance(travelPath);
            if (!travelSamples || travelSamples.length === 0) {
                throw new Error("Spline sampling yielded no points");
            }
            
            let totalLength = 600;
            if (travelSamples.length > 0) {
                totalLength = travelSamples[travelSamples.length - 1].dist;
            }
            const speedConstant = 8.0; // pixels per frame
            
            // Calculate travel duration
            travelDuration = Math.min(108, Math.max(72, Math.round(totalLength / speedConstant)));
            if (isFromNavbar) {
                // Ensure sufficient frames for smooth camera zooming and color flash synchronization
                travelDuration = Math.max(65, travelDuration);
            }
            // Scale duration by 1.6 to make the lead-up sequence 60% slower
            travelDuration = Math.round(travelDuration * 1.6);

            // 2. Activate travel state variables
            isTraveling = true;
            travelTimer = 0;
            travelProgress = 0;
            activeBeaconNode = node;

            // Keep current camera values as starting point for a smooth transition!

            // Validate camera variables
            if (!validateCameraCoordinates()) {
                throw new Error("Camera initialized with invalid coordinates");
            }

            // 3. Trigger activation effects
            // Add traveling class to document body to trigger blur & fade-out of content
            document.body.classList.add('neural-traveling');

            // Spawn ripples at start node
            travelWaves.push({
                x: startNode.x,
                y: startNode.y,
                r: 0,
                maxR: Math.max(width, height) * 0.3,
                speed: 10,
                alpha: 1.0
            });

            // If navbar click, release a shockwave from the destination node too!
            if (isFromNavbar) {
                travelWaves.push({
                    x: node.x,
                    y: node.y,
                    r: 0,
                    maxR: Math.max(width, height) * 0.5,
                    speed: 14,
                    alpha: 1.0
                });
            }

            // Spawn a gathering particle force around the destination beacon node
            const pCount = isFromNavbar ? 25 : 20;
            for (let i = 0; i < pCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 120 + Math.random() * 80;
                const sx = node.x + Math.cos(angle) * dist;
                const sy = node.y + Math.sin(angle) * dist;

                particles.push(getParticle({
                    x: sx,
                    y: sy,
                    vx: -Math.cos(angle) * (1.8 + Math.random() * 2.2),
                    vy: -Math.sin(angle) * (1.8 + Math.random() * 2.2),
                    life: 1.0,
                    decay: 0.015,
                    size: 0.8 + Math.random() * 1.5,
                    color: '0, 240, 255'
                }));
            }

            // Spark particles at starting node
            spawnParticle(startNode.x, startNode.y, '0, 240, 255', true);

            // Send multiple pulses down connection lines
            sendEnergyPulsesFromNavNode(node);

        } catch (err) {
            console.error("Transition error encountered. Falling back to native scrolling.", err);
            
            const sectionEl = document.getElementById(node.id);
            if (sectionEl) {
                const mainEl = document.querySelector('main');
                if (mainEl) mainEl.scrollTo({ top: sectionEl.offsetTop, behavior: 'smooth' });
                // Reset scroll position of target section inner scroll wrapper
                const scrollInner = sectionEl.querySelector('.section-scroll-inner');
                if (scrollInner) scrollInner.scrollTop = 0;
            }
            
            isTraveling = false;
            if (travelTimeoutTimer) {
                clearTimeout(travelTimeoutTimer);
                travelTimeoutTimer = null;
            }
            
            document.body.classList.remove('neural-traveling');
            
            navNodes.forEach(n => {
                n.selected = (n.id === node.id);
            });
            
            isTransitioning = false;
            isNavbarTraveling = false;
        }
    }

    // Trigger Navbar direct travel, shockwave
    let isNavbarTraveling = false;

    function triggerNavbarTravel(node) {
        startNeuralTravel(node, true);
    }

    // Intercept top navbar link clicks
    const topNavbarLinks = document.querySelectorAll('header nav ul.nav-links a');
    topNavbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const node = navNodes.find(n => n.id === targetId);
                if (node) {
                    e.preventDefault();
                    triggerNavbarTravel(node);
                }
            }
        });
    });

    // Intercept CTA hero buttons and any in-page anchor links inside main
    document.querySelectorAll('main a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const node = navNodes.find(n => n.id === targetId);
                if (node) {
                    e.preventDefault();
                    triggerNavbarTravel(node);
                }
            }
        });
    });

    // Scroll Spying (Reads from cached layouts to prevent layout thrashing)
    function updateScrollSpy() {
        if (isTraveling) return;
        const sections = ['hero', 'about', 'skills', 'experience', 'contact'];
        let currentSection = 'hero';
        
        const mainEl = document.querySelector('main');
        if (!mainEl) return;
        // Midway threshold is standard
        const scrollPos = mainEl.scrollTop + window.innerHeight * 0.4;
        
        for (const id of sections) {
            const layout = sectionLayouts[id];
            if (layout) {
                const top = layout.top;
                const height = layout.height;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentSection = id;
                    break;
                }
            }
        }
        
        navNodes.forEach(node => {
            node.selected = (node.id === currentSection);
        });
    }
    
    // Initialize section layouts cache and bind scroll spy
    cacheSectionLayouts();
    const mainScrollEl = document.querySelector('main');
    if (mainScrollEl) {
        mainScrollEl.addEventListener('scroll', updateScrollSpy);

        // Block wheel/touchmove events on main to prevent section-to-section scrolling.
        // Only the inner .section-scroll-inner elements can scroll their own content.
        mainScrollEl.addEventListener('wheel', (e) => {
            // Check if the wheel event originated inside a section-scroll-inner
            const scrollInner = e.target.closest('.section-scroll-inner');
            if (scrollInner) {
                // Allow if the inner container has scrollable content
                const hasOverflow = scrollInner.scrollHeight > scrollInner.clientHeight;
                if (hasOverflow) {
                    // Check if we're at a scroll boundary
                    const atTop = scrollInner.scrollTop <= 0 && e.deltaY < 0;
                    const atBottom = (scrollInner.scrollTop + scrollInner.clientHeight >= scrollInner.scrollHeight - 1) && e.deltaY > 0;
                    
                    if (atTop || atBottom) {
                        // At boundary Ã¢â‚¬â€ block to prevent section change
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    // Otherwise allow natural inner scroll
                    return;
                }
            }
            // Block all other wheel events from scrolling main
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });

        // Block touch-move on main to prevent swipe-based section scrolling
        mainScrollEl.addEventListener('touchmove', (e) => {
            const scrollInner = e.target.closest('.section-scroll-inner');
            if (scrollInner) {
                const hasOverflow = scrollInner.scrollHeight > scrollInner.clientHeight;
                if (hasOverflow) {
                    // Allow internal touch scrolling
                    return;
                }
            }
            e.preventDefault();
        }, { passive: false });
    }
    updateScrollSpy();

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Main loop Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    function animateHeroCanvas() {
        // Measure frame-to-frame delta time for emergency recovery and FPS tracking
        const nowFrame = performance.now();
        const delta = nowFrame - lastFrameTime;
        lastFrameTime = nowFrame;

        // Update FPS (calculated every 500ms)
        fpsFrameCount++;
        if (nowFrame - fpsLastUpdateTime >= 500) {
            fps = Math.round((fpsFrameCount * 1000) / (nowFrame - fpsLastUpdateTime));
            fpsFrameCount = 0;
            fpsLastUpdateTime = nowFrame;
            updateDebugOverlay();
        }

        // Emergency performance monitor (Threshold: 33.3ms = 30 FPS)
        // Only monitor performance during active transitions to avoid startup/background triggers
        if (isTraveling) {
            if (delta > 33.3) {
                consecutiveSlowFrames++;
                if (consecutiveSlowFrames > 15 && !travelEffectsDisabled) {
                    travelEffectsDisabled = true;
                    console.warn("Performance degradation detected! Cinematic travel transitions disabled.");
                    completeTravelReveal();
                }
            } else {
                consecutiveSlowFrames = Math.max(0, consecutiveSlowFrames - 0.5);
            }
        } else {
            consecutiveSlowFrames = 0; // Reset counter when idling
        }

        // Clear canvas with motion blur trails during camera travel
        if (isTraveling) {
            ctx.fillStyle = 'rgba(3, 5, 8, 0.28)';
            ctx.fillRect(0, 0, width, height);
        } else {
            ctx.clearRect(0, 0, width, height);
        }

        updateBootSequence();
        ctx.globalAlpha = systemAlpha;

        // Update travel updates
        if (isTraveling) {
            travelTimer++;
            const t = Math.min(1.0, travelTimer / travelDuration);
            travelProgress = t;
            
            if (t >= 1.0) {
                completeTravelReveal();
                isNavbarTraveling = false;
            } else {
                const easedT = easePower2InOut(t);
                
                // Curve interpolation using Catmull-Rom samples
                const pos = getPointAtLengthProgress(travelSamples, easedT);
                
                // Resolve camera coordinates including dynamic mouse parallax and magnetic offsets to prevent detachment
                const px = (mouseX / width - 0.5) * 22;
                const py = (mouseY / height - 0.5) * 12;
                
                const targetCamX = pos.x + px * pos.parallaxFactor + pos.magneticX;
                const targetCamY = pos.y + py * pos.parallaxFactor + pos.magneticY;
                
                // Spring-like catch-up that resolves perfectly at t = 1.0
                const catchUp = 0.15 + easedT * 0.85;
                camera.x += (targetCamX - camera.x) * catchUp;
                camera.y += (targetCamY - camera.y) * catchUp;
                
                if (isNavbarTraveling) {
                    // Zoom camera directly and deeply into the destination node
                    camera.zoom = 1.0 + easedT * 5.0; // Zoom up to 6.0!
                    camera.rotation = Math.sin(t * Math.PI) * 0.12;
                } else {
                    // Hyper-space zoom peak at midpoint
                    camera.zoom = 1.0 + Math.sin(t * Math.PI) * 2.6;
                    // Slight camera tilt rotation
                    camera.rotation = Math.sin(t * Math.PI * 2) * 0.08;
                }

                // Validate camera coordinates. If invalid, abort travel immediately!
                if (!validateCameraCoordinates()) {
                    completeTravelReveal();
                    isNavbarTraveling = false;
                }
            }
        } else {
            // Idle state: Smoothly scale and shift camera based on active section
            const activeNode = navNodes.find(n => n.selected) || navNodes[0];
            let targetZoom = 1.0;
            let targetX = width / 2;
            let targetY = height / 2;

            if (activeNode && activeNode.id !== 'hero') {
                if (width > 900) {
                    targetZoom = 0.78;
                    targetX = width * 1.10; // Shift left but keep fully within viewport
                    targetY = height * 0.5;
                } else {
                    // Mobile: center in background
                    targetZoom = 0.78;
                    targetX = width / 2;
                    targetY = height * 0.5;
                }
            }

            // Interpolate camera values smoothly
            camera.zoom += (targetZoom - camera.zoom) * 0.08;
            camera.x += (targetX - camera.x) * 0.08;
            camera.y += (targetY - camera.y) * 0.08;
            camera.rotation += (0 - camera.rotation) * 0.08;
        }

        drawBackground();
        updatePulseSignals();
        drawFace();
        drawHUD();
        
        // Draw Interactive Neural Navigation Layer
        drawNavigationChain();
        updateAndDrawChainPulses();
        updateAndDrawTravelWaves();
        
        if (isTraveling) {
            drawHighlightedRoute();
        }
        
        drawNavigationNodes();
        
        if (!isTraveling) {
            drawButtons();
            updateRobot();
            drawRobot();
            drawStageLabel();
        }
        
        updateParticles();
        drawParticles();

        ctx.globalAlpha = 1.0;
        drawBootText();

        // Update magnetic pull offsets and sync HTML overlay coordinates
        if (bootPhase === 'READY') {
            const px = (mouseX / width - 0.5) * 22;
            const py = (mouseY / height - 0.5) * 12;
            
            navNodes.forEach(node => {
                if (node.faceNodeRef) {
                    node.x = node.faceNodeRef.x;
                    node.y = node.faceNodeRef.y;
                    node.faceNodeRef.hovered = node.hovered;
                    node.faceNodeRef.selected = node.selected;
                }
            });

            navNodes.forEach(node => {
                const visualX = node.x + px * 0.8;
                const visualY = node.y + py * 0.8;
                const dx = mouseX - visualX;
                const dy = mouseY - visualY;
                const dist = Math.hypot(dx, dy);
                if (dist < 120) {
                    const pull = (1.0 - dist / 120) * 0.16;
                    node.magneticX += (dx * pull - node.magneticX) * 0.15;
                    node.magneticY += (dy * pull - node.magneticY) * 0.15;
                } else {
                    node.magneticX += (0 - node.magneticX) * 0.15;
                    node.magneticY += (0 - node.magneticY) * 0.15;
                }
            });
            
            navNodes.forEach(node => {
                const el = node.domElement;
                if (el) {
                    const p = getParallaxCoord(node);
                    el.style.left = `${p.x}px`;
                    el.style.top = `${p.y}px`;
                    el.style.transform = `scale(${camera.zoom})`;
                    
                    // Dynamically set position-left / position-right class based on X coordinate
                    const midX = width * 0.70;
                    if (node.x < midX) {
                        el.classList.add('position-left');
                        el.classList.remove('position-right');
                    } else {
                        el.classList.add('position-right');
                        el.classList.remove('position-left');
                    }
                    
                    // Sync active state class
                    if (node.selected) {
                        el.classList.add('selected');
                    } else {
                        el.classList.remove('selected');
                    }
                    
                    // Sync hover state class
                    if (node.hovered) {
                        el.classList.add('hovered');
                    } else {
                        el.classList.remove('hovered');
                    }

                    // Calculate opacity: if traveling, destination node fades out briefly/gradually, others fade fast
                    let targetOpacity = systemAlpha;
                    if (isTraveling) {
                        if (node === travelEndNode) {
                            const fadeProgress = Math.min(1.0, travelProgress / 0.3);
                            targetOpacity = (1.0 - fadeProgress) * systemAlpha;
                        } else {
                            const fadeProgress = Math.min(1.0, travelProgress / 0.05);
                            targetOpacity = (1.0 - fadeProgress) * systemAlpha;
                        }
                    } else {
                        const activeNode = navNodes.find(n => n.selected) || navNodes[0];
                        if (activeNode && activeNode.id !== 'hero') {
                            // Shrunk state on other sections: fade unselected labels more to prevent interference
                            if (node.selected) {
                                targetOpacity = systemAlpha * 0.85;
                            } else {
                                targetOpacity = systemAlpha * 0.22; // Very subtle unselected labels
                            }
                        }
                    }
                    el.style.opacity = targetOpacity;
                    el.style.pointerEvents = (systemAlpha > 0.5 && !isTraveling) ? 'auto' : 'none';
                }
            });
        }

        requestAnimationFrame(animateHeroCanvas);
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        defaultCamera.x = width / 2;
        defaultCamera.y = height / 2;
        
        // If not traveling and uninitialized, snap camera to defaults to prevent initial jump
        if (!isTraveling && camera.x === 0 && camera.y === 0) {
            camera.x = defaultCamera.x;
            camera.y = defaultCamera.y;
        }
        
        // Update nav nodes coordinates dynamically
        navNodes.forEach(node => {
            node.x = node.targetX * width;
            node.y = node.targetY * height;
        });

        initFaceNodes();
        initButtons();
        cacheSectionLayouts();
    }

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    animateHeroCanvas(); // Start the animation loop!

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ EmailJS Contact Form Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const EMAILJS_PUBLIC_KEY = 'oD5moI8obUwvNIqMS';
    const EMAILJS_SERVICE_ID = 'service_wxpjq0x';
    const EMAILJS_TEMPLATE_ID = 'template_s8w3kab';

    // Initialize EmailJS (v4 object form)
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page refresh

            // Get field values
            const nameVal = document.getElementById('form-name').value.trim();
            const emailVal = document.getElementById('form-email').value.trim();
            const messageVal = document.getElementById('form-message').value.trim();

            // Validate required fields
            if (!nameVal || !emailVal || !messageVal) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }

            // Basic email format check
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Disable button and show sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="sending-spinner"></span>
                Sending...
            `;

            // Template params Ã¢â‚¬â€ must match EmailJS template variables exactly
            const templateParams = {
                name: nameVal,
                Email: emailVal,
                message: messageVal
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
                publicKey: EMAILJS_PUBLIC_KEY
            })
                .then(function (response) {
                    console.log('EmailJS success:', response.status, response.text);
                    showFormStatus('Message sent successfully', 'success');
                    contactForm.reset();
                })
                .catch(function (error) {
                    console.error('EmailJS error:', error);
                    showFormStatus('Failed to send. Please email me directly at jeevakanna1244@gmail.com', 'error');
                })
                .finally(function () {
                    // Restore button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        Send Message
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    `;
                });
        });
    }

    function showFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
        }, 5000);
    }

    // Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Developer Performance Debug Overlay Initialization Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    const debugOverlay = document.createElement('div');
    debugOverlay.id = 'performance-debug-overlay';
    debugOverlay.innerHTML = `
        <div><span>FPS:</span><span class="value" id="debug-fps">60</span></div>
        <div><span>Particles:</span><span class="value" id="debug-particles">0</span></div>
        <div><span>Pool Size:</span><span class="value" id="debug-recycled">0</span></div>
        <div><span>Listeners:</span><span class="value" id="debug-listeners">23</span></div>
        <div><span>Travel State:</span><span class="value" id="debug-state">IDLE</span></div>
    `;
    document.body.appendChild(debugOverlay);

    function updateDebugOverlay() {
        const fpsEl = document.getElementById('debug-fps');
        const partEl = document.getElementById('debug-particles');
        const recEl = document.getElementById('debug-recycled');
        const stateEl = document.getElementById('debug-state');
        
        if (fpsEl) {
            fpsEl.textContent = fps + (travelEffectsDisabled ? " (FALLBACK)" : "");
            if (travelEffectsDisabled) fpsEl.style.color = '#ff5252';
        }
        if (partEl) partEl.textContent = particles.length;
        if (recEl) recEl.textContent = particlePool.length;
        if (stateEl) {
            if (isTraveling) {
                stateEl.textContent = `TRAVEL (${Math.round(travelProgress * 100)}%)`;
                stateEl.style.color = '#00f0ff';
            } else if (travelEffectsDisabled) {
                stateEl.textContent = 'DISABLED';
                stateEl.style.color = '#ff5252';
            } else {
                stateEl.textContent = 'IDLE';
                stateEl.style.color = '#7c4dff';
            }
        }
    }
});


