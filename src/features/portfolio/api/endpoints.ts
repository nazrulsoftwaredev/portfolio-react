/**
 * Portfolio API Endpoints Configuration
 */

export const PORTFOLIO_API_ENDPOINTS = {
  // Contact endpoints
  contact: {
    submit: "/api/v1/portfolio/contact",
    verify: "/api/v1/portfolio/contact/verify",
  },
  // Start project endpoints
  startProject: {
    submit: "/api/v1/portfolio/start-project",
  },
  // Project endpoints
  projects: {
    list: "/api/v1/portfolio/projects",
    submit: "/api/v1/portfolio/projects/submit",
  },
  // Testimonial endpoints
  testimonials: {
    list: "/api/v1/portfolio/testimonials",
  },
};
