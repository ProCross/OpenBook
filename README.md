# 📚 OpenBook

OpenBook is a web-based platform designed to help students find affordable textbooks by navigating through schools, courses, and associated materials. The application uses a modular, dataset-driven architecture that allows textbook listings to be dynamically filtered based on selected institutions and course structures. The goal is to provide a scalable, low-friction system for textbook discovery that can be extended across multiple universities without requiring major structural changes.

At its core, OpenBook separates content from logic by leveraging structured JavaScript datasets (e.g., `schools-data.js`, `courses-data.js`) to populate UI components. This enables a flexible and maintainable system where new schools, courses, and textbook mappings can be added or modified without rewriting application logic. The frontend dynamically parses URL parameters (such as `?school=MSU`) to render context-specific data, making routing lightweight while avoiding the need for a heavy backend in early stages.

The frontend is built using standard HTML, CSS, and Tailwind CSS for styling, with vanilla JavaScript handling interactivity and data binding. Components such as school selectors, course browsers, and textbook listings are rendered dynamically based on dataset inputs. Feather icons are used for lightweight UI enhancement, and the design prioritizes responsiveness, accessibility, and minimal load times.

Routing and state management are handled through query parameters and client-side filtering rather than a centralized router or state management library. For example, when a user selects a school, the application updates the URL query string and rehydrates the page using filtered dataset values. This approach reduces dependencies while still enabling a multi-page experience across `index.html`, `courses.html`, and `find-textbooks.html`, while keeping application state transparent and debuggable.

From a data modeling perspective, the system is designed to support normalized relationships between schools, departments, courses, and textbooks. Each dataset entry includes identifiers (e.g., school abbreviations, course codes) that allow cross-referencing between files. This creates a pseudo-relational structure within static JavaScript files, enabling efficient lookups and filtering operations without requiring a database in the current implementation.

For developers looking to extend the project, the primary workflow involves modifying or expanding the dataset files and ensuring consistency in identifiers across entities. Adding a new school requires updating the schools dataset, defining its associated courses, and linking textbooks accordingly. Because the UI components are data-driven, new entries automatically propagate through the interface when datasets are updated correctly.

The current architecture is intentionally lightweight but designed with scalability in mind. It can be migrated to a full-stack implementation by replacing static datasets with API endpoints and integrating a backend service (e.g., Node.js, Firebase, or Supabase). This would enable real-time updates, user-generated listings, authentication, and persistent storage while preserving the existing frontend structure and data contracts.

Performance considerations have been addressed by minimizing dependencies and keeping operations client-side. Most interactions involve filtering in-memory datasets, resulting in fast load times and low overhead. As data scales, optimizations such as pagination, lazy loading, or server-side querying can be introduced to maintain performance and responsiveness.

Overall, OpenBook is structured as a developer-friendly, extensible platform that emphasizes simplicity, modularity, and scalability. It serves both as a functional tool for students and as a foundation for experimenting with dataset-driven UI design, lightweight routing, and progressive enhancement toward a full-stack application.

---

## 📁 Project Structure

/openbook  
├── index.html  
├── courses.html  
├── find-textbooks.html  
├── style.css  
├── schools-data.js  
├── courses-data.js  
└── assets/  

---

## 🧠 Developer Notes

- Data is fully decoupled from UI logic via JavaScript datasets  
- Routing is handled through URL query parameters (`?school=`)  
- No frontend framework → easier debugging and faster iteration  
- Designed for easy migration to a full-stack architecture  
- Maintain consistent identifiers across datasets (e.g., school abbreviations, course codes)  
- UI components automatically re-render based on dataset changes  

---

## 🔮 Roadmap

- Backend integration (API + database)  
- User-submitted textbook listings  
- Authentication system  
- Advanced filtering (price, condition, seller)  
- Pagination and performance scaling  
- UI/UX improvements  

---

## 📄 License

This project is licensed under the MIT License.
