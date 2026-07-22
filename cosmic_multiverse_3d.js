/**
 * @file cosmic_multiverse_3d.js
 * @brief Cosmic Nature Archive - 3D Multiverse Render Engine
 * @details 3D multiverse simulation built with Three.js featuring quantum particles and an interactive galaxy.
 * @version 3.0.0-Multiverse
 */

// Initialize the 3D environment when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    // 1. SETUP THREE.JS ENVIRONMENT (SCENE, CAMERA, RENDERER)
    const container = document.getElementById('canvas-container') || document.body;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.05); // Space fog effect

    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 3, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Inject canvas into DOM if wrapper container doesn't exist
    if (!document.getElementById('canvas-container')) {
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '-1';
        renderer.domElement.style.pointerEvents = 'none';
        document.body.appendChild(renderer.domElement);
    } else {
        container.appendChild(renderer.domElement);
    }

    // 2. GENERATE 3D GALACTIC SPIRAL & QUANTUM PARTICLES
    const galaxyParams = {
        count: 5000,
        size: 0.025,
        radius: 7,
        branches: 4,
        spin: 1,
        randomness: 0.5,
        insideColor: '#818cf8', // Quantum purple
        outsideColor: '#38bdf8'  // Cosmic blue
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(galaxyParams.count * 3);
    const colors = new Float32Array(galaxyParams.count * 3);

    const colorInside = new THREE.Color(galaxyParams.insideColor);
    const colorOutside = new THREE.Color(galaxyParams.outsideColor);

    for (let i = 0; i < galaxyParams.count; i++) {
        // Particle coordinates
        const i3 = i * 3;
        const radius = Math.random() * galaxyParams.radius;
        const spinAngle = radius * galaxyParams.spin;
        const branchAngle = ((i % galaxyParams.branches) / galaxyParams.branches) * Math.PI * 2;

        const randomX = (Math.random() - 0.5) * galaxyParams.randomness * radius;
        const randomY = (Math.random() - 0.5) * galaxyParams.randomness * radius;
        const randomZ = (Math.random() - 0.5) * galaxyParams.randomness * radius;

        positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color interpolation based on core distance
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / galaxyParams.radius);

        colors[i3]     = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
        size: galaxyParams.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });

    const galaxyPoints = new THREE.Points(geometry, material);
    scene.add(galaxyPoints);

    // 3. GENERATE COSMIC CORE
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
        color: 0xc084fc,
        wireframe: true,
        transparent: true,
        opacity: 0.6
    });
    const cosmicCore = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(cosmicCore);

    // 4. MOUSE INTERACTION & SMOOTH PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    // 5. ANIMATION & RENDER LOOP
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Galaxy & core rotations
        galaxyPoints.rotation.y = elapsedTime * 0.05;
        cosmicCore.rotation.x = elapsedTime * 0.2;
        cosmicCore.rotation.y = elapsedTime * 0.3;

        // Core pulsing effect
        const scale = 1 + Math.sin(elapsedTime * 2) * 0.08;
        cosmicCore.scale.set(scale, scale, scale);

        // Smooth camera movement based on mouse position
        targetX = mouseX * 2;
        targetY = -mouseY * 2;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY + 3 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // 6. RESPONSIVE WINDOW RESIZING
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    console.log("[Cosmic 3D Engine]: 3D Multiverse rendering initialized successfully.");
});
