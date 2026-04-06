import React from "react";
import { errorReporter } from "@/shared/services";

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
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="max-w-md w-full">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 4v2M9 3h6a6 6 0 016 6v12a6 6 0 01-6 6H9a6 6 0 01-6-6V9a6 6 0 016-6z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-on-background mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-on-surface-variant">
                We've logged this error and our team will look into it.
              </p>
            </div>

            {this.state.errorId && (
              <div className="bg-surface rounded-lg p-4 mb-6 border border-outline/20">
                <p className="text-xs font-mono text-on-surface-variant break-all">
                  Error ID:{" "}
                  <span className="text-primary">{this.state.errorId}</span>
                </p>
              </div>
            )}

            {isDevelopment && this.state.error && (
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mb-6 max-h-48 overflow-auto">
                <h2 className="text-sm font-bold text-red-500 mb-2">
                  Error Details (Dev Only)
                </h2>
                <p className="text-xs font-mono text-red-400 whitespace-pre-wrap break-word">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo?.componentStack && (
                  <>
                    <p className="text-xs font-bold text-red-500 mt-3 mb-1">
                      Component Stack:
                    </p>
                    <p className="text-xs font-mono text-red-400 whitespace-pre-wrap break-word">
                      {this.state.errorInfo.componentStack}
                    </p>
                  </>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2 bg-primary text-primary-contrast rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 px-4 py-2 bg-surface border border-outline text-on-background rounded-lg font-medium hover:bg-surface/80 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
