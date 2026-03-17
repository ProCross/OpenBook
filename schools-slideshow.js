import { schoolsData } from './schools-data.js';

class SchoolsSlideshow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.schools = Array.isArray(schoolsData) ? schoolsData : [];
    this.autoplayInterval = null;
    this.hostHoverListenersAttached = false;

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  connectedCallback() {
    this.render();
    this.attachHostHoverListeners();
    this.startAutoplay();
  }

  disconnectedCallback() {
    this.stopAutoplay();
    this.detachHostHoverListeners();
  }

  attachHostHoverListeners() {
    if (this.hostHoverListenersAttached) return;
    this.addEventListener('mouseenter', this.handleMouseEnter);
    this.addEventListener('mouseleave', this.handleMouseLeave);
    this.hostHoverListenersAttached = true;
  }

  detachHostHoverListeners() {
    if (!this.hostHoverListenersAttached) return;
    this.removeEventListener('mouseenter', this.handleMouseEnter);
    this.removeEventListener('mouseleave', this.handleMouseLeave);
    this.hostHoverListenersAttached = false;
  }

  handleMouseEnter() {
    this.stopAutoplay();
  }

  handleMouseLeave() {
    this.startAutoplay();
  }

  startAutoplay() {
    this.stopAutoplay();
    if (this.schools.length <= 1) return;

    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  nextSlide() {
    if (this.schools.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.schools.length;
    this.updateSlidePosition();
  }

  prevSlide() {
    if (this.schools.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.schools.length) % this.schools.length;
    this.updateSlidePosition();
  }

  goToSlide(index) {
    if (this.schools.length === 0) return;
    this.currentIndex = index;
    this.updateSlidePosition();
  }

  updateSlidePosition() {
    const track = this.shadowRoot.getElementById('slidesTrack');
    const dots = this.shadowRoot.querySelectorAll('.dot');
    
    if (track) {
      track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  selectSchoolAndGo(schoolId) {
    const school = this.schools.find((s) => s.id === schoolId);

    if (!school) {
      console.error(`School not found for id: ${schoolId}`);
      return;
    }

    localStorage.setItem('selectedSchool', JSON.stringify(school));
    // Navigate using school abbreviation for clean URLs
    window.location.href = `/courses.html?school=${encodeURIComponent(school.abbr)}`;
  }

  render() {
    if (!this.schools.length) {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; width: 100%; }
          .empty-state {
            rounded-3xl bg-white dark:bg-slate-800 shadow-2xl p-8 text-center;
          }
        </style>
        <div class="empty-state">
          <h3 class="text-2xl font-bold mb-2">No schools available</h3>
          <p class="text-slate-600 dark:text-slate-400">Please add schools to the shared data source.</p>
        </div>
      `;
      return;
    }

    if (this.currentIndex >= this.schools.length) {
      this.currentIndex = 0;
    }

    const school = this.schools[this.currentIndex];
    const safeCoursesCount = Number.isFinite(Number(school.courses)) ? Number(school.courses) : 0;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }
        
        .slideshow-container {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #fae8ff 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .slides-track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide {
          min-width: 100%;
          padding: 2rem;
          box-sizing: border-box;
        }

        .slide-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          min-height: 300px;
        }

        .slide-content > div:first-child {
          order: 2;
        }

        .slide-content > .school-info {
          order: 1;
        }

        .school-meta,
        .school-name,
        .school-location,
        .school-cta {
          text-align: right;
        }

        .school-location {
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .slide-content {
            grid-template-columns: 1fr;
          }

          .slide-content > div:first-child {
            order: 1;
          }

          .slide-content > .school-info {
            order: 2;
          }

          .school-meta,
          .school-name,
          .school-location,
          .school-cta {
            text-align: center;
          }

          .school-location {
            justify-content: center;
          }

          .school-meta {
            display: none;
          }
        }

        .school-image {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .school-image:hover {
          transform: scale(1.02);
        }

        .school-name {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: #0f172a;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
        }

        .school-location {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #1e293b;
          margin-bottom: 1.5rem;
          font-size: 1.05rem;
          font-weight: 600;
        }

        .school-location svg {
          opacity: 1;
          stroke-width: 2.5;
          flex-shrink: 0;
          color: #0f172a;
        }

        .school-meta span {
          color: #0f172a;
          background: rgba(255, 255, 255, 0.7);
          font-weight: 700;
          border: 1px solid rgba(0, 0, 0, 0.1);
          margin-bottom: 0.75rem;
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        .browse-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          cursor: pointer;
          border: none;
          font-size: 1rem;
        }

        .browse-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          background: rgba(255, 255, 255, 0.8);
          color: #0f172a;
          border-radius: 0.75rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 1rem;
        }

        .view-all-btn:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
        }

        .controls-container {
          margin-top: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .dots {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          padding: 0;
        }

        .dot.active {
          background: #059669;
          transform: scale(1.2);
        }

        .arrow-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(15, 23, 42, 0.2);
          color: #0f172a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .arrow-btn:hover {
          background: rgba(15, 23, 42, 0.2);
          transform: scale(1.1);
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #059669, #a21caf);
          border-radius: 0 0 1.5rem 1.5rem;
          transition: width 0.1s linear;
        }

        /* Dark mode styles */
        :host-context(.dark) .slideshow-container {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #701a75 100%);
          border-color: rgba(52, 211, 153, 0.2);
        }

        :host-context(.dark) .school-name {
          color: #f8fafc;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        :host-context(.dark) .school-location {
          color: #e2e8f0;
        }

        :host-context(.dark) .school-location svg {
          color: #e2e8f0;
        }

        :host-context(.dark) .school-meta span {
          color: #f8fafc;
          background: rgba(15, 23, 42, 0.5);
          border-color: rgba(255, 255, 255, 0.1);
        }

        :host-context(.dark) .controls {
          background: rgba(15, 23, 42, 0.9);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        :host-context(.dark) .dot {
          background: rgba(255, 255, 255, 0.3);
        }

        :host-context(.dark) .dot.active {
          background: #34d399;
        }

        :host-context(.dark) .arrow-btn {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #f8fafc;
        }

        :host-context(.dark) .arrow-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        :host-context(.dark) .view-all-btn {
          background: rgba(15, 23, 42, 0.8);
          color: #f8fafc;
          border-color: rgba(255, 255, 255, 0.1);
        }

        :host-context(.dark) .view-all-btn:hover {
          background: rgba(15, 23, 42, 1);
        }
      </style>

      <div class="slideshow-container">
        <div class="slides-track" id="slidesTrack">
          ${this.schools.map((school, index) => `
            <div class="slide" data-index="${index}">
              <div class="slide-content">
                <div>
                  <img src="${school.image}" alt="${school.name}" class="school-image" loading="lazy">
                </div>
                <div class="school-info">
                  <div class="school-meta">
                    <span>${school.abbr}</span>
                  </div>
                  <h3 class="school-name">${school.name}</h3>
                  <div class="school-location">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${school.location}</span>
                  </div>
                  <div class="school-cta">
                    <button
                      class="browse-btn"
                      data-school-id="${school.id}"
                      onclick="this.getRootNode().host.selectSchoolAndGo('${school.id}')"
                    >
                      <span>Browse Courses</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                    <a href="/schools.html" class="view-all-btn" style="margin-left: 0.5rem;">
                      View All
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="progress-bar" id="progressBar" style="width: 0%"></div>
      </div>

      <div class="controls-container">
        <div class="controls">
          <button class="arrow-btn" id="prevBtn" aria-label="Previous slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div class="dots" id="dots">
            ${this.schools.map((_, index) => `
              <button class="dot ${index === this.currentIndex ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
            `).join('')}
          </div>
          <button class="arrow-btn" id="nextBtn" aria-label="Next slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
    
    if (window.feather && typeof window.feather.replace === 'function') {
      window.feather.replace();
    }
  }

  attachEventListeners() {
    const prevBtn = this.shadowRoot.getElementById('prevBtn');
    const nextBtn = this.shadowRoot.getElementById('nextBtn');
    const dots = this.shadowRoot.querySelectorAll('.dot');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.stopAutoplay();
        this.startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.stopAutoplay();
        this.startAutoplay();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const dotIndex = Number(dot.getAttribute('data-dot-index'));
        this.goToSlide(dotIndex);
        this.stopAutoplay();
        this.startAutoplay();
      });
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    const container = this.shadowRoot.querySelector('.slideshow-container');

    if (container) {
      container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      });
    }
  }

  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.stopAutoplay();
      this.startAutoplay();
    }
  }
}

customElements.define('schools-slideshow', SchoolsSlideshow);