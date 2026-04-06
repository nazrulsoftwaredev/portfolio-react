import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export type ToastType = "info" | "success" | "error" | "warning";

interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}

export const useOverviewActions = () => {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToasts((previous) => [
      ...previous,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        message,
        type,
      },
    ]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);

  const navigateTo = useCallback(
    (path: string, message?: string, type: ToastType = "info") => {
      if (message) {
        showToast(message, type);
      }
      navigate(path);
    },
    [navigate, showToast],
  );

  return {
    toasts,
    showToast,
    dismissToast,
    navigateTo,
  };
};
