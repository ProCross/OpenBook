import { schoolsData } from './components/schools-data.js';

const API_BASE = 'https://api.textbooksherpa.com/v1';

const rawData = {
  schools: schoolsData,
  courses: [],
  sections: [],
  textbooks: [],
  prices: [],
  reviews: [],
  discussions: [],
  avatars: [
    'https://static.photos/people/100x100/201',
    'https://static.photos/people/100x100/202',
    'https://static.photos/people/100x100/203',
    'https://static.photos/people/100x100/204',
    'https://static.photos/people/100x100/205',
    'https://static.photos/people/100x100/206',
    'https://static.photos/people/100x100/207',
    'https://static.photos/people/100x100/208'
  ]
};

function safeLocalStorageGet(key, fallback = null) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeLocalStorageRemove(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function safeFeatherReplace() {
  if (window.feather && typeof window.feather.replace === 'function') {
    window.feather.replace();
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function slugifyPathValue(value) {
  return encodeURIComponent(String(value || '').trim());
}

function parseRouteParam(path, prefix) {
  if (!String(path || '').startsWith(prefix)) {
    return null;
  }
  const remainder = String(path).slice(prefix.length);
  if (!remainder) {
    return null;
  }
  const [firstPart] = remainder.split('/');
  return firstPart ? decodeURIComponent(firstPart) : null;
}

function normalizeEntityId(value, fallback) {
  const normalized = String(value ?? '').trim();
  return normalized || fallback;
}

function normalizeData(input) {
  return {
    schools: Array.isArray(input.schools)
      ? input.schools
          .filter((school) => school && typeof school === 'object')
          .map((school, index) => ({
            ...school,
            id: normalizeEntityId(school.id, `school-${index + 1}`),
            name: String(school.name ?? '').trim(),
            abbr: String(school.abbr ?? '').trim(),
            location: String(school.location ?? '').trim(),
            state: String(school.state ?? '').trim(),
            image: String(school.image ?? '').trim(),
            courses: Number.isFinite(Number(school.courses)) ? Number(school.courses) : 0
          }))
      : [],
    courses: Array.isArray(input.courses)
      ? input.courses
          .filter((course) => course && typeof course === 'object')
          .map((course, index) => ({
            ...course,
            id: normalizeEntityId(course.id, `course-${index + 1}`),
            schoolId: normalizeEntityId(course.schoolId, ''),
            code: String(course.code ?? '').trim(),
            name: String(course.name ?? '').trim(),
            department: String(course.department ?? '').trim(),
            credits: Number.isFinite(Number(course.credits)) ? Number(course.credits) : 0
          }))
      : [],
    sections: Array.isArray(input.sections)
      ? input.sections
          .filter((section) => section && typeof section === 'object')
          .map((section, index) => ({
            ...section,
            id: normalizeEntityId(section.id, `section-${index + 1}`),
            courseId: normalizeEntityId(section.courseId, ''),
            number: String(section.number ?? '').trim(),
            professor: String(section.professor ?? '').trim(),
            semester: String(section.semester ?? '').trim(),
            seats: Number.isFinite(Number(section.seats)) ? Number(section.seats) : 0
          }))
      : [],
    textbooks: Array.isArray(input.textbooks)
      ? input.textbooks
          .filter((textbook) => textbook && typeof textbook === 'object')
          .map((textbook, index) => ({
            ...textbook,
            id: normalizeEntityId(textbook.id, `tb-${index + 1}`),
            courseId: normalizeEntityId(textbook.courseId, ''),
            title: String(textbook.title ?? '').trim(),
            author: String(textbook.author ?? '').trim(),
            edition: String(textbook.edition ?? '').trim(),
            isbn: String(textbook.isbn ?? '').trim(),
            required: Boolean(textbook.required),
            usedOften: Boolean(textbook.usedOften),
            olderEditionOk: Boolean(textbook.olderEditionOk),
            image: String(textbook.image ?? '').trim(),
            freeUrl: textbook.freeUrl ? String(textbook.freeUrl).trim() : ''
          }))
      : [],
    prices: Array.isArray(input.prices)
      ? input.prices
          .filter((price) => price && typeof price === 'object')
          .map((price, index) => ({
            ...price,
            id: normalizeEntityId(price.id, `price-${index + 1}`),
            textbookId: normalizeEntityId(price.textbookId, ''),
            seller: String(price.seller ?? '').trim(),
            newPrice: Number.isFinite(Number(price.newPrice)) ? Number(price.newPrice) : null,
            usedPrice: Number.isFinite(Number(price.usedPrice)) ? Number(price.usedPrice) : null,
            rentalPrice: Number.isFinite(Number(price.rentalPrice)) ? Number(price.rentalPrice) : null,
            digitalPrice: Number.isFinite(Number(price.digitalPrice)) ? Number(price.digitalPrice) : null,
            buyUrl: String(price.buyUrl ?? '#').trim() || '#',
            inStock: price.inStock !== false
          }))
      : [],
    reviews: Array.isArray(input.reviews)
      ? input.reviews
          .filter((review) => review && typeof review === 'object')
          .map((review, index) => ({
            ...review,
            id: normalizeEntityId(review.id, `review-${index + 1}`),
            textbookId: normalizeEntityId(review.textbookId, ''),
            user: String(review.user ?? '').trim(),
            rating: Number.isFinite(Number(review.rating)) ? Number(review.rating) : 0,
            actuallyRequired: Boolean(review.actuallyRequired),
            usedOften: String(review.usedOften ?? '').trim(),
            olderEditionOk: Boolean(review.olderEditionOk),
            semester: String(review.semester ?? '').trim(),
            comment: String(review.comment ?? '').trim(),
            helpful: Number.isFinite(Number(review.helpful)) ? Number(review.helpful) : 0,
            notHelpful: Number.isFinite(Number(review.notHelpful)) ? Number(review.notHelpful) : 0,
            date: String(review.date ?? '').trim()
          }))
      : [],
    discussions: Array.isArray(input.discussions)
      ? input.discussions
          .filter((discussion) => discussion && typeof discussion === 'object')
          .map((discussion, index) => ({
            ...discussion,
            id: normalizeEntityId(discussion.id, `discussion-${index + 1}`),
            courseId: normalizeEntityId(discussion.courseId, ''),
            user: String(discussion.user ?? '').trim(),
            avatar: String(discussion.avatar ?? '').trim(),
            title: String(discussion.title ?? '').trim(),
            content: String(discussion.content ?? '').trim(),
            replies: Number.isFinite(Number(discussion.replies)) ? Number(discussion.replies) : 0,
            views: Number.isFinite(Number(discussion.views)) ? Number(discussion.views) : 0,
            tags: Array.isArray(discussion.tags) ? discussion.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
            createdAt: String(discussion.createdAt ?? '').trim()
          }))
      : [],
    avatars: Array.isArray(input.avatars)
      ? input.avatars.map((avatar) => String(avatar ?? '').trim()).filter(Boolean)
      : []
  };
}

const appData = window.appData = normalizeData(rawData);

function getCourseById(courseId) {
  return appData.courses.find((course) => course.id === courseId) || null;
}

function getSchoolById(schoolId) {
  return appData.schools.find((school) => school.id === schoolId) || null;
}

function getSectionById(sectionId) {
  return appData.sections.find((section) => section.id === sectionId) || null;
}

function getTextbookById(textbookId) {
  return appData.textbooks.find((textbook) => textbook.id === textbookId) || null;
}

function getReviewStats(textbookId) {
  const reviews = appData.reviews.filter((review) => review.textbookId === textbookId);
  const count = reviews.length;
  const avgRating = count ? (reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0) / count).toFixed(1) : '0.0';
  const requiredPercent = count ? Math.round((reviews.filter((review) => review.actuallyRequired).length / count) * 100) : 0;
  const usedOftenPercent = count ? Math.round((reviews.filter((review) => review.usedOften && review.usedOften !== 'rarely').length / count) * 100) : 0;
  const olderEditionPercent = count ? Math.round((reviews.filter((review) => review.olderEditionOk).length / count) * 100) : 0;
  return {
    count,
    avgRating,
    requiredPercent,
    usedOftenPercent,
    olderEditionPercent,
    reviews
  };
}

function getSafeLowestDisplayedPrice(textbookId) {
  const values = appData.prices
    .filter((price) => price.textbookId === textbookId)
    .flatMap((price) => [price.usedPrice, price.rentalPrice, price.newPrice, price.digitalPrice])
    .filter((value) => Number.isFinite(value));
  return values.length ? Math.min(...values) : null;
}

function ensureSelectedSchoolFromCourse(course) {
  if (!course) {
    return null;
  }
  const school = getSchoolById(course.schoolId);
  if (school) {
    store.setSchool(school, { preserveCourse: true, preserveSection: true });
  }
  return school;
}

const store = window.store = {
  currentUser: null,
  selectedSchool: null,
  selectedCourse: null,
  selectedSection: null,
  theme: safeLocalStorageGet('theme', 'light') || 'light',
  setSchool(school, options = {}) {
    const preserveCourse = Boolean(options.preserveCourse);
    const preserveSection = Boolean(options.preserveSection);
    this.selectedSchool = school || null;
    if (!preserveCourse) {
      this.selectedCourse = null;
    }
    if (!preserveSection) {
      this.selectedSection = null;
    }
    if (school) {
      safeLocalStorageSet('selectedSchool', JSON.stringify(school));
    } else {
      safeLocalStorageRemove('selectedSchool');
    }
  },
  setCourse(course) {
    this.selectedCourse = course || null;
    this.selectedSection = null;
    if (course) {
      ensureSelectedSchoolFromCourse(course);
    }
  },
  setSection(section) {
    this.selectedSection = section || null;
  },
  hydrateSelectedSchool() {
    const raw = safeLocalStorageGet('selectedSchool');
    if (!raw) {
      this.selectedSchool = null;
      return null;
    }
    try {
      const parsed = JSON.parse(raw);
      const matchedSchool = getSchoolById(parsed.id);
      this.selectedSchool = matchedSchool;
      return matchedSchool;
    } catch {
      this.selectedSchool = null;
      return null;
    }
  },
  applyTheme() {
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
  },
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    safeLocalStorageSet('theme', this.theme);
    this.applyTheme();
  }
};

store.applyTheme();
store.hydrateSelectedSchool();

const api = window.api = {
  async getSchools() {
    await delay(100);
    return appData.schools;
  },
  async getCourses(schoolId) {
    await delay(100);
    return appData.courses.filter((course) => course.schoolId === schoolId);
  },
  async getSections(courseId) {
    await delay(100);
    return appData.sections.filter((section) => section.courseId === courseId);
  },
  async getTextbooks(courseId) {
    await delay(100);
    return appData.textbooks.filter((textbook) => textbook.courseId === courseId);
  },
  async getPrices(textbookId) {
    await delay(100);
    return appData.prices.filter((price) => price.textbookId === textbookId);
  },
  async getReviews(textbookId) {
    await delay(100);
    return appData.reviews.filter((review) => review.textbookId === textbookId);
  },
  async getDiscussions(courseId) {
    await delay(100);
    return appData.discussions.filter((discussion) => discussion.courseId === courseId);
  },
  async submitReview(review) {
    await delay(100);
    const record = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString()
    };
    appData.reviews.unshift(record);
    return { success: true, review: record };
  },
  async postDiscussion(post) {
    await delay(100);
    const record = {
      ...post,
      id: `discussion-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    appData.discussions.unshift(record);
    return { success: true, discussion: record };
  }
};

function selectSchoolAndGo(schoolId) {
  const school = getSchoolById(schoolId);
  if (!school) {
    return;
  }
  store.setSchool(school);
  router.navigate('/courses');
}

window.selectSchoolAndGo = selectSchoolAndGo;

function showNewPostModal() {
  const modal = document.getElementById('newPostModal');
  if (modal && typeof modal.open === 'function') {
    modal.open();
  }
}

function showReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal && typeof modal.open === 'function') {
    modal.open();
  }
}

window.showNewPostModal = showNewPostModal;
window.showReviewModal = showReviewModal;

const router = window.router = {
  routes: {
    '/': 'home',
    '/schools': 'schools',
    '/courses': 'courses',
    '/community': 'community'
  },
  currentRoute: window.location.pathname || '/',
  navigate(path) {
    const nextPath = String(path || '/').trim() || '/';
    this.currentRoute = nextPath;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    return this.render();
  },
  getRouteComponent(path) {
    if (String(path || '').startsWith('/course/')) return 'courseDetail';
    if (String(path || '').startsWith('/textbook/')) return 'textbookDetail';
    return this.routes[path] || 'home';
  },
  extractParam(path, pattern) {
    if (pattern === '/course/:id') {
      return parseRouteParam(path, '/course/');
    }
    if (pattern === '/textbook/:id') {
      return parseRouteParam(path, '/textbook/');
    }
    return null;
  },
  async render() {
    const app = document.getElementById('app');
    if (!app) {
      return;
    }

    const component = this.getRouteComponent(this.currentRoute);
    app.innerHTML = '<div class="min-h-screen flex items-center justify-center"><div class="skeleton w-16 h-16 rounded-full"></div></div>';
    await delay(50);

    if (component === 'home') {
      app.innerHTML = renderHome();
      setupHomeListeners();
    } else if (component === 'schools') {
      app.innerHTML = await renderSchools();
      setupSchoolEventListeners();
    } else if (component === 'courses') {
      app.innerHTML = await renderCourses();
      setupCourseEventListeners();
    } else if (component === 'courseDetail') {
      const courseId = this.extractParam(this.currentRoute, '/course/:id');
      app.innerHTML = await renderCourseDetail(courseId);
      setupCourseDetailListeners();
    } else if (component === 'textbookDetail') {
      const textbookId = this.extractParam(this.currentRoute, '/textbook/:id');
      app.innerHTML = await renderTextbookDetail(textbookId);
      setupTextbookDetailListeners();
    } else {
      this.currentRoute = '/';
      app.innerHTML = renderHome();
      setupHomeListeners();
    }

    safeFeatherReplace();
  }
};

window.addEventListener('popstate', () => {
  router.currentRoute = window.location.pathname || '/';
  router.render();
});

function renderHome() {
  const featuredSchools = appData.schools.slice(0, 4);
  return `
    <div class="mesh-gradient min-h-screen">
      <section class="relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1.5s;"></div>
        </div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div class="text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8 animate-float">
              <i data-feather="zap" class="w-4 h-4"></i>
              <span>Save up to 80% on textbooks</span>
            </div>
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Find the <span class="gradient-text">cheapest</span> textbooks<br>
              <span class="text-slate-600 dark:text-slate-400">for your courses</span>
            </h1>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Stop overpaying. Compare prices from 20+ sellers, read real student reviews, and connect with classmates to split costs.
            </p>
            <div class="max-w-2xl mx-auto">
              <div class="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
                <div class="flex-1 flex items-center px-4 py-3 bg-white dark:bg-slate-800 rounded-xl">
                  <i data-feather="search" class="w-5 h-5 text-slate-400 mr-3"></i>
                  <input type="text" placeholder="Search by school, course, or professor..." class="w-full bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400" id="hero-search">
                </div>
                <button type="button" id="hero-find-books" class="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all glow-primary flex items-center justify-center gap-2">
                  <span>Find Books</span>
                  <i data-feather="arrow-right" class="w-5 h-5"></i>
                </button>
              </div>
            </div>
            <div class="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16">
              <div class="text-center">
                <div class="text-3xl sm:text-4xl font-bold gradient-text">$2.4M</div>
                <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">Saved by students</div>
              </div>
              <div class="text-center">
                <div class="text-3xl sm:text-4xl font-bold gradient-text">50K+</div>
                <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">Course listings</div>
              </div>
              <div class="text-center">
                <div class="text-3xl sm:text-4xl font-bold gradient-text">20+</div>
                <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">Price sources</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-16">How Textbook Sherpa Works</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="relative p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg course-hover">
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl mb-6">1</div>
            <h3 class="text-xl font-semibold mb-3">Find Your Course</h3>
            <p class="text-slate-600 dark:text-slate-400">Search by school, course code, section, or professor. No more hunting for ISBNs.</p>
          </div>
          <div class="relative p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg course-hover">
            <div class="w-12 h-12 rounded-xl bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-400 font-bold text-xl mb-6">2</div>
            <h3 class="text-xl font-semibold mb-3">Compare Prices</h3>
            <p class="text-slate-600 dark:text-slate-400">See prices from campus bookstore, Amazon, Chegg, AbeBooks, and more in one place.</p>
          </div>
          <div class="relative p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg course-hover">
            <div class="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl mb-6">3</div>
            <h3 class="text-xl font-semibold mb-3">Save & Connect</h3>
            <p class="text-slate-600 dark:text-slate-400">Buy the cheapest option, or team up with classmates to split costs and share books.</p>
          </div>
        </div>
      </section>
      <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold">Popular Schools</h2>
          <a href="/schools" data-router-link="/schools" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-1">
            View all <i data-feather="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
        <div class="bento-grid">
          ${featuredSchools.map((school) => `
            <div class="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg course-hover cursor-pointer" data-school-id="${escapeHtml(school.id)}">
              <div class="aspect-video relative">
                <img src="${escapeHtml(school.image)}" alt="${escapeHtml(school.name)}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">${escapeHtml(school.abbr)}</span>
                  </div>
                  <h3 class="text-xl font-bold text-white">${escapeHtml(school.name)}</h3>
                  <p class="text-slate-300 text-sm mt-1">${escapeHtml(school.courses)} courses listed</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

async function renderSchools() {
  const schools = await api.getSchools();
  return `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12">
          <h1 class="text-4xl font-bold mb-4">Select Your School</h1>
          <p class="text-slate-600 dark:text-slate-400">Choose your university to browse course listings and textbook prices.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${schools.map((school) => `
            <div class="school-card group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1" data-school-id="${escapeHtml(school.id)}">
              <div class="h-48 relative overflow-hidden">
                <img src="${escapeHtml(school.image)}" alt="${escapeHtml(school.name)}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                <div class="absolute top-4 left-4">
                  <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold">${escapeHtml(school.abbr)}</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">${escapeHtml(school.name)}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 flex items-center gap-1">
                  <i data-feather="map-pin" class="w-4 h-4"></i>
                  ${escapeHtml(school.location)}
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-slate-500">${escapeHtml(school.courses)} courses</span>
                  <span class="text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
                    <i data-feather="arrow-right" class="w-5 h-5"></i>
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

async function renderCourses() {
  const selectedSchool = store.selectedSchool || store.hydrateSelectedSchool();
  if (!selectedSchool) {
    await router.navigate('/schools');
    return '';
  }

  const school = getSchoolById(selectedSchool.id);
  if (!school) {
    await router.navigate('/schools');
    return '';
  }

  store.setSchool(school, { preserveCourse: true, preserveSection: true });
  const courses = await api.getCourses(school.id);

  return `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <a href="/" data-router-link="/" class="hover:text-primary-600 dark:hover:text-primary-400">Home</a>
          <i data-feather="chevron-right" class="w-4 h-4"></i>
          <a href="/schools" data-router-link="/schools" class="hover:text-primary-600 dark:hover:text-primary-400">Schools</a>
          <i data-feather="chevron-right" class="w-4 h-4"></i>
          <span class="text-slate-800 dark:text-slate-200 font-medium">${escapeHtml(school.name)}</span>
        </nav>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-bold mb-2">${escapeHtml(school.name)}</h1>
            <p class="text-slate-600 dark:text-slate-400">${courses.length} courses available</p>
          </div>
        </div>
        ${courses.length === 0 ? `
          <div class="rounded-2xl bg-white dark:bg-slate-800 shadow-lg p-10 text-center text-slate-500 dark:text-slate-400">
            <div class="text-lg font-medium mb-2">No course data yet for this school</div>
            <p>School selection works, but course records have not been loaded into this file yet.</p>
          </div>
        ` : `
          <div class="grid lg:grid-cols-2 gap-6">
            ${courses.map((course) => `
              <div class="course-card group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 border-l-4 border-primary-500" data-course-id="${escapeHtml(course.id)}">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <div class="flex items-center gap-2 mb-2">
                      <span class="px-2 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold">${escapeHtml(course.code)}</span>
                      <span class="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm">${escapeHtml(course.credits)} credits</span>
                    </div>
                    <h3 class="text-xl font-bold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">${escapeHtml(course.name)}</h3>
                  </div>
                  <i data-feather="arrow-right" class="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors"></i>
                </div>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">${escapeHtml(course.department)}</p>
                <div class="flex items-center gap-6 text-sm text-slate-500">
                  <span class="flex items-center gap-1">
                    <i data-feather="book" class="w-4 h-4"></i>
                    ${appData.textbooks.filter((textbook) => textbook.courseId === course.id).length} textbooks
                  </span>
                  <span class="flex items-center gap-1">
                    <i data-feather="users" class="w-4 h-4"></i>
                    ${appData.sections.filter((section) => section.courseId === course.id).reduce((sum, section) => sum + (Number(section.seats) || 0), 0)} students
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

async function renderCourseDetail(courseId) {
  const course = getCourseById(courseId) || store.selectedCourse;
  if (!course) {
    await router.navigate('/courses');
    return '';
  }

  store.setCourse(course);
  const school = getSchoolById(course.schoolId);
  const sections = await api.getSections(course.id);
  const textbooks = await api.getTextbooks(course.id);
  const discussions = await api.getDiscussions(course.id);

  return `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav class="flex items-center gap-2 text-sm text-white/80 mb-6">
            <a href="/" data-router-link="/" class="hover:text-white">Home</a>
            <i data-feather="chevron-right" class="w-4 h-4"></i>
            <a href="/schools" data-router-link="/schools" class="hover:text-white">Schools</a>
            <i data-feather="chevron-right" class="w-4 h-4"></i>
            <span>${escapeHtml(school ? school.abbr : '')}</span>
            <i data-feather="chevron-right" class="w-4 h-4"></i>
            <span class="font-medium">${escapeHtml(course.code)}</span>
          </nav>
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">${escapeHtml(course.code)}</span>
                <span class="px-3 py-1 rounded-full bg-white/20 text-sm">${escapeHtml(course.credits)} credits</span>
              </div>
              <h1 class="text-4xl font-bold mb-3">${escapeHtml(course.name)}</h1>
              <p class="text-white/80 text-lg">${escapeHtml(course.department)} • ${escapeHtml(school ? school.name : '')}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <div class="glass rounded-2xl p-6">
              <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i data-feather="grid" class="w-5 h-5 text-primary-500"></i>
                Select Your Section
              </h2>
              ${sections.length === 0 ? `
                <div class="text-slate-500 dark:text-slate-400">No section data yet for this course.</div>
              ` : `
                <div class="grid sm:grid-cols-2 gap-4">
                  ${sections.map((section) => `
                    <div class="section-card p-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-transparent hover:border-primary-500 cursor-pointer transition-all" data-section-id="${escapeHtml(section.id)}">
                      <div class="flex items-center justify-between mb-2">
                        <span class="font-semibold">Section ${escapeHtml(section.number)}</span>
                        <span class="text-sm text-slate-500">${escapeHtml(section.semester)}</span>
                      </div>
                      <p class="text-slate-600 dark:text-slate-400 text-sm mb-2">
                        <i data-feather="user" class="w-4 h-4 inline mr-1"></i>
                        Prof. ${escapeHtml(section.professor)}
                      </p>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-slate-500">${escapeHtml(section.seats)} seats</span>
                        <span class="text-primary-600 dark:text-primary-400 text-sm font-medium">View books →</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
            <div>
              <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i data-feather="book" class="w-5 h-5 text-primary-500"></i>
                Required & Optional Textbooks
              </h2>
              ${textbooks.length === 0 ? `
                <div class="text-center py-12 text-slate-500">
                  <i data-feather="book-open" class="w-16 h-16 mx-auto mb-4 opacity-50"></i>
                  <p>No textbooks listed yet for this course.</p>
                </div>
              ` : textbooks.map((book) => {
                const lowestPrice = getSafeLowestDisplayedPrice(book.id);
                return `
                  <div class="textbook-card group mb-6 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all cursor-pointer border-l-4 ${book.required ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}" data-textbook-id="${escapeHtml(book.id)}">
                    <div class="flex flex-col sm:flex-row gap-6">
                      <div class="flex-shrink-0">
                        <div class="w-32 h-40 rounded-lg shadow-lg overflow-hidden relative">
                          <img src="${escapeHtml(book.image || '')}" alt="${escapeHtml(book.title)}" class="w-full h-full object-cover">
                          ${book.required ? '<div class="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">REQUIRED</div>' : ''}
                          ${book.freeUrl ? '<div class="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 text-center">FREE</div>' : ''}
                        </div>
                      </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">${escapeHtml(book.title)}</h3>
                        <p class="text-slate-600 dark:text-slate-400 mb-3">${escapeHtml(book.author)} • ${escapeHtml(book.edition)} Edition</p>
                        <p class="text-sm text-slate-500 mb-4">ISBN: ${escapeHtml(book.isbn)}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                          ${book.required ? '<span class="px-2 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium">Required</span>' : ''}
                          ${book.usedOften ? '<span class="px-2 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">Heavily used</span>' : '<span class="px-2 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium">Rarely used</span>'}
                          ${book.olderEditionOk ? '<span class="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">Older edition OK</span>' : ''}
                          ${book.freeUrl ? '<span class="px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium">Free online</span>' : ''}
                        </div>
                        <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                          <div>
                            ${lowestPrice !== null ? `<span class="text-2xl font-bold text-primary-600 dark:text-primary-400">$${lowestPrice}</span><span class="text-slate-500 text-sm"> cheapest</span>` : '<span class="text-slate-500 text-sm">No prices yet</span>'}
                          </div>
                          <span class="text-primary-600 dark:text-primary-400 font-medium">Compare all prices →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
            <div>
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold flex items-center gap-2">
                  <i data-feather="message-circle" class="w-5 h-5 text-secondary-500"></i>
                  Class Discussion
                </h2>
              </div>
              ${discussions.length === 0 ? `
                <div class="rounded-2xl bg-white dark:bg-slate-800 shadow-lg p-6 text-slate-500 dark:text-slate-400">No discussion posts yet for this course.</div>
              ` : `
                <div class="space-y-4">
                  ${discussions.map((post, index) => `
                    <div class="discussion-card p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
                      <div class="flex items-start gap-4">
                        <img src="${escapeHtml(appData.avatars.length ? appData.avatars[index % appData.avatars.length] : '')}" alt="${escapeHtml(post.user)}" class="w-10 h-10 rounded-full flex-shrink-0">
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <span class="font-semibold">${escapeHtml(post.user)}</span>
                            <span class="text-slate-400 text-sm">• ${formatDate(post.createdAt)}</span>
                          </div>
                          <h4 class="font-medium mb-2">${escapeHtml(post.title)}</h4>
                          <p class="text-slate-600 dark:text-slate-400 text-sm mb-3">${escapeHtml(post.content)}</p>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>
          <div class="space-y-6">
            <div class="glass rounded-2xl p-6">
              <h3 class="font-bold mb-4">Teaching Team</h3>
              ${sections.length === 0 ? `
                <div class="text-slate-500 dark:text-slate-400">No instructors listed yet.</div>
              ` : `
                <div class="space-y-3">
                  ${[...new Set(sections.map((section) => section.professor))].map((professor) => `
                    <div class="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-800">
                      <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <i data-feather="user" class="w-5 h-5 text-slate-500"></i>
                      </div>
                      <div>
                        <p class="font-medium text-sm">Prof. ${escapeHtml(professor)}</p>
                        <p class="text-xs text-slate-500">${sections.filter((section) => section.professor === professor).length} section${sections.filter((section) => section.professor === professor).length > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function renderTextbookDetail(textbookId) {
  const book = getTextbookById(textbookId);
  if (!book) {
    await router.navigate('/courses');
    return '';
  }

  const course = getCourseById(book.courseId);
  if (course) {
    store.setCourse(course);
  }
  const school = course ? getSchoolById(course.schoolId) : store.selectedSchool;
  const prices = await api.getPrices(book.id);
  const stats = getReviewStats(book.id);

  const byNumericKey = (key) => prices.filter((price) => Number.isFinite(price[key])).sort((a, b) => a[key] - b[key])[0] || null;
  const bestNew = byNumericKey('newPrice');
  const bestUsed = byNumericKey('usedPrice');
  const bestRental = byNumericKey('rentalPrice');
  const bestDigital = byNumericKey('digitalPrice');

  return `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav class="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <a href="/" data-router-link="/" class="hover:text-primary-600 dark:hover:text-primary-400">Home</a>
          <i data-feather="chevron-right" class="w-4 h-4"></i>
          <a href="/schools" data-router-link="/schools" class="hover:text-primary-600 dark:hover:text-primary-400">Schools</a>
          <i data-feather="chevron-right" class="w-4 h-4"></i>
          <span>${escapeHtml(school ? school.abbr : '')}</span>
          <i data-feather="chevron-right" class="w-4 h-4"></i>
          <span class="text-slate-800 dark:text-slate-200 font-medium">${escapeHtml(book.title)}</span>
        </nav>
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <div class="sticky top-8">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                <img src="${escapeHtml(book.image || '')}" alt="${escapeHtml(book.title)}" class="w-full aspect-[3/4] object-cover">
                ${book.required ? '<div class="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg shadow-lg">REQUIRED for course</div>' : ''}
              </div>
            </div>
          </div>
          <div class="lg:col-span-2 space-y-8">
            <div>
              <h1 class="text-3xl font-bold mb-3">${escapeHtml(book.title)}</h1>
              <div class="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                <span>${escapeHtml(book.author)}</span>
                <span>${escapeHtml(book.edition)} Edition</span>
                <span>${escapeHtml(book.isbn)}</span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
              <div class="text-center">
                <div class="text-5xl font-bold gradient-text">${stats.avgRating}</div>
                <div class="text-sm text-slate-500 mt-1">${stats.count} reviews</div>
              </div>
              <div class="flex-1 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm w-24">Actually required</span>
                  <div class="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div class="h-full rounded-full bg-green-500" style="width: ${stats.requiredPercent}%"></div></div>
                  <span class="text-sm w-12 text-right">${stats.requiredPercent}%</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm w-24">Used often</span>
                  <div class="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div class="h-full rounded-full bg-amber-500" style="width: ${stats.usedOftenPercent}%"></div></div>
                  <span class="text-sm w-12 text-right">${stats.usedOftenPercent}%</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm w-24">Older edition OK</span>
                  <div class="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div class="h-full rounded-full bg-blue-500" style="width: ${stats.olderEditionPercent}%"></div></div>
                  <span class="text-sm w-12 text-right">${stats.olderEditionPercent}%</span>
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold mb-4">Price Comparison</h2>
              ${(bestRental || bestUsed || bestNew || bestDigital) ? `
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  ${bestRental ? `<div class="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-500"><div class="text-sm font-medium mb-2">Best Rental</div><div class="text-2xl font-bold">$${bestRental.rentalPrice}</div><div class="text-sm">${escapeHtml(bestRental.seller)}</div></div>` : ''}
                  ${bestUsed ? `<div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500"><div class="text-sm font-medium mb-2">Best Used</div><div class="text-2xl font-bold">$${bestUsed.usedPrice}</div><div class="text-sm">${escapeHtml(bestUsed.seller)}</div></div>` : ''}
                  ${bestNew ? `<div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500"><div class="text-sm font-medium mb-2">Best New</div><div class="text-2xl font-bold">$${bestNew.newPrice}</div><div class="text-sm">${escapeHtml(bestNew.seller)}</div></div>` : ''}
                  ${bestDigital ? `<div class="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500"><div class="text-sm font-medium mb-2">Best Digital</div><div class="text-2xl font-bold">$${bestDigital.digitalPrice}</div><div class="text-sm">${escapeHtml(bestDigital.seller)}</div></div>` : ''}
                </div>
              ` : `
                <div class="rounded-2xl bg-white dark:bg-slate-800 shadow-lg p-6 text-slate-500 dark:text-slate-400">No price data yet for this textbook.</div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindRouterLinks(root = document) {
  root.querySelectorAll('[data-router-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const nextPath = link.getAttribute('data-router-link');
      if (nextPath) {
        router.navigate(nextPath);
      }
    });
  });
}

function setupHomeListeners() {
  bindRouterLinks();
  const button = document.getElementById('hero-find-books');
  if (button) {
    button.addEventListener('click', () => router.navigate('/schools'));
  }
  document.querySelectorAll('[data-school-id]').forEach((card) => {
    card.addEventListener('click', () => selectSchoolAndGo(card.getAttribute('data-school-id')));
  });
}

function setupSchoolEventListeners() {
  document.querySelectorAll('.school-card').forEach((card) => {
    card.addEventListener('click', () => selectSchoolAndGo(card.dataset.schoolId));
  });
}

function setupCourseEventListeners() {
  bindRouterLinks();
  document.querySelectorAll('.course-card').forEach((card) => {
    card.addEventListener('click', () => {
      const course = getCourseById(card.dataset.courseId);
      if (!course) {
        return;
      }
      store.setCourse(course);
      router.navigate(`/course/${slugifyPathValue(course.id)}`);
    });
  });
}

function setupCourseDetailListeners() {
  bindRouterLinks();
  document.querySelectorAll('.section-card').forEach((card) => {
    card.addEventListener('click', () => {
      const section = getSectionById(card.dataset.sectionId);
      store.setSection(section);
      document.querySelectorAll('.section-card').forEach((item) => item.classList.remove('border-primary-500'));
      card.classList.add('border-primary-500');
    });
  });
  document.querySelectorAll('.textbook-card').forEach((card) => {
    card.addEventListener('click', () => {
      const textbookId = card.dataset.textbookId;
      if (textbookId) {
        router.navigate(`/textbook/${slugifyPathValue(textbookId)}`);
      }
    });
  });
}

function setupTextbookDetailListeners() {
  bindRouterLinks();
}

document.addEventListener('DOMContentLoaded', () => {
  router.render();
});
