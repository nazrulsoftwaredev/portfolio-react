/**
 * Portfolio Feature API Services
 * Business logic and data processing for portfolio feature
 */

import type { ContactFormData } from "./types";
import { validateField, contactValidationSchema } from "@/shared/utils";

export const portfolioService = {
  /**
   * Validate contact form data
   */
  validateContactForm: (data: ContactFormData): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Validate name
    const nameError = validateField(data.name, contactValidationSchema.name);
    if (nameError) errors.name = nameError;

    // Validate email
    const emailError = validateField(data.email, contactValidationSchema.email);
    if (emailError) errors.email = emailError;

    // Validate message
    const messageError = validateField(
      data.message,
      contactValidationSchema.message,
    );
    if (messageError) errors.message = messageError;

    return errors;
  },

  /**
   * Format contact data for API
   */
  formatContactData: (data: ContactFormData) => {
    return {
      ...data,
      timestamp: new Date().toISOString(),
      source: "portfolio-website",
    };
  },

  /**
   * Parse API errors to user-friendly messages
   */
  parseApiError: (error: any): string => {
    if (error.message) return error.message;
    if (typeof error === "string") return error;
    return "An unexpected error occurred. Please try again.";
  },

  /**
   * Check if data is valid for submission
   */
  isValidForSubmission: (data: ContactFormData): boolean => {
    return !!(data.name && data.email && data.message);
  },
};
