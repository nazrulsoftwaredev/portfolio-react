/**
 * Global TypeScript Type Definitions
 * Shared across the entire application
 */

import PropTypes from "prop-types";

export type { ReactNode, ReactElement, FC, PropsWithChildren } from "react";

/**
 * Portfolio Data Types
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface HeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  cta?: string;
  image?: string;
  name?: string;
  email?: string;
  availability?: string;
  socialLinks?: SocialLink[];
}

export interface FocusItem {
  title: string;
  description: string;
}

export interface AboutContent {
  title?: string;
  description?: string;
  scrubText?: string;
  bioText?: string;
  focusItems?: FocusItem[];
  image?: string;
}

export interface Expertise {
  title: string;
  description: string;
  category: "Web" | "Design" | "System" | "Quality" | string;
}

export interface TechDomain {
  category: string;
  items: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface ProjectGalleryItem {
  img: string;
  category: string;
  title: string;
  desc: string;
  liveUrl: string;
}

export interface PortfolioData {
  hero: HeroContent;
  about: AboutContent;
  expertise: Expertise[];
  techStack: TechDomain[];
  testimonials: Testimonial[];
  projects: ProjectGalleryItem[];
}

/**
 * Component Props Types
 */
export interface CommonComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AnimatedComponentProps extends CommonComponentProps {
  delay?: number;
  duration?: number;
}

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

/**
 * Error Types
 */
export interface AppError {
  code: string;
  message: string;
  status?: number;
  context?: Record<string, unknown>;
}

/**
 * Form Types
 */
export interface FormField {
  name: string;
  value: string | number | boolean;
  error?: string;
  touched?: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

/**
 * Dashboard Types
 */
export interface DashboardUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "guest";
  avatar?: string;
}

export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

/**
 * Legacy PropTypes shapes used by feature components
 */
export const HERO_CONTENT_SHAPE = PropTypes.shape({
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  cta: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  availability: PropTypes.string,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string,
      url: PropTypes.string,
      icon: PropTypes.string,
    }),
  ),
});

export const ABOUT_CONTENT_SHAPE = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  scrubText: PropTypes.string,
  bioText: PropTypes.string,
  focusItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  image: PropTypes.string,
});

export const PROJECT_GALLERY_ITEM_SHAPE = PropTypes.shape({
  img: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  liveUrl: PropTypes.string,
});

export const EXPERTISE_SHAPE = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.string,
});

export const TECH_DOMAIN_SHAPE = PropTypes.shape({
  category: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
});

export const CONTACT_DATA_SHAPE = PropTypes.shape({
  title: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  location: PropTypes.string,
});

export const HEADER_DATA_SHAPE = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  availability: PropTypes.string,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string,
      url: PropTypes.string,
      icon: PropTypes.string,
    }),
  ),
});

export const FOOTER_DATA_SHAPE = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
      iconName: PropTypes.string,
    }),
  ),
});
