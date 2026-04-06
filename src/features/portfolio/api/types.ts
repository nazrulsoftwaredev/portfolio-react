/**
 * Portfolio API Types
 */

export interface PortfolioApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ProjectSubmission {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
}
