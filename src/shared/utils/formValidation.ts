/**
 * Form Validation Utilities (TypeScript)
 * WCAG 2.1 compliant form validation with accessible error messages
 */

export type ValidationRule =
  | ((value: any) => string | null)
  | { name: "required"; fieldName: string }
  | { name: "email" }
  | { name: "minLength"; fieldName: string; value: number }
  | { name: "maxLength"; fieldName: string; value: number }
  | { name: "url" }
  | { name: "number" }
  | { name: "phone" }
  | { name: "match"; fieldName: string; value: any }
  | { name: "custom"; validate: (val: any) => string | null };

export interface ValidationSchema {
  [fieldName: string]: ValidationRule[];
}

export interface ValidationErrors {
  [fieldName: string]: string;
}

const validators: Record<
  string,
  (value: any, ...args: any[]) => string | null
> = {
  required: (value: any, fieldName: string) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  email: (value: any) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return null;
  },

  minLength: (value: any, fieldName: string, length: number) => {
    if (!value) return null;
    if (String(value).length < length) {
      return `${fieldName} must be at least ${length} characters`;
    }
    return null;
  },

  maxLength: (value: any, fieldName: string, length: number) => {
    if (!value) return null;
    if (String(value).length > length) {
      return `${fieldName} must be no more than ${length} characters`;
    }
    return null;
  },

  url: (value: any) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return "Please enter a valid URL";
    }
  },

  number: (value: any) => {
    if (!value) return null;
    if (isNaN(Number(value))) {
      return "Please enter a valid number";
    }
    return null;
  },

  phone: (value: any) => {
    if (!value) return null;
    const phoneRegex = /^[\d\s+\-()]+$/;
    if (!phoneRegex.test(value) || value.replace(/\D/g, "").length < 10) {
      return "Please enter a valid phone number";
    }
    return null;
  },

  match: (value: any, fieldName: string, otherValue: any) => {
    if (value !== otherValue) {
      return `${fieldName} does not match`;
    }
    return null;
  },

  custom: (value: any, validate: (val: any) => string | null) => {
    return validate(value);
  },
};

/**
 * Validate a single field against multiple rules
 * @param value - Field value to validate
 * @param rules - Array of validation rules
 * @returns Error message or null if valid
 */
export const validateField = (
  value: any,
  rules: ValidationRule[] = [],
): string | null => {
  for (const rule of rules) {
    if (typeof rule === "function") {
      const error = rule(value);
      if (error) return error;
    } else if (rule && "name" in rule && validators[rule.name]) {
      let error: string | null = null;

      if (rule.name === "required") {
        error = validators[rule.name](value, rule.fieldName);
      } else if (rule.name === "minLength") {
        error = validators[rule.name](value, rule.fieldName, rule.value);
      } else if (rule.name === "maxLength") {
        error = validators[rule.name](value, rule.fieldName, rule.value);
      } else if (rule.name === "match") {
        error = validators[rule.name](value, rule.fieldName, rule.value);
      } else if (rule.name === "custom") {
        error = validators[rule.name](value, rule.validate);
      } else {
        error = validators[rule.name](value);
      }

      if (error) return error;
    }
  }
  return null;
};

/**
 * Validate entire form against schema
 * @param formData - Form data object
 * @param validationSchema - Schema mapping field names to rules
 * @returns Object mapping field names to error messages
 */
export const validateForm = (
  formData: Record<string, any>,
  validationSchema: ValidationSchema,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(validationSchema).forEach((fieldName) => {
    const rules = validationSchema[fieldName];
    const value = formData[fieldName];
    const error = validateField(value, rules);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

/**
 * Check if form has any errors
 * @param errors - Errors object from validation
 * @returns true if errors exist
 */
export const hasErrors = (errors: ValidationErrors): boolean =>
  Object.keys(errors).length > 0;

/**
 * Example validation schema for clients
 */
export const clientValidationSchema: ValidationSchema = {
  name: [{ name: "required", fieldName: "Name" }],
  email: [{ name: "required", fieldName: "Email" }, { name: "email" }],
  company: [{ name: "maxLength", fieldName: "Company", value: 100 }],
  phone: [{ name: "phone" }],
};

/**
 * Example validation schema for projects
 */
export const projectValidationSchema: ValidationSchema = {
  name: [{ name: "required", fieldName: "Project Name" }],
  status: [{ name: "required", fieldName: "Status" }],
  link: [{ name: "url" }],
  imageURL: [{ name: "url" }],
};

/**
 * Example validation schema for contact form
 */
export const contactValidationSchema: ValidationSchema = {
  name: [
    { name: "required", fieldName: "Name" },
    { name: "minLength", fieldName: "Name", value: 2 },
  ],
  email: [{ name: "required", fieldName: "Email" }, { name: "email" }],
  message: [
    { name: "required", fieldName: "Message" },
    { name: "minLength", fieldName: "Message", value: 10 },
  ],
};
