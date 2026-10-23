// Custom Project Scope Configurator & Dispatcher

export function setupCustomProjectBuilder() {
  const form = document.getElementById('custom-project-form');
  if (!form) return;

  const projectTypeSelect = document.getElementById('project-type');
  const timelineSelect = document.getElementById('project-timeline');
  const summaryBox = document.getElementById('project-scope-summary');
  const checkboxes = form.querySelectorAll('input[name="feature"]');
  const clientNameInput = document.getElementById('client-name');
  const clientNotesInput = document.getElementById('client-notes');
  const whatsappBtn = document.getElementById('send-custom-whatsapp');
  const emailBtn = document.getElementById('send-custom-email');

  function updateEstimate() {
    const selectedType = projectTypeSelect.value;
    const selectedTimeline = timelineSelect.value;
    const selectedFeatures = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    let baseDelivery = '2 — 4 Weeks';

    if (selectedTimeline === 'express') {
      baseDelivery = '1 — 2 Weeks (Fast-Track Sprint)';
    } else if (selectedTimeline === 'comprehensive') {
      baseDelivery = '1 — 2 Months (Comprehensive Project)';
    } else if (selectedTimeline === 'flexible') {
      baseDelivery = 'Flexible / Planning Phase';
    }

    if (summaryBox) {
      summaryBox.innerHTML = `
        <div class="summary-badge-row">
          <span class="summary-pill">Project Type: <strong>${selectedType}</strong></span>
          <span class="summary-pill">Target Timeline: <strong>${baseDelivery}</strong></span>
        </div>
        <div class="summary-features-list">
          <strong>Selected Features (${selectedFeatures.length}):</strong>
          <span>${selectedFeatures.length > 0 ? selectedFeatures.join(' • ') : 'Core Features'}</span>
        </div>
        <div class="summary-guarantee">
          A customized proposal and quotation will be prepared based on these requirements.
        </div>
      `;
    }
  }

  // Bind change events
  projectTypeSelect.addEventListener('change', updateEstimate);
  timelineSelect.addEventListener('change', updateEstimate);
  checkboxes.forEach(cb => cb.addEventListener('change', updateEstimate));
  updateEstimate();

  function buildMessagePayload() {
    const name = clientNameInput.value.trim() || 'Prospective Client';
    const type = projectTypeSelect.value;
    const timeline = timelineSelect.options[timelineSelect.selectedIndex].text;
    const features = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value)
      .join(', ') || 'Standard Features';
    const notes = clientNotesInput.value.trim() || 'No additional details provided.';

    const message = `Hello Dilsath, I would like to discuss a project enquiry from your portfolio:

*Client / Organisation:* ${name}
*Project Type:* ${type}
*Preferred Timeline:* ${timeline}
*Required Features:* ${features}
*Project Description:* ${notes}

Looking forward to discussing the approach and quotation.`;

    return { name, type, timeline, features, notes, message };
  }

  // WhatsApp Dispatcher
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const payload = buildMessagePayload();
      const waUrl = `https://wa.me/94768700005?text=${encodeURIComponent(payload.message)}`;
      window.open(waUrl, '_blank');
      showToast('Opening WhatsApp with your project specifications.');
    });
  }

  // Email Dispatcher
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const payload = buildMessagePayload();
      const subject = encodeURIComponent(`Project Enquiry: ${payload.type} — ${payload.name}`);
      const body = encodeURIComponent(payload.message);
      window.location.href = `mailto:Mohmdlsth1129@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening email client with your project enquiry.');
    });
  }
}

export function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `<span class="toast-dot"></span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
