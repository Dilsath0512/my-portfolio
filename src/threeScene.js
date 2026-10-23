// Three.js 3D WebGL Canvas Scene for Sahabdeen Mohammed Dilsath (SMD)
// Cinematic 3D Cyber Core & Particle Field matching Sarang Space aesthetic

import * as THREE from 'three';

export function initThreeScene() {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = container.clientWidth || 500;
  const height = container.clientHeight || 520;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 7.8;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Group to rotate together with mouse
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Core 3D Geometry: Futuristic Wireframe Icosahedron
  const coreGeometry = new THREE.IcosahedronGeometry(1.8, 1);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b1a,
    emissive: 0xff3b00,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  mainGroup.add(coreMesh);

  // 2. Inner Glowing Solid Crystal Core
  const innerGeometry = new THREE.OctahedronGeometry(1.0, 0);
  const innerMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff8533,
    emissive: 0xff5500,
    emissiveIntensity: 0.8,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.9
  });
  const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
  mainGroup.add(innerMesh);

  // 3. Orbiting 3D Ring (Torus)
  const ringGeometry = new THREE.TorusGeometry(2.5, 0.035, 16, 100);
  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    emissive: 0xff6b1a,
    emissiveIntensity: 0.9,
    roughness: 0.3,
    metalness: 0.9
  });
  const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
  ringMesh.rotation.x = Math.PI / 3;
  mainGroup.add(ringMesh);

  const ringGeometry2 = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
  const ringMaterial2 = new THREE.MeshBasicMaterial({
    color: 0xff5500,
    wireframe: true
  });
  const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
  ringMesh2.rotation.y = Math.PI / 4;
  mainGroup.add(ringMesh2);

  // 4. Floating 3D Star / Particle Cloud (1,200 Particles)
  const particleCount = 1200;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0xff6b1a); // Vibrant Orange
  const color2 = new THREE.Color(0xffaa00); // Amber Gold
  const color3 = new THREE.Color(0xff3b00); // Deep Crimson

  for (let i = 0; i < particleCount; i++) {
    const r = 2.2 + Math.random() * 4.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const mixedColor = Math.random() > 0.5 ? color1 : (Math.random() > 0.5 ? color2 : color3);
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  mainGroup.add(particleSystem);

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0x221100, 1.5);
  scene.add(ambientLight);

  const orangePointLight = new THREE.PointLight(0xff6b1a, 5, 20);
  orangePointLight.position.set(4, 4, 5);
  scene.add(orangePointLight);

  const amberPointLight = new THREE.PointLight(0xffaa00, 4, 15);
  amberPointLight.position.set(-4, -3, 3);
  scene.add(amberPointLight);

  // Mouse Interaction (Smooth Lerp)
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = mouseX * 0.7;
    targetRotationX = -mouseY * 0.7;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.7;
      targetRotationX = -mouseY * 0.7;
    }
  }, { passive: true });

  // Handle Resize
  window.addEventListener('resize', () => {
    if (!container) return;
    const newWidth = container.clientWidth || 400;
    const newHeight = container.clientHeight || 450;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Constant subtle organic rotations
    coreMesh.rotation.x += delta * 0.35;
    coreMesh.rotation.y += delta * 0.45;

    innerMesh.rotation.x -= delta * 0.5;
    innerMesh.rotation.y += delta * 0.3;

    ringMesh.rotation.z += delta * 0.2;
    ringMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.5 + Math.PI / 3;

    ringMesh2.rotation.y += delta * 0.25;

    particleSystem.rotation.y -= delta * 0.08;
    particleSystem.rotation.x += delta * 0.05;

    // Smooth lerp mouse reaction
    mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
    mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

    // Subtle breathing scale
    const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
    innerMesh.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
  }

  animate();
}
