import { DilluAI } from './dilluAI.js';
import { setupCustomProjectBuilder, showToast } from './customProject.js';
import { initThreeScene } from './threeScene.js';

// Initialize Dillu AI Copilot
const dillu = new DilluAI();

/* ==========================================================================
   REAL-TIME COLOMBO / SRI LANKA CLOCK
   ========================================================================== */
function initColomboClock() {
  const timeEl = document.getElementById('live-colombo-time');
  if (!timeEl) return;

  function update() {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      timeEl.textContent = `${formatter.format(now)} GMT+5:30 (LK)`;
    } catch {
      timeEl.textContent = 'GMT+5:30 (Sri Lanka)';
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   DYNAMIC MOUSE SPOTLIGHT (Radial illumination over cards)
   ========================================================================== */
function initMouseSpotlight() {
  const spotlight = document.getElementById('mouse-spotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    spotlight.style.transform = `translate(${mouseX - 300}px, ${mouseY - 300}px)`;
  });
}

/* ==========================================================================
   SUBTLE AMBIENT CANVAS PARTICLES
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 36), 35);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1.2 + 0.6
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   DYNAMIC EDITORIAL TYPING
   ========================================================================== */
function initDynamicTyping() {
  const el = document.getElementById('dynamic-typing');
  if (!el) return;

  const roles = [
    'React.js & Next.js Platforms',
    'Full-Stack Web Development',
    'Relational Databases & MySQL',
    'REST APIs & System Logic',
    'AI-Powered Web Features'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 85;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 35;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 300;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 220;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    links.forEach((l) => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${currentId}`) {
        l.classList.add('active');
      }
    });
  });

  // Mobile menu drawer toggle logic
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-start-btn, .mobile-cv-btn');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   PROJECT FILTERING TOOLBAR
   ========================================================================== */
function initProjectFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.browser-frame-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const showLmsArchToast = () => {
    showToast('University LMS: Relational MySQL schema, role-based access, student & faculty workflows.');
  };
  const lmsDetailsBtn = document.getElementById('lms-view-details');
  const lmsArchBtn = document.getElementById('lms-view-architecture');
  if (lmsDetailsBtn) lmsDetailsBtn.addEventListener('click', showLmsArchToast);
  if (lmsArchBtn) lmsArchBtn.addEventListener('click', showLmsArchToast);
}

/* ==========================================================================
   ARCHITECTURE CODE TERMINAL TABS & COPY
   ========================================================================== */
function initCodeTerminal() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const codeView = document.getElementById('architecture-code-view');
  const copyBtn = document.getElementById('copy-code-btn');
  if (!codeView) return;

  const codeSnippets = {
    parser: `// In-Memory Document Parser & Active-Recall Quiz Synthesis Engine
export async function parseDocumentStream(fileBuffer: ArrayBuffer, mimeType: string) {
  const extractedText = await extractCleanText(fileBuffer, mimeType);
  const quizPayload = await generateStructuredQuizzes(extractedText, {
    maxItems: 10,
    schemaVersion: '2.0-verified',
    strictValidation: true
  });
  return quizPayload;
}`,
    sql: `-- Relational Schema Architecture: University LMS Module System
CREATE TABLE \`users\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`user_uuid\` CHAR(36) NOT NULL UNIQUE,
  \`email\` VARCHAR(255) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('student', 'lecturer', 'administrator') NOT NULL DEFAULT 'student',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_user_role\` (\`role\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`course_modules\` (
  \`module_id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`code\` VARCHAR(16) NOT NULL UNIQUE,
  \`title\` VARCHAR(255) NOT NULL,
  \`lecturer_id\` INT UNSIGNED NOT NULL,
  \`credits\` TINYINT UNSIGNED NOT NULL DEFAULT 15,
  FOREIGN KEY (\`lecturer_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT,
  INDEX \`idx_module_code\` (\`code\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
    db: `-- Relational Schema Architecture: University LMS Module System
CREATE TABLE \`users\` (
  \`id\` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  \`user_uuid\` CHAR(36) NOT NULL UNIQUE,
  \`email\` VARCHAR(255) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('student', 'lecturer', 'administrator') NOT NULL DEFAULT 'student',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_user_role\` (\`role\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
    auth: `// Session Guard & Role-Based Authorization Middleware
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/firebase-admin';

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('__session')?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    const decodedUser = await verifyAuthToken(sessionToken);
    
    // RBAC: Verify required role clearance
    if (req.nextUrl.pathname.startsWith('/admin') && decodedUser.role !== 'administrator') {
      return NextResponse.json({ error: 'Access forbidden: Insufficient privileges' }, { status: 403 });
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login?expired=1', req.url));
  }
}`
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-tab');
      if (codeSnippets[key]) {
        codeView.querySelector('code').textContent = codeSnippets[key];
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = codeView.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        showToast('Code snippet copied to clipboard.');
      });
    });
  }
}

/* ==========================================================================
   RESUME DIRECT PDF DOWNLOAD
   ========================================================================== */
export function downloadResumePDF() {
  const link = document.createElement('a');
  link.href = '/Sahabdeen_Mohammed_Dilsath_CV.pdf';
  link.download = 'Sahabdeen_Mohammed_Dilsath_CV.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Downloading resume PDF...');
}

function initCVDownload() {
  const cvButtons = document.querySelectorAll('#open-cv-btn, .nav-mobile-cv-btn, .mobile-cv-btn');
  cvButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast('Downloading resume PDF...');
    });
  });
}

/* ==========================================================================
   DILLU AI COPILOT INTERACTION
   ========================================================================== */
function initDilluCopilot() {
  const toggleBtn = document.getElementById('dillu-toggle-btn');
  const navDilluBtn = document.getElementById('nav-dillu-btn');
  const closeBtn = document.getElementById('dillu-close-btn');
  const drawer = document.getElementById('dillu-drawer');
  const form = document.getElementById('dillu-form');
  const input = document.getElementById('dillu-input');
  const messagesContainer = document.getElementById('dillu-messages');
  const voiceToggle = document.getElementById('dillu-voice-toggle');
  const suggestionPills = document.querySelectorAll('.suggestion-pill');

  function openDrawer() {
    drawer.classList.add('open');
    if (window.innerWidth > 768) {
      setTimeout(() => {
        input.focus();
      }, 150);
    }
  }

  function closeDrawer() {
    drawer.classList.remove('open');
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (navDilluBtn) navDilluBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  voiceToggle.addEventListener('click', () => {
    dillu.speechEnabled = !dillu.speechEnabled;
    voiceToggle.classList.toggle('active', dillu.speechEnabled);
    showToast(`Voice synthesis ${dillu.speechEnabled ? 'activated' : 'muted'}.`);
    if (dillu.speechEnabled) {
      dillu.speakText("Voice readout active.");
    } else {
      window.speechSynthesis?.cancel();
    }
  });

  suggestionPills.forEach((p) => {
    p.addEventListener('click', () => {
      const prompt = p.getAttribute('data-prompt');
      handleUserQuery(prompt);
    });
  });

  messagesContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.chat-chip');
    if (!chip) return;

    const query = chip.getAttribute('data-query');
    const trigger = chip.getAttribute('data-trigger');
    const url = chip.getAttribute('data-url');

    if (url) {
      window.open(url, '_blank');
      return;
    }

    if (trigger === 'open-project-builder') {
      closeDrawer();
      document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (trigger === 'open-cv-modal' || trigger === 'download-cv') {
      downloadResumePDF();
      return;
    }

    if (trigger === 'query-projects') {
      handleUserQuery('Show me his key projects');
      return;
    }

    if (query) {
      handleUserQuery(query);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUserQuery(text);
  });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function appendUserBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.innerHTML = `<span class="bubble-user-badge">You</span><div class="bubble-user-text">${escapeHtml(text)}</div>`;
    messagesContainer.appendChild(bubble);
    bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function appendBotBubble(htmlReply, actions = []) {
    const typingElem = document.createElement('div');
    typingElem.className = 'chat-bubble bot';
    typingElem.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
    messagesContainer.appendChild(typingElem);
    typingElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => {
      typingElem.remove();
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot';
      botBubble.innerHTML = htmlReply;

      if (actions && actions.length > 0) {
        const chipsContainer = document.createElement('div');
        chipsContainer.className = 'chat-action-chips';
        actions.forEach((act) => {
          const chip = document.createElement('span');
          chip.className = 'chat-chip';
          chip.textContent = act.label;
          if (act.trigger) chip.setAttribute('data-trigger', act.trigger);
          if (act.url) chip.setAttribute('data-url', act.url);
          chipsContainer.appendChild(chip);
        });
        botBubble.appendChild(chipsContainer);
      }

      messagesContainer.appendChild(botBubble);
      botBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      dillu.speakText(htmlReply);
    }, 320);
  }

  function handleUserQuery(text) {
    appendUserBubble(text);
    const result = dillu.processQuery(text);
    appendBotBubble(result.reply, result.actions);
  }
}

/* ==========================================================================
   INTERACTIVE 3D PERSPECTIVE TILT ON PORTRAIT CARD
   ========================================================================== */
function initPortrait3DTilt() {
  const frame = document.getElementById('portrait-frame');
  if (!frame) return;

  frame.addEventListener('mousemove', (e) => {
    const bounds = frame.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    frame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
  });

  frame.addEventListener('mouseleave', () => {
    frame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

/* ==========================================================================
   FAQ ACCORDIONS
   ========================================================================== */
function initFAQAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach((i) => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   DIRECT CONTACT FORM
   ========================================================================== */
function initDirectContactForm() {
  const form = document.getElementById('direct-message-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-msg').value.trim();

    const waText = encodeURIComponent(
      `Hello Dilsath, inquiry from ${name} (${email}):\n${msg}`
    );
    const waUrl = `https://wa.me/94768700005?text=${waText}`;

    showToast(`Inquiry captured. Opening WhatsApp channel.`);
    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 600);
  });
}

/* ==========================================================================
   INITIALIZATION LIFECYCLE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initColomboClock();
  initMouseSpotlight();
  initAmbientCanvas();
  initThreeScene();
  initDynamicTyping();
  initPortrait3DTilt();
  initNavbar();
  initProjectFilters();
  initCodeTerminal();
  initCVDownload();
  initDilluCopilot();
  setupCustomProjectBuilder();
  initFAQAccordions();
  initDirectContactForm();
});
