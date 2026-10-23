// Dillu AI Copilot — Virtual Technical Assistant for Sahabdeen Mohammed Dilsath

export class DilluAI {
  constructor() {
    this.name = 'Dillu';
    this.speechEnabled = false;
    this.soundEnabled = false; // Muted by default for clean professional experience
    this.knowledgeBase = {
      name: 'Sahabdeen Mohammed Dilsath',
      role: 'Full Stack Developer · AI Integration',
      location: 'Pottuvil, Sri Lanka',
      phone: '+94 76 870 0005',
      whatsapp: 'https://wa.me/94768700005',
      github: 'https://github.com/Dilsath0512',
      techStack: {
        frontend: ['React.js', 'Next.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
        backend: ['PHP', 'REST APIs', 'Node.js', 'Express.js'],
        databases: ['MySQL', 'SQL', 'Relational Database Design'],
        tools: ['Git', 'GitHub', 'Vercel', 'Netlify', 'Firebase'],
        interests: ['AI Integration', 'Application Security', 'UI/UX Design']
      },
      projects: [
        {
          id: 'studybuddy',
          title: 'StudyBuddy AI — Notes Summarizer & Quiz Engine',
          status: 'Working Prototype',
          url: 'https://studybuddy-ai-eosin.vercel.app/',
          desc: 'A study-focused application designed to help users organise learning materials and explore document summarisation and quiz-generation workflows.'
        },
        {
          id: 'lmr',
          title: 'Lawyers for Minority Rights (LMR) Directory',
          status: 'Working Prototype',
          url: 'https://slmc-lawyer.vercel.app/',
          desc: 'A legal directory website concept designed to help users explore lawyer listings, filter by relevant criteria, and access legal assistance information.'
        },
        {
          id: 'solace',
          title: 'Solace Family Villa — Hospitality Website',
          status: 'Live Demo',
          url: 'https://solacefamliyvilla.netlify.app',
          desc: 'A hospitality website concept showcasing accommodation, visual presentation, property information, and guest enquiry workflows.'
        },
        {
          id: 'lms',
          title: 'University Learning Management System',
          status: 'Academic Project',
          url: '#',
          desc: 'An academic software project exploring student and faculty workflows, module management, timetable functionality, and relational database design.'
        }
      ],
      education: [
        'BSc (Hons) in Computing — Final-Year Undergraduate (Arden University)',
        'International Higher Diploma in Computing — Completed May 2026 (Buckinghamshire New University)',
        'G.C.E. Advanced Level (A/L) — 2023',
        'G.C.E. Ordinary Level (O/L) — 2018'
      ],
      certifications: [
        'Certified LLM Security Professional (CLLMSP) — Red Team Leaders (Jun 2026)',
        'Certified API Hacking Junior (CAPIJ) — Security Guild (May 2026)'
      ]
    };
  }

  // Play subtle feedback click if enabled
  playAudioBeep(freq = 520, duration = 0.05) {
    if (!this.soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context restricted
    }
  }

  // Text-to-speech synthesis
  speakText(text) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  // Query Processor
  processQuery(userInput) {
    const q = userInput.toLowerCase().trim();
    this.playAudioBeep(520, 0.05);

    // 1. Greetings
    if (this.matches(q, ['hi', 'hello', 'hey', 'vanakkam', 'halo', 'dillu', 'who are you', 'how are you', 'epdi irukka'])) {
      return {
        reply: `Hello, I am <strong>Dillu</strong>, the AI technical copilot for <strong>Sahabdeen Mohammed Dilsath (SMD)</strong>.<br><br>
        I can provide detailed insight into his production web applications, technical stack (Next.js, React, PHP, MySQL, AI Integrations), security certifications, academic credentials, and bespoke development services. How may I assist you?`,
        actions: [
          { label: 'Explore Projects', trigger: 'query-projects' },
          { label: 'Custom Development Services', trigger: 'open-project-builder' },
          { label: 'Download Resume (PDF)', trigger: 'download-cv' }
        ]
      };
    }

    // 1b. About Dilsath / Identity
    if (this.matches(q, ['who is', 'about dilsath', 'about smd', 'sahabdeen', 'dilsath', 'profile', 'bio', 'who are they', 'background'])) {
      return {
        reply: `<strong>Sahabdeen Mohammed Dilsath (SMD)</strong> is a Sri Lanka-based full-stack developer who enjoys building useful web applications, business websites, and digital experiences.<br><br>
        He combines frontend development, backend logic, relational database design, and API integration with practical UI design, working with React, Next.js, JavaScript, PHP, and MySQL.<br><br>
        He is currently completing his final year of <strong>BSc (Hons) in Computing</strong> with Arden University and holds certifications in LLM Security (CLLMSP) and API Hacking (CAPIJ).`,
        actions: [
          { label: 'Explore Projects', trigger: 'query-projects' },
          { label: 'Download CV (PDF)', trigger: 'download-cv' },
          { label: 'Start a Project', trigger: 'open-project-builder' },
          { label: 'Direct WhatsApp', url: 'https://wa.me/94768700005' }
        ]
      };
    }

    // 2. Custom Development Services / Bespoke solutions
    if (this.matches(q, ['custom', 'hire', 'build', 'order', 'freelance', 'work together', 'project senji', 'service', 'contract', 'rate', 'cost'])) {
      return {
        reply: `<strong>Services & Expertise:</strong><br><br>
        Dilsath helps businesses and individuals turn ideas into functional, well-designed digital products:
        <ul>
          <li><strong>Website & Frontend Development</strong> — Responsive websites and user interfaces with modern layouts, clear navigation, and consistent experiences across devices.</li>
          <li><strong>Full-Stack Web Applications</strong> — Web applications that connect frontend interfaces with backend logic, databases, authentication, and REST APIs.</li>
          <li><strong>Database & Business Systems</strong> — Relational databases and practical management systems tailored to business workflows (CRUD, RBAC).</li>
          <li><strong>AI Integration & UI Design</strong> — AI-powered features and polished interfaces that make digital products more useful and intuitive.</li>
        </ul>
        Use the on-page studio to specify your requirements and get in touch:`,
        actions: [
          { label: 'Open Project Studio', trigger: 'open-project-builder' },
          { label: 'Direct WhatsApp Discussion', url: 'https://wa.me/94768700005?text=Hello%20Dilsath,%20I%20would%20like%20to%20discuss%20a%20project.' }
        ]
      };
    }

    // 3. Featured Projects
    if (this.matches(q, ['project', 'work', 'studybuddy', 'lmr', 'solace', 'lms', 'portfolio work', 'show projects'])) {
      return {
        reply: `<strong>Selected Projects:</strong><br><br>
        1. <strong>StudyBuddy AI — Notes Summarizer & Quiz Engine</strong> (Working Prototype) — Study-focused application exploring document summarisation and quiz-generation workflows.<br>
        2. <strong>Lawyers for Minority Rights (LMR) Directory</strong> (Working Prototype) — Multilingual legal directory concept covering all 25 districts of Sri Lanka.<br>
        3. <strong>Solace Family Villa — Hospitality Website</strong> (Live Demo) — Hospitality website showcasing accommodation, visual presentation, and guest enquiry workflows.<br>
        4. <strong>University Learning Management System</strong> (Academic Project) — Academic software project exploring student/faculty workflows, module management, and relational database design.`,
        actions: [
          { label: 'StudyBuddy AI Live', url: 'https://studybuddy-ai-eosin.vercel.app/' },
          { label: 'LMR Directory Live', url: 'https://slmc-lawyer.vercel.app/' },
          { label: 'Solace Villa Live', url: 'https://solacefamliyvilla.netlify.app' }
        ]
      };
    }

    // 4. Contact Details & Location
    if (this.matches(q, ['contact', 'phone', 'number', 'whatsapp', 'email', 'location', 'address', 'reach', 'sri lanka', 'pottuvil'])) {
      return {
        reply: `<strong>Direct Contact Channels:</strong><br><br>
        • <strong>Location:</strong> Sri Lanka (Available for Worldwide Remote Work)<br>
        • <strong>WhatsApp & Tel:</strong> <a href="https://wa.me/94768700005" target="_blank" class="chat-inline-link">+94 76 870 0005</a><br>
        • <strong>Email:</strong> <a href="mailto:Mohmdlsth1129@gmail.com" class="chat-inline-link">Mohmdlsth1129@gmail.com</a><br>
        • <strong>GitHub:</strong> <a href="https://github.com/Dilsath0512" target="_blank" class="chat-inline-link">github.com/Dilsath0512</a><br>
        • <strong>Status:</strong> Available for Bespoke Web & AI Development Contracts`,
        actions: [
          { label: 'WhatsApp Chat', url: 'https://wa.me/94768700005' },
          { label: 'Send Email', url: 'mailto:Mohmdlsth1129@gmail.com' }
        ]
      };
    }

    // 5. Technical Stack
    if (this.matches(q, ['skill', 'tech', 'stack', 'technologies', 'react', 'next', 'php', 'mysql', 'ai', 'database'])) {
      return {
        reply: `<strong>Technical Competencies:</strong><br><br>
        • <strong>Frontend Development:</strong> React.js, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS<br>
        • <strong>Backend Development:</strong> PHP, REST APIs, Node.js, Express.js<br>
        • <strong>Databases:</strong> MySQL, SQL, Relational Database Design<br>
        • <strong>Tools and Deployment:</strong> Git, GitHub, Vercel, Netlify, Firebase<br>
        • <strong>Additional Interests:</strong> AI Integration, Application Security, UI/UX Design`,
        actions: [
          { label: 'Download CV (PDF)', trigger: 'download-cv' },
          { label: 'Start a Project', trigger: 'open-project-builder' }
        ]
      };
    }

    // 6. Resume / CV
    if (this.matches(q, ['cv', 'resume', 'pdf', 'download cv', 'download resume'])) {
      return {
        reply: `<strong>Curriculum Vitae:</strong><br><br>
        You can directly download Dilsath's verified resume PDF using the button below.`,
        actions: [
          { label: 'Download CV (PDF)', trigger: 'download-cv' }
        ]
      };
    }

    // 7. Education
    if (this.matches(q, ['education', 'degree', 'university', 'arden', 'buckinghamshire', 'al', 'ol', 'study'])) {
      return {
        reply: `<strong>Academic Background:</strong><br><br>
        • <strong>Bachelor of Science (Hons) in Computing</strong><br>
        &nbsp;&nbsp;Arden University (Final Year — Currently Pursuing)<br><br>
        • <strong>International Higher Diploma in Computing</strong><br>
        &nbsp;&nbsp;Buckinghamshire New University (Completed May 2026)<br><br>
        • <strong>G.C.E. Advanced Level (A/L)</strong> — 2023<br>
        • <strong>G.C.E. Ordinary Level (O/L)</strong> — 2018`,
        actions: [
          { label: 'Download CV (PDF)', trigger: 'download-cv' }
        ]
      };
    }

    // 8. Certifications
    if (this.matches(q, ['certification', 'certificate', 'cllmsp', 'capij', 'security', 'hacking'])) {
      return {
        reply: `<strong>Professional Security Certifications:</strong><br><br>
        • <strong>Certified LLM Security Professional (CLLMSP)</strong><br>
        &nbsp;&nbsp;Red Team Leaders (Jun 2026) — Specializing in Prompt Injection Defense, Jailbreak Mitigation, and AI Pipeline Hardening.<br><br>
        • <strong>Certified API Hacking Junior (CAPIJ)</strong><br>
        &nbsp;&nbsp;Security Guild (May 2026) — REST API Vulnerability Assessment and Secure Architecture.`,
        actions: [
          { label: 'Download CV (PDF)', trigger: 'download-cv' }
        ]
      };
    }

    // Default Fallback
    return {
      reply: `I understand you are inquiring about: "<em>${userInput}</em>".<br><br>
      Dilsath is available for full-stack engineering contracts, AI solution architecture, and custom application development. All deliverables are built to strict technical standards and client specifications.<br><br>
      Please select an option below or ask any technical query:`,
      actions: [
        { label: 'Custom Scope Configurator', trigger: 'open-project-builder' },
        { label: 'View Portfolio Work', trigger: 'query-projects' },
        { label: 'Direct WhatsApp Contact', url: 'https://wa.me/94768700005' },
        { label: 'Download Resume (PDF)', trigger: 'download-cv' }
      ]
    };
  }

  matches(text, keywords) {
    return keywords.some(kw => text.includes(kw));
  }
}
