import { useCallback, useEffect, useState } from "react";
import { portfolioData as defaultPortfolioData } from "../constants/portfolioData";
import type { PortfolioData } from "@/shared/types";

type PortfolioDataUpdater =
  | PortfolioData
  | ((current: PortfolioData) => PortfolioData);

const clonePortfolioData = (data: PortfolioData): PortfolioData =>
  JSON.parse(JSON.stringify(data)) as PortfolioData;

const normalizePortfolioData = (value: unknown): PortfolioData => {
  const fallback = clonePortfolioData(defaultPortfolioData);
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const candidate = value as Partial<PortfolioData>;

  return {
    hero: {
      ...fallback.hero,
      ...(candidate.hero ?? {}),
      navigation:
        candidate.hero?.navigation && candidate.hero.navigation.length > 0
          ? candidate.hero.navigation.map((item) => ({
              label: item.label || "NEW",
              href: item.href || "#",
              isRoute: Boolean(item.isRoute),
            }))
          : fallback.hero.navigation,
    },
    about: {
      ...fallback.about,
      ...(candidate.about ?? {}),
      focusItems:
        candidate.about?.focusItems?.filter(Boolean) ??
        fallback.about.focusItems,
    },
    expertise: candidate.expertise?.filter(Boolean) ?? fallback.expertise,
    techStack: candidate.techStack?.filter(Boolean) ?? fallback.techStack,
    testimonials:
      candidate.testimonials?.filter(Boolean) ?? fallback.testimonials,
    projects: candidate.projects?.filter(Boolean) ?? fallback.projects,
  };
};

let inMemoryPortfolioData: PortfolioData =
  clonePortfolioData(defaultPortfolioData);
const subscribers = new Set<(data: PortfolioData) => void>();

const notifySubscribers = (): void => {
  const snapshot = clonePortfolioData(inMemoryPortfolioData);
  subscribers.forEach((listener) => listener(snapshot));
};

const persistPortfolioData = (data: PortfolioData): void => {
  inMemoryPortfolioData = normalizePortfolioData(data);
  notifySubscribers();
};

export const getPortfolioContent = (): PortfolioData =>
  clonePortfolioData(inMemoryPortfolioData);

export const updatePortfolioContent = (
  updater: PortfolioDataUpdater,
): PortfolioData => {
  const current = getPortfolioContent();
  const next = typeof updater === "function" ? updater(current) : updater;
  persistPortfolioData(next);
  return getPortfolioContent();
};

export const resetPortfolioContent = (): PortfolioData => {
  persistPortfolioData(clonePortfolioData(defaultPortfolioData));
  return getPortfolioContent();
};

export const usePortfolioContent = () => {
  const [data, setData] = useState<PortfolioData>(() => getPortfolioContent());

  useEffect(() => {
    const subscriber = (next: PortfolioData) => setData(next);
    subscribers.add(subscriber);

    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  const save = useCallback((updater: PortfolioDataUpdater) => {
    updatePortfolioContent(updater);
  }, []);

  return {
    data,
    save,
    reset: resetPortfolioContent,
  };
};
