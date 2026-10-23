import { jsPDF } from 'jspdf';

export function downloadDilsathCV() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - (margin * 2);

  // Styling helpers
  const primaryColor = [15, 23, 42]; // Slate 900
  const secondaryColor = [37, 99, 235]; // Royal Blue
  const textColor = [51, 65, 85]; // Slate 700
  const lightGray = [148, 163, 184]; // Slate 400
  const darkGray = [30, 41, 59];

  let y = 18;

  // --- PAGE 1 HEADER ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SAHABDEEN MOHAMMED DILSATH', pageWidth / 2, y, { align: 'center' });

  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Full Stack Developer | React.js, Next.js, PHP, MySQL, REST APIs', pageWidth / 2, y, { align: 'center' });

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('Pottuvil, Sri Lanka  |  +94 76 870 0005  |  Mohmdlsth1129@gmail.com', pageWidth / 2, y, { align: 'center' });

  y += 4.5;
  doc.text('GitHub: github.com/Dilsath0512  |  Eastern Province, Sri Lanka', pageWidth / 2, y, { align: 'center' });

  y += 4;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  function renderSectionHeader(title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(title.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin + 40, y);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin + 40, y, pageWidth - margin, y);
    y += 5;
  }

  // --- PROFESSIONAL SUMMARY ---
  renderSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  const summaryText = "Sri Lanka-based Full Stack Developer with hands-on experience building useful web applications, business websites, and digital experiences across desktop and mobile devices. Proficient in React.js, Next.js, JavaScript, PHP, MySQL, and REST APIs, combining thoughtful UI design with reliable backend logic and relational database design. Currently completing final-year BSc (Hons) in Computing with Arden University with demonstrated capabilities in modern web engineering, application usability, and responsible AI integration.";
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y);
  y += (summaryLines.length * 4.2) + 4;

  // --- TECHNICAL SKILLS ---
  renderSectionHeader('Technical Competencies');
  const skills = [
    { label: 'Frontend Development', val: 'React.js, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS' },
    { label: 'Backend Development', val: 'PHP, REST APIs, Node.js, Express.js' },
    { label: 'Databases', val: 'MySQL, SQL, Relational Database Design' },
    { label: 'Tools and Deployment', val: 'Git, GitHub, Vercel, Netlify, Firebase' },
    { label: 'Additional Interests', val: 'AI Integration, Application Security, UI/UX Design' }
  ];

  skills.forEach(s => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(`${s.label}: `, margin, y);
    const labelWidth = doc.getTextWidth(`${s.label}: `);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const valLines = doc.splitTextToSize(s.val, contentWidth - labelWidth);
    doc.text(valLines, margin + labelWidth, y);
    y += (valLines.length * 4.2) + 0.8;
  });
  y += 4;

  // --- WORK EXPERIENCE ---
  renderSectionHeader('Work Experience');
  
  // Job 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Freelance Full Stack Developer', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('| Feb 2024 - Present', margin + 60, y);
  
  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('Self-Employed, Sri Lanka', margin, y);
  y += 4.5;

  const job1Points = [
    'Delivered 5+ full stack web applications end-to-end (planning, development, testing and deployment) using HTML5, CSS3, JavaScript, PHP, MySQL, React.js and Next.js',
    'Built responsive, user-friendly interfaces with React.js and Tailwind CSS, improving usability and client satisfaction across projects',
    'Designed and implemented database-driven systems for efficient, reliable data management',
    'Integrated REST APIs and AI services to connect application data and third-party services',
    'Deployed client websites to Netlify and Vercel',
    'Managed version control and collaborative workflows using Git and GitHub (github.com/Dilsath0512)',
    'Applied object-oriented programming and software engineering principles across academic and client projects'
  ];

  job1Points.forEach(pt => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('•', margin + 2, y);
    const ptLines = doc.splitTextToSize(pt, contentWidth - 6);
    doc.text(ptLines, margin + 6, y);
    y += (ptLines.length * 4) + 0.5;
  });

  y += 3;

  // Job 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Freelance Graphic Designer', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('| 2024 - Present', margin + 55, y);

  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('Self-Employed, Sri Lanka', margin, y);
  y += 4.5;

  const job2Points = [
    'Designed logos, posters, banners, invitations and social media content for 10+ clients',
    'Created branding and digital marketing assets tailored to each client\'s identity and target audience',
    'Delivered projects on time while managing multiple client requirements simultaneously'
  ];

  job2Points.forEach(pt => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('•', margin + 2, y);
    const ptLines = doc.splitTextToSize(pt, contentWidth - 6);
    doc.text(ptLines, margin + 6, y);
    y += (ptLines.length * 4) + 0.5;
  });

  // Footer Page 1
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('Page 1 of 2  •  Sahabdeen Mohammed Dilsath Resume', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // --- PAGE 2 ---
  doc.addPage();
  y = 18;

  // Header mini
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SAHABDEEN MOHAMMED DILSATH - PORTFOLIO & RESUME', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('+94 76 870 0005 | Mohmdlsth1129@gmail.com', pageWidth - margin, y, { align: 'right' });
  y += 3;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- PROJECTS ---
  renderSectionHeader('Featured Projects');

  // Project 1: StudyBuddy AI
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('StudyBuddy AI — Notes Summarizer & Quiz Engine (Working Prototype)', margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Live Demo: https://studybuddy-ai-eosin.vercel.app/ | Next.js, React 19, Tailwind CSS, Firebase', margin, y);
  y += 4.5;

  const proj1 = [
    'A study-focused application designed to help users organise learning materials and explore document summarisation and quiz-generation workflows',
    'Developed with Next.js (App Router) and React 19, using an in-memory document parsing engine and structured JSON schema output',
    'Implemented user authentication with Firebase (Google OAuth and email/password)',
    'Processes uploaded documents in memory using pdf-parse and mammoth, with no permanent storage of private files',
    'Includes multilingual support (English, Tamil, Sinhala), plain-text export of summaries, and quiz generation'
  ];
  proj1.forEach(pt => {
    doc.text('•', margin + 2, y);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const ptLines = doc.splitTextToSize(pt, contentWidth - 6);
    doc.text(ptLines, margin + 6, y);
    y += (ptLines.length * 3.8) + 0.4;
  });
  y += 2.5;

  // Project 2: LMR Directory
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Lawyers for Minority Rights (LMR) Directory (Working Prototype)', margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Live Prototype: https://slmc-lawyer.vercel.app/ | React.js, Tailwind CSS, Lucide Icons', margin, y);
  y += 4.5;

  const proj2 = [
    'A legal directory website concept designed to help users explore lawyer listings, filter by relevant criteria, and access legal assistance information',
    'Implemented multilingual interface (English, Tamil, Sinhala) with responsive layout and clean visual hierarchy',
    'Built searchable lawyer directory with multi-district filtering covering all 25 Sri Lankan administrative districts',
    'Designed lawyer registration and legal-aid enquiry workflows with profile previews and legal assistance forms'
  ];
  proj2.forEach(pt => {
    doc.text('•', margin + 2, y);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    const ptLines = doc.splitTextToSize(pt, contentWidth - 6);
    doc.text(ptLines, margin + 6, y);
    y += (ptLines.length * 3.8) + 0.4;
  });
  y += 2.5;

  // Project 3: Solace Villa
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Solace Family Villa — Hospitality Website (Live Demo)', margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Live Demo: https://solacefamliyvilla.netlify.app | React.js, Tailwind CSS, Responsive Design', margin, y);
  y += 4.5;
  const proj3 = [
    'A hospitality website concept showcasing accommodation, visual presentation, property information, and guest enquiry workflows',
    'Designed visual gallery, room showcase, amenities overview, and guest booking enquiry forms',
    'Deployed on Netlify with mobile-first responsive architecture and fluid navigation'
  ];
  proj3.forEach(pt => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('•', margin + 2, y);
    const ptLines = doc.splitTextToSize(pt, contentWidth - 6);
    doc.text(ptLines, margin + 6, y);
    y += (ptLines.length * 3.8) + 0.4;
  });
  y += 2.5;

  // Project 4: LMS
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('University Learning Management System (Academic Project)', margin, y);
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text('Academic Project | PHP, MySQL, JavaScript, HTML5, CSS3, Relational Database', margin, y);
  y += 4.5;
  const proj4 = [
    'An academic software project exploring student and faculty workflows, module management, timetable functionality, and relational database design',
    'Implemented role-based access control (Student, Lecturer, Admin) and normalized SQL schemas for academic records',
    'Built student registration, gradebook records, and course scheduling logic with responsive interfaces'
  ];
  proj4.forEach(pt => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('•', margin + 2, y);
    const ptLines = doc.splitTextToSize(pt, contentWidth - 6);
    doc.text(ptLines, margin + 6, y);
    y += (ptLines.length * 3.8) + 0.4;
  });
  y += 4;

  // --- EDUCATION ---
  renderSectionHeader('Education');
  const edu = [
    { title: 'Bachelor of Science (Hons), Computing', inst: 'Arden University', date: 'Final Year (Currently Pursuing)' },
    { title: 'International Higher Diploma, Computing', inst: 'Buckinghamshire New University', date: 'Completed May 2026' },
    { title: 'G.C.E. Advanced Level (A/L) Examination', inst: 'Ministry of Education, Sri Lanka', date: '2023' },
    { title: 'G.C.E. Ordinary Level (O/L) Examination', inst: 'Ministry of Education, Sri Lanka', date: '2018' }
  ];
  edu.forEach(e => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(e.title, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(` | ${e.inst}`, margin + doc.getTextWidth(e.title), y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text(e.date, pageWidth - margin, y, { align: 'right' });
    y += 4.5;
  });
  y += 3;

  // --- CERTIFICATIONS ---
  renderSectionHeader('Certifications');
  const certs = [
    { name: 'Certified LLM Security Professional (CLLMSP)', org: 'Red Team Leaders', date: 'Jun 2026' },
    { name: 'Certified API Hacking Junior (CAPIJ)', org: 'Security Guild', date: 'May 2026' },
    { name: 'Additional certifications in cybersecurity and application security', org: 'Defensive & Offensive AppSec', date: 'Active' }
  ];
  certs.forEach(c => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`• ${c.name}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(` - ${c.org}`, margin + doc.getTextWidth(`• ${c.name}`), y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text(c.date, pageWidth - margin, y, { align: 'right' });
    y += 4.5;
  });
  y += 3;

  // --- LANGUAGES ---
  renderSectionHeader('Languages');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text('English (Professional Working Proficiency)   •   Tamil (Native)   •   Sinhala (Basic)', margin, y);

  // Footer Page 2
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('Page 2 of 2  •  Sahabdeen Mohammed Dilsath Resume', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // Save PDF
  doc.save('Sahabdeen_Mohammed_Dilsath_Resume.pdf');
}
