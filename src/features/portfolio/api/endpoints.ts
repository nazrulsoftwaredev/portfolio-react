/**
 * Portfolio API Endpoints Configuration
 */

export const PORTFOLIO_API_ENDPOINTS = {
  // Contact endpoints
  contact: {
    submit: "/api/portfolio/contact",
    verify: "/api/portfolio/contact/verify",
  },
  // Project endpoints
  projects: {
    list: "/api/portfolio/projects",
    submit: "/api/portfolio/projects/submit",
  },
  // Testimonial endpoints
  testimonials: {
    list: "/api/portfolio/testimonials",
  },
};
