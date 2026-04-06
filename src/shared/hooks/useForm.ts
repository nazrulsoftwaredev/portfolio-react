import { useState, useCallback } from "react";

export interface FormErrors {
  [key: string]: string;
}

export interface TouchedFields {
  [key: string]: boolean;
}

export interface UseFormReturn<T> {
  formData: T;
  errors: FormErrors;
  touched: TouchedFields;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  setValues: (values: T) => void;
  setFieldError: (fieldName: string, error: string) => void;
}

export interface FormError extends Error {
  errors?: FormErrors;
}

/**
 * Custom hook for form management
 * Handles form state, validation, and submission
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (formData: T) => Promise<void>,
  onError?: (error: FormError) => void,
): UseFormReturn<T> => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  // Handle blur (mark as touched)
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    },
    [],
  );

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        // Call onSubmit with form data
        // onSubmit should validate and throw error if invalid
        await onSubmit(formData);
        setSubmitSuccess(true);
        setErrors({});
      } catch (error) {
        const formError = error as FormError;
        const errorMessage = formError.message || "An error occurred";

        // Check if error has field-specific messages
        if (formError.errors && typeof formError.errors === "object") {
          setErrors(formError.errors);
        } else {
          setSubmitError(errorMessage);
        }

        // Call optional error handler
        onError?.(formError);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, onError],
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError(null);
    setSubmitSuccess(false);
  }, [initialValues]);

  // Set form data programmatically
  const setValues = useCallback((values: T) => {
    setFormData(values);
  }, []);

  // Set field-specific error
  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  }, []);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    submitError,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setFieldError,
  };
};
