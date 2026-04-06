import React, { useEffect, useState, lazy, Suspense } from "react";
import ReactLenis from "lenis/react";
import { ErrorBoundary } from "@/shared/components";
import { Preloader } from "../components/Preloader";
import { PremiumBackground } from "../components/PremiumBackground";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { SkipLink } from "@/shared/components";
import { Hero } from "../components/Hero/Hero";
import { usePortfolioContent } from "../hooks/usePortfolioContent";

// Lazy load sections below the fold
const About = lazy(() =>
  import("../components/About/About").then((module) => ({
    default: module.About,
  })),
);
const ProjectsGallery = lazy(() =>
  import("../components/ProjectsGallery/ProjectsGallery").then((module) => ({
    default: module.ProjectsGallery,
  })),
);
const Testimonials = lazy(() =>
  import("../components/Testimonials/Testimonials").then((module) => ({
    default: module.Testimonials,
  })),
);
const Expertise = lazy(() =>
  import("../components/Expertise/Expertise").then((module) => ({
    default: module.Expertise,
  })),
);
const TechStack = lazy(() =>
  import("../components/TechStack/TechStack").then((module) => ({
    default: module.TechStack,
  })),
);
const Contact = lazy(() =>
  import("../components/Contact/Contact").then((module) => ({
    default: module.Contact,
  })),
);

const LoadingFallback = () => <div className="h-20 w-full" />;

interface SectionErrorFallbackProps {
  sectionName: string;
}

const SectionErrorFallback: React.FC<SectionErrorFallbackProps> = ({
  sectionName,
}) => (
  <div className="py-12 px-6 text-center">
    <p className="text-on-surface-variant">
      Unable to load {sectionName}. Please refresh the page.
    </p>
  </div>
);

export const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { data: portfolioData } = usePortfolioContent();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary name="Home Page">
      <ReactLenis
        root
        options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}
      >
        <div className="bg-background min-h-screen text-on-surface selection:bg-primary/30 selection:text-white relative z-0">
          <SkipLink targetId="main-content" />
          <CustomCursor />
          {loading && <Preloader onComplete={() => setLoading(false)} />}

          <PremiumBackground />

          <Header loading={loading} data={portfolioData.hero} />

          <main
            id="main-content"
            className="relative z-10 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-background rounded-none"
            tabIndex="-1"
          >
            <Hero loading={loading} data={portfolioData.hero} />

            <ErrorBoundary name="About Section">
              <Suspense fallback={<LoadingFallback />}>
                <About data={portfolioData.about} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary name="Projects Section">
              <Suspense fallback={<LoadingFallback />}>
                <ProjectsGallery data={portfolioData.projects} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary name="Testimonials Section">
              <Suspense fallback={<LoadingFallback />}>
                <Testimonials data={portfolioData.testimonials} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary name="Expertise Section">
              <Suspense fallback={<LoadingFallback />}>
                <Expertise data={portfolioData.expertise} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary name="Tech Stack Section">
              <Suspense fallback={<LoadingFallback />}>
                <TechStack data={portfolioData.techStack} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary name="Contact Section">
              <Suspense fallback={<LoadingFallback />}>
                <Contact data={portfolioData.hero} />
              </Suspense>
            </ErrorBoundary>
          </main>

          <Footer data={portfolioData.hero} />
        </div>
      </ReactLenis>
    </ErrorBoundary>
  );
};
