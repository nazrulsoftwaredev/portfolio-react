/**
 * Dashboard Feature API Services
 * Business logic and data processing for dashboard feature
 */

export const dashboardService = {
  /**
   * Validate login credentials
   */
  validateLoginCredentials: (
    email: string,
    password: string,
  ): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    return errors;
  },

  /**
   * Check if user has permission for resource
   */
  hasPermission: (userRole: string, requiredRole: string): boolean => {
    const roleHierarchy: Record<string, number> = {
      admin: 3,
      user: 2,
      guest: 1,
    };

    return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
  },

  /**
   * Format metric change percentage
   */
  formatMetricChange: (change: number | undefined): string => {
    if (!change) return "No change";
    const sign = change > 0 ? "+" : "";
    return `${sign}${change}%`;
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
   * Check if user session is valid
   */
  isSessionValid: (token: string | null, expiresAt: number | null): boolean => {
    if (!token || !expiresAt) return false;
    return Date.now() < expiresAt;
  },
};
