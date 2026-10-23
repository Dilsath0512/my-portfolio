// Real-Time 3D Interactive Cyber Robot for Dillu Copilot
// Built with Three.js — Features Glossy Obsidian Helmet, Glowing Cyber Visor Eyes,
// Rotating Holographic Orbital Ring, Pulsing Arc Reactor Chest Core, and Mouse Tracking.

import * as THREE from 'three';

let scene, camera, renderer, robotGroup, headGroup, bodyGroup;
let leftEye, rightEye, mouthLine, chestCore, haloRing, thrusterRing;
let particles;
let isThinking = false;
let isNodding = false;
let nodProgress = 0;
let isSpinning = false;
let spinProgress = 0;
let mouseX = 0, mouseY = 0;
let clock;
let animId = null;

export function initDilluRobot3D(canvasId = 'dillu-robot-3d-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  // Cleanup existing animation loop if any
  if (animId) {
    cancelAnimationFrame(animId);
    animId = null;
  }

  clock = new THREE.Clock();

  // Dimensions
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || canvas.clientWidth || 360;
  const height = rect.height || canvas.clientHeight || 120;

  // 1. Scene & Camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0, 4.3);

  // 2. Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  // 3. Lighting (Sarang Space Cyber Orange & Obsidian Dark Palette)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xff6b1a, 3.2); // Electric Cyber Orange
  keyLight.position.set(3, 4, 3);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffaa00, 1.8); // Amber Gold Fill
  fillLight.position.set(-3, -1, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xff6b1a, 3.5, 12);
  rimLight.position.set(0, 1.5, -2);
  scene.add(rimLight);

  // 4. Main Robot Container
  robotGroup = new THREE.Group();
  scene.add(robotGroup);

  // -------------------------------------------------------------
  // HEAD ASSEMBLY
  // -------------------------------------------------------------
  headGroup = new THREE.Group();
  headGroup.position.set(0, 0.35, 0);
  robotGroup.add(headGroup);

  // A. Glossy Dark Obsidian Helmet Shell
  const helmetGeo = new THREE.SphereGeometry(0.82, 36, 36);
  helmetGeo.scale(1.0, 0.94, 0.96);
  const helmetMat = new THREE.MeshPhysicalMaterial({
    color: 0x0c0e14,
    roughness: 0.14,
    metalness: 0.88,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9
  });
  const helmetMesh = new THREE.Mesh(helmetGeo, helmetMat);
  headGroup.add(helmetMesh);

  // B. Curved Cyber Visor (Faceplate Glass)
  const visorGeo = new THREE.SphereGeometry(0.72, 32, 24, 0, Math.PI, 0, Math.PI * 0.54);
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: 0x020306,
    roughness: 0.06,
    metalness: 0.2,
    transmission: 0.65,
    transparent: true,
    opacity: 0.92
  });
  const visorMesh = new THREE.Mesh(visorGeo, visorMat);
  visorMesh.rotation.x = -Math.PI / 2 + 0.15;
  visorMesh.position.set(0, 0.06, 0.24);
  headGroup.add(visorMesh);

  // C. Glowing Neon Cyber Eyes (Electric Cyber Orange)
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff6b1a });
  const eyeGeo = new THREE.CapsuleGeometry(0.075, 0.12, 10, 16);

  leftEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(-0.25, 0.08, 0.74);
  headGroup.add(leftEye);

  rightEye = new THREE.Mesh(eyeGeo, eyeMat);
  rightEye.position.set(0.25, 0.08, 0.74);
  headGroup.add(rightEye);

  // D. Subtle Cyber Smile / Mouth Line (Glowing Amber)
  const mouthGeo = new THREE.TorusGeometry(0.11, 0.016, 12, 24, Math.PI * 0.7);
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
  mouthLine = new THREE.Mesh(mouthGeo, mouthMat);
  mouthLine.rotation.z = Math.PI * 1.15;
  mouthLine.position.set(0, -0.15, 0.72);
  headGroup.add(mouthLine);

  // E. Ear Pods & Antennas on Both Sides
  const earGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.12, 24);
  earGeo.rotateZ(Math.PI / 2);
  const earMat = new THREE.MeshStandardMaterial({
    color: 0x181a24,
    metalness: 0.9,
    roughness: 0.2
  });

  const leftEar = new THREE.Mesh(earGeo, earMat);
  leftEar.position.set(-0.84, 0, 0);
  headGroup.add(leftEar);

  const rightEar = new THREE.Mesh(earGeo, earMat);
  rightEar.position.set(0.84, 0, 0);
  headGroup.add(rightEar);

  // Glowing Neon Ring on Each Ear
  const earRingGeo = new THREE.TorusGeometry(0.17, 0.022, 12, 32);
  earRingGeo.rotateY(Math.PI / 2);
  const earRingMat = new THREE.MeshBasicMaterial({ color: 0xff6b1a });

  const leftEarRing = new THREE.Mesh(earRingGeo, earRingMat);
  leftEarRing.position.set(-0.86, 0, 0);
  headGroup.add(leftEarRing);

  const rightEarRing = new THREE.Mesh(earRingGeo, earRingMat);
  rightEarRing.position.set(0.86, 0, 0);
  headGroup.add(rightEarRing);

  // Two Mini Cyber Antenna Rods
  const antGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 12);
  const antMat = new THREE.MeshStandardMaterial({ color: 0x333845, metalness: 0.9, roughness: 0.2 });

  const leftAnt = new THREE.Mesh(antGeo, antMat);
  leftAnt.position.set(-0.62, 0.65, -0.05);
  leftAnt.rotation.z = 0.35;
  leftAnt.rotation.x = -0.15;
  headGroup.add(leftAnt);

  const rightAnt = new THREE.Mesh(antGeo, antMat);
  rightAnt.position.set(0.62, 0.65, -0.05);
  rightAnt.rotation.z = -0.35;
  rightAnt.rotation.x = -0.15;
  headGroup.add(rightAnt);

  // Antenna Glowing Beacon Tips
  const tipGeo = new THREE.SphereGeometry(0.045, 12, 12);
  const tipMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

  const leftTip = new THREE.Mesh(tipGeo, tipMat);
  leftTip.position.set(-0.68, 0.82, -0.08);
  headGroup.add(leftTip);

  const rightTip = new THREE.Mesh(tipGeo, tipMat);
  rightTip.position.set(0.68, 0.82, -0.08);
  headGroup.add(rightTip);

  // F. Holographic Orbit Ring (Tilted Spinning Halo)
  const haloGeo = new THREE.TorusGeometry(1.22, 0.022, 16, 80);
  const haloMat = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    emissive: 0xff6b1a,
    emissiveIntensity: 1.6,
    roughness: 0.2,
    metalness: 0.9
  });
  haloRing = new THREE.Mesh(haloGeo, haloMat);
  haloRing.rotation.x = Math.PI / 4.5;
  haloRing.rotation.y = 0.2;
  headGroup.add(haloRing);

  // -------------------------------------------------------------
  // BODY / TORSO ASSEMBLY (Floating Magnetic Chassis)
  // -------------------------------------------------------------
  bodyGroup = new THREE.Group();
  bodyGroup.position.set(0, -0.68, 0);
  robotGroup.add(bodyGroup);

  // A. Torso Main Shell
  const torsoGeo = new THREE.CylinderGeometry(0.38, 0.52, 0.44, 32);
  const torsoMat = new THREE.MeshPhysicalMaterial({
    color: 0x0f1118,
    metalness: 0.9,
    roughness: 0.16,
    clearcoat: 1.0
  });
  const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
  bodyGroup.add(torsoMesh);

  // B. Glowing Arc Reactor / Energy Chest Core
  const coreHousingGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 24);
  coreHousingGeo.rotateX(Math.PI / 2);
  const coreHousingMat = new THREE.MeshStandardMaterial({ color: 0x1f2230, metalness: 0.9, roughness: 0.2 });
  const coreHousing = new THREE.Mesh(coreHousingGeo, coreHousingMat);
  coreHousing.position.set(0, 0.04, 0.35);
  bodyGroup.add(coreHousing);

  const coreGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xff6b1a });
  chestCore = new THREE.Mesh(coreGeo, coreMat);
  chestCore.position.set(0, 0.04, 0.38);
  bodyGroup.add(chestCore);

  // C. Inverted Thruster Base & Plasma Ring
  const thrusterGeo = new THREE.ConeGeometry(0.32, 0.22, 24);
  thrusterGeo.rotateX(Math.PI);
  const thrusterMesh = new THREE.Mesh(thrusterGeo, torsoMat);
  thrusterMesh.position.set(0, -0.32, 0);
  bodyGroup.add(thrusterMesh);

  const thrusterRingGeo = new THREE.TorusGeometry(0.24, 0.024, 12, 32);
  thrusterRingGeo.rotateX(Math.PI / 2);
  const thrusterRingMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
  thrusterRing = new THREE.Mesh(thrusterRingGeo, thrusterRingMat);
  thrusterRing.position.set(0, -0.42, 0);
  bodyGroup.add(thrusterRing);

  // -------------------------------------------------------------
  // AMBIENT GLOW PARTICLES (60 Micro Star Sparks)
  // -------------------------------------------------------------
  const pCount = 50;
  const pGeo = new THREE.BufferGeometry();
  const pPositions = new Float32Array(pCount * 3);
  const pColors = new Float32Array(pCount * 3);

  const colOrange = new THREE.Color(0xff6b1a);
  const colAmber = new THREE.Color(0xffaa00);

  for (let i = 0; i < pCount; i++) {
    const r = 1.4 + Math.random() * 1.6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    pPositions[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
    pPositions[i * 3 + 2] = r * Math.cos(ph);

    const c = Math.random() > 0.4 ? colOrange : colAmber;
    pColors[i * 3] = c.r;
    pColors[i * 3 + 1] = c.g;
    pColors[i * 3 + 2] = c.b;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

  const pMat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  particles = new THREE.Points(pGeo, pMat);
  robotGroup.add(particles);

  // Initial scaling to fit stage
  robotGroup.scale.set(0.92, 0.92, 0.92);
  robotGroup.position.y = -0.05;

  // -------------------------------------------------------------
  // MOUSE & INTERACTION LISTENERS
  // -------------------------------------------------------------
  const drawer = document.getElementById('dillu-drawer') || canvas;

  drawer.addEventListener('mousemove', (e) => {
    const r = drawer.getBoundingClientRect();
    mouseX = ((e.clientX - r.left) / r.width) * 2 - 1;
    mouseY = -(((e.clientY - r.top) / r.height) * 2 - 1);
  });

  drawer.addEventListener('mouseleave', () => {
    mouseX = 0;
    mouseY = 0;
  });

  // Clicking the robot spins it playfully
  canvas.addEventListener('click', () => {
    triggerRobotSpin();
  });

  // Blinking timer loop
  setupBlinkLoop();

  // Resize listener
  window.addEventListener('resize', onResize);

  // Start Animation Loop
  animate();

  return {
    nod: triggerRobotNod,
    spin: triggerRobotSpin,
    setThinking: (val) => { isThinking = val; }
  };
}

// Random blinking logic
function setupBlinkLoop() {
  function scheduleBlink() {
    const delay = 2500 + Math.random() * 3000;
    setTimeout(() => {
      if (leftEye && rightEye) {
        leftEye.scale.y = 0.08;
        rightEye.scale.y = 0.08;
        setTimeout(() => {
          if (leftEye && rightEye) {
            leftEye.scale.y = 1.0;
            rightEye.scale.y = 1.0;
          }
        }, 110);
      }
      scheduleBlink();
    }, delay);
  }
  scheduleBlink();
}

export function triggerRobotNod() {
  isNodding = true;
  nodProgress = 0;
}

export function triggerRobotSpin() {
  isSpinning = true;
  spinProgress = 0;
}

export function setRobotThinking(thinking) {
  isThinking = !!thinking;
}

function onResize() {
  const canvas = document.getElementById('dillu-robot-3d-canvas');
  if (!canvas || !renderer || !camera) return;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 360;
  const height = rect.height || 120;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Main Render Loop
function animate() {
  animId = requestAnimationFrame(animate);
  if (!clock || !renderer || !scene || !camera) return;

  const elapsedTime = clock.getElapsedTime();

  // 1. Hovering Physics (Sine Wave Float)
  const floatSpeed = isThinking ? 4.5 : 2.2;
  const floatAmp = isThinking ? 0.08 : 0.05;
  const hoverY = Math.sin(elapsedTime * floatSpeed) * floatAmp;
  robotGroup.position.y = -0.05 + hoverY;

  // 2. Halo Continuous Orbital Spin
  if (haloRing) {
    const haloSpeed = isThinking ? 0.04 : 0.016;
    haloRing.rotation.z += haloSpeed;
    haloRing.rotation.x = Math.PI / 4.5 + Math.sin(elapsedTime * 1.5) * 0.12;
  }

  // 3. Chest Core & Thruster Breathing Pulse
  if (chestCore && thrusterRing) {
    const pulseSpeed = isThinking ? 8.0 : 3.0;
    const pulseScale = 1.0 + Math.sin(elapsedTime * pulseSpeed) * 0.15;
    chestCore.scale.set(pulseScale, pulseScale, pulseScale);
    thrusterRing.scale.set(pulseScale, 1.0, pulseScale);
  }

  // 4. Particles Gentle Drift
  if (particles) {
    particles.rotation.y = elapsedTime * 0.06;
  }

  // 5. Mouse Tracking with Smooth Lerp
  const targetHeadRotY = mouseX * 0.42;
  const targetHeadRotX = -mouseY * 0.28;

  headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetHeadRotY, 0.08);
  headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetHeadRotX, 0.08);

  // Torso follows slightly for realism
  bodyGroup.rotation.y = THREE.MathUtils.lerp(bodyGroup.rotation.y, targetHeadRotY * 0.45, 0.06);

  // 6. Nodding Animation
  if (isNodding) {
    nodProgress += 0.12;
    headGroup.rotation.x += Math.sin(nodProgress) * 0.25;
    if (nodProgress >= Math.PI * 2) {
      isNodding = false;
      nodProgress = 0;
    }
  }

  // 7. 360 Spin Animation
  if (isSpinning) {
    spinProgress += 0.12;
    robotGroup.rotation.y += 0.24;
    if (spinProgress >= Math.PI * 2) {
      isSpinning = false;
      spinProgress = 0;
      robotGroup.rotation.y = 0;
    }
  }

  renderer.render(scene, camera);
}
