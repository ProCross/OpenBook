class LoginModal extends HTMLElement {
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
          max-width: 420px;
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
          position: relative;
          padding: 1.5rem;
          padding-right: 4rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
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
          min-width: 0;
          padding-right: 0.5rem;
        }

        .close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
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
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          -webkit-appearance: none;
          appearance: none;
        }

        .dark .close-btn {
          background: #334155;
          color: #94a3b8;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        .close-btn:hover {
          background: #e2e8f0;
          color: #334155;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .dark .close-btn:hover {
          background: #475569;
          color: #f8fafc;
        }

        .close-btn:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }

        .close-btn:active {
          transform: scale(0.96);
        }

        .close-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
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

        .form-input {
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

        .dark .form-input {
          background: #0f172a;
          border-color: #334155;
          color: #f8fafc;
        }

        .form-input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .input-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dark .password-toggle {
          color: #94a3b8;
        }

        .password-toggle:hover {
          color: #0f172a;
        }

        .dark .password-toggle:hover {
          color: #f8fafc;
        }

        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
          cursor: pointer;
        }

        .dark .remember-me {
          color: #e2e8f0;
        }

        .remember-me input[type="checkbox"] {
          width: 1rem;
          height: 1rem;
          accent-color: #10b981;
          cursor: pointer;
        }

        .forgot-link {
          font-size: 0.875rem;
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .dark .forgot-link {
          color: #34d399;
        }

        .forgot-link:hover {
          color: #059669;
          text-decoration: underline;
        }

        .dark .forgot-link:hover {
          color: #6ee7b7;
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
          margin-bottom: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .dark .divider::before,
        .dark .divider::after {
          background: #334155;
        }

        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .social-btn {
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 0.75rem;
          background: white;
          color: #374151;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .dark .social-btn {
          background: #0f172a;
          border-color: #334155;
          color: #e2e8f0;
        }

        .social-btn:hover {
          border-color: #10b981;
          background: #f0fdf4;
        }

        .dark .social-btn:hover {
          background: #064e3b;
          border-color: #10b981;
        }

        .signup-prompt {
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .dark .signup-prompt {
          color: #94a3b8;
        }

        .signup-link {
          color: #10b981;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }

        .dark .signup-link {
          color: #34d399;
        }

        .signup-link:hover {
          color: #059669;
          text-decoration: underline;
        }

        .dark .signup-link:hover {
          color: #6ee7b7;
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

        .error-message {
          color: #dc2626;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          display: none;
        }

        .dark .error-message {
          color: #f87171;
        }

        .error-message.show {
          display: block;
        }

        .input-error {
          border-color: #dc2626 !important;
        }

        .dark .input-error {
          border-color: #f87171 !important;
        }
      </style>

      <div class="modal-overlay" id="overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Welcome Back
          </h3>
          <button class="close-btn" id="closeBtn" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body" id="formContainer">
          <form id="loginForm">
            <div class="form-group">
              <label class="form-label" for="username">Email or Username *</label>
              <input type="text" class="form-input" id="username" name="username" placeholder="you@example.com" required>
              <div class="error-message" id="usernameError">Please enter a valid email or username</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="password">Password *</label>
              <div class="input-wrapper">
                <input type="password" class="form-input" id="password" name="password" placeholder="Enter your password" required>
                <button type="button" class="password-toggle" id="togglePassword" aria-label="Toggle password visibility">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="eyeIcon">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <div class="error-message" id="passwordError">Please enter your password</div>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" name="remember" id="rememberMe">
                <span>Remember me</span>
              </label>
              <a href="#" class="forgot-link" id="forgotLink">Forgot password?</a>
            </div>

            <button type="submit" class="submit-btn" id="submitBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Sign In
            </button>
          </form>

          <div class="divider">or continue with</div>

          <div class="social-login">
            <button type="button" class="social-btn" id="googleBtn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" class="social-btn" id="appleBtn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          <div class="signup-prompt">
            Don't have an account? <a href="#" class="signup-link" id="signupLink">Sign up free</a>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const overlay = this.shadowRoot.getElementById('overlay');
    const closeBtn = this.shadowRoot.getElementById('closeBtn');
    const form = this.shadowRoot.getElementById('loginForm');
    const submitBtn = this.shadowRoot.getElementById('submitBtn');
    const togglePassword = this.shadowRoot.getElementById('togglePassword');
    const passwordInput = this.shadowRoot.getElementById('password');
    const forgotLink = this.shadowRoot.getElementById('forgotLink');
    const signupLink = this.shadowRoot.getElementById('signupLink');
    const googleBtn = this.shadowRoot.getElementById('googleBtn');
    const appleBtn = this.shadowRoot.getElementById('appleBtn');

    // Close modal
    overlay.addEventListener('click', () => this.close());
    closeBtn.addEventListener('click', () => this.close());

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Update icon
      const eyeIcon = this.shadowRoot.getElementById('eyeIcon');
      if (type === 'text') {
        eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
      } else {
        eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `;
      }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = this.shadowRoot.getElementById('username').value.trim();
      const password = this.shadowRoot.getElementById('password').value;
      const rememberMe = this.shadowRoot.getElementById('rememberMe').checked;
      
      // Reset errors
      this.shadowRoot.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
      this.shadowRoot.querySelectorAll('.form-input').forEach(el => el.classList.remove('input-error'));
      
      let hasError = false;
      
      if (!username) {
        this.shadowRoot.getElementById('usernameError').classList.add('show');
        this.shadowRoot.getElementById('username').classList.add('input-error');
        hasError = true;
      }
      
      if (!password) {
        this.shadowRoot.getElementById('passwordError').classList.add('show');
        this.shadowRoot.getElementById('password').classList.add('input-error');
        hasError = true;
      }
      
      if (hasError) return;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"></circle>
        </svg>
        Signing in...
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
          <h4 class="success-title">Welcome back!</h4>
          <p class="success-message">
            You have successfully signed in as <strong>${username}</strong>.
          </p>
          <button class="close-success-btn" id="closeSuccessBtn">Continue</button>
        </div>
        
        <style>
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        </style>
      `;

      // Store login state if remember me is checked
      if (rememberMe) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('username', username);
      }

      container.querySelector('#closeSuccessBtn').addEventListener('click', () => {
        this.close();
        // Dispatch custom event for parent to handle
        window.dispatchEvent(new CustomEvent('userLoggedIn', { 
          detail: { username, rememberMe } 
        }));
      });

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Sign In
        `;
      }, 1000);
    });

    // Forgot password
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.showForgotPassword();
    });

    // Sign up link
    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
      // Dispatch event to open signup modal or navigate
      window.dispatchEvent(new CustomEvent('openSignup'));
    });

    // Social login (demo)
    googleBtn.addEventListener('click', () => {
      this.showSocialLogin('Google');
    });

    appleBtn.addEventListener('click', () => {
      this.showSocialLogin('Apple');
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.hasAttribute('open')) {
        this.close();
      }
    });
  }

  showForgotPassword() {
    const container = this.shadowRoot.getElementById('formContainer');
    container.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="width: 4rem; height: 4rem; border-radius: 50%; background: #f1f5f9; color: #059669; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;">Reset Password</h4>
        <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem;">Enter your email and we'll send you a link to reset your password.</p>
        
        <form id="resetForm">
          <div style="margin-bottom: 1rem;">
            <input type="email" id="resetEmail" placeholder="you@example.com" required style="width: 100%; padding: 0.75rem 1rem; border: 2px solid #e2e8f0; border-radius: 0.75rem; font-size: 0.875rem; background: white; color: #0f172a; box-sizing: border-box;">
          </div>
          <button type="submit" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; font-weight: 700; font-size: 1rem; border: none; border-radius: 1rem; cursor: pointer; margin-bottom: 1rem;">
            Send Reset Link
          </button>
        </form>
        
        <button id="backToLogin" style="background: none; border: none; color: #10b981; font-weight: 600; cursor: pointer; font-size: 0.875rem;">
          ← Back to login
        </button>
      </div>
    `;

    // Handle reset form
    container.querySelector('#resetForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = container.querySelector('#resetEmail').value;
      
      // Simulate sending reset email
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
          <div style="width: 4rem; height: 4rem; border-radius: 50%; background: #d1fae5; color: #059669; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Check your email!</h4>
          <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem;">We've sent a password reset link to <strong>${email}</strong></p>
          <button id="closeReset" style="padding: 0.75rem 2rem; background: #f1f5f9; color: #374151; font-weight: 600; border: none; border-radius: 0.75rem; cursor: pointer;">Close</button>
        </div>
      `;
      
      container.querySelector('#closeReset').addEventListener('click', () => this.close());
    });

    container.querySelector('#backToLogin').addEventListener('click', () => {
      this.render();
      this.setupEventListeners();
    });
  }

  showSocialLogin(provider) {
    const container = this.shadowRoot.getElementById('formContainer');
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 0;">
        <div style="width: 4rem; height: 4rem; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </div>
        <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Connect with ${provider}</h4>
        <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1.5rem;">Redirecting to ${provider} authentication...</p>
        <div style="width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #10b981; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
        <style>
          @keyframes spin { to { transform: rotate(360deg); } }
        </style>
      </div>
    `;
    
    // Simulate redirect then success
    setTimeout(() => {
      container.innerHTML = `
        <div class="success-state">
          <div class="success-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h4 class="success-title">Welcome!</h4>
          <p class="success-message">
            Successfully connected with ${provider}.
          </p>
          <button class="close-success-btn" id="closeSocialBtn">Continue</button>
        </div>
      `;
      container.querySelector('#closeSocialBtn').addEventListener('click', () => {
        this.close();
        window.dispatchEvent(new CustomEvent('userLoggedIn', { 
          detail: { provider } 
        }));
      });
    }, 2000);
  }

  open() {
    this.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.removeAttribute('open');
    document.body.style.overflow = '';
    // Re-render to reset form state
    setTimeout(() => {
      this.render();
      this.setupEventListeners();
    }, 300);
  }
}

customElements.define('login-modal', LoginModal);