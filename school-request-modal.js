class SchoolRequestModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 100;
        }
        
        :host([open]) {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          animation: fadeIn 0.2s ease;
        }

        .modal-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 1rem;
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        .dark .modal-container {
          background: #1e293b;
          color: #f8fafc;
        }

        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dark .modal-header {
          border-color: #334155;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .close-btn {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.75rem;
          border: none;
          background: #f1f5f9;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          color: #64748b;
        }

        .dark .close-btn {
          background: #334155;
          color: #94a3b8;
        }

        .close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .dark .close-btn:hover {
          background: #475569;
          color: #f8fafc;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .dark .form-label {
          color: #e2e8f0;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          background: white;
          color: #0f172a;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .dark .form-input,
        .dark .form-textarea,
        .dark .form-select {
          background: #0f172a;
          border-color: #334155;
          color: #f8fafc;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-select {
          cursor: pointer;
        }

        .form-hint {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.375rem;
        }

        .dark .form-hint {
          color: #94a3b8;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-state {
          text-align: center;
          padding: 2rem;
        }

        .success-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: #d1fae5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .dark .success-icon {
          background: #065f46;
          color: #6ee7b7;
        }

        .success-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #0f172a;
        }

        .dark .success-title {
          color: #f8fafc;
        }

        .success-message {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .dark .success-message {
          color: #94a3b8;
        }

        .close-success-btn {
          padding: 0.75rem 2rem;
          background: #f1f5f9;
          color: #374151;
          font-weight: 600;
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .dark .close-success-btn {
          background: #334155;
          color: #e2e8f0;
        }

        .close-success-btn:hover {
          background: #e2e8f0;
        }

        .dark .close-success-btn:hover {
          background: #475569;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .optional-badge {
          font-size: 0.75rem;
          color: #9ca3af;
          font-weight: 500;
        }
      </style>

      <div class="modal-overlay" id="overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Request to Add School
          </h3>
          <button class="close-btn" id="closeBtn" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body" id="formContainer">
          <form id="requestForm">
            <div class="form-group">
              <label class="form-label" for="schoolName">School Name *</label>
              <input type="text" class="form-input" id="schoolName" name="schoolName" placeholder="e.g., University of Texas at Austin" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="schoolLocation">Location *</label>
              <input type="text" class="form-input" id="schoolLocation" name="schoolLocation" placeholder="e.g., Austin, TX" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">Your Email *</label>
              <input type="email" class="form-input" id="email" name="email" placeholder="you@example.com" required>
              <p class="form-hint">We'll notify you when your school is added</p>
            </div>

            <div class="form-group">
              <label class="form-label" for="enrollment">
                Approximate Enrollment <span class="optional-badge">(optional)</span>
              </label>
              <select class="form-select" id="enrollment" name="enrollment">
                <option value="">Select enrollment size...</option>
                <option value="small">Small (&lt; 5,000 students)</option>
                <option value="medium">Medium (5,000 - 15,000 students)</option>
                <option value="large">Large (15,000 - 30,000 students)</option>
                <option value="xlarge">Extra Large (&gt; 30,000 students)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="message">
                Additional Information <span class="optional-badge">(optional)</span>
              </label>
              <textarea class="form-textarea" id="message" name="message" placeholder="Tell us more about your school, popular courses, or any specific textbooks you need..."></textarea>
            </div>

            <button type="submit" class="submit-btn" id="submitBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Submit Request
            </button>
          </form>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const overlay = this.shadowRoot.getElementById('overlay');
    const closeBtn = this.shadowRoot.getElementById('closeBtn');
    const form = this.shadowRoot.getElementById('requestForm');
    const submitBtn = this.shadowRoot.getElementById('submitBtn');

    overlay.addEventListener('click', () => this.close());
    closeBtn.addEventListener('click', () => this.close());

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"></circle>
        </svg>
        Submitting...
      `;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success state
      const container = this.shadowRoot.getElementById('formContainer');
      container.innerHTML = `
        <div class="success-state">
          <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4 class="success-title">Request Submitted!</h4>
          <p class="success-message">
            Thanks for your interest! We'll review your request and notify you at <strong>${data.email}</strong> when ${data.schoolName} is added.
          </p>
          <button class="close-success-btn" id="closeSuccessBtn">Close</button>
        </div>
        
        <style>
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        </style>
      `;

      container.querySelector('#closeSuccessBtn').addEventListener('click', () => this.close());

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Submit Request
        `;
      }, 1000);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.hasAttribute('open')) {
        this.close();
      }
    });
  }

  open() {
    this.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.removeAttribute('open');
    document.body.style.overflow = '';
  }
}

customElements.define('school-request-modal', SchoolRequestModal);