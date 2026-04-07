import React from "react";
import { errorReporter } from "@/shared/services";
import { Error500 } from "@/shared/pages/errors";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  name?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string | null;
}

/**
 * Error Boundary component that catches React errors
 * and displays a fallback UI with error details
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    this.setState({
      error,
      errorInfo,
      errorId,
    });

    errorReporter.captureException(error, {
      componentStack: errorInfo.componentStack,
      errorId,
      errorBoundaryName: this.props.name ?? "Application",
    });

    if (import.meta.env.DEV) {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Error500
          errorId={this.state.errorId}
          error={this.state.error}
          componentStack={this.state.errorInfo?.componentStack ?? null}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
