import React, { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Tablet, Eye, EyeOff } from "lucide-react";
import { Hero } from "../../components/sections/Hero";
import { About } from "../../components/sections/About";
import { Expertise } from "../../components/sections/Expertise";
import { TechStack } from "../../components/sections/TechStack";
import { ProjectsGallery } from "../../components/sections/ProjectsGallery";
import { Testimonials } from "../../components/sections/Testimonials";

const DEVICE_SIZES = {
  mobile: { width: 375, label: "Mobile", icon: Smartphone },
  tablet: { width: 768, label: "Tablet", icon: Tablet },
  desktop: { width: 1200, label: "Desktop", icon: Monitor },
};

export const ContentPreview = ({
  sectionType, // 'hero', 'about', 'expertise', 'techstack', 'projects', 'testimonials'
  data,
  isVisible = true,
}) => {
  const [deviceSize, setDeviceSize] = useState("desktop");
  const [showPreview, setShowPreview] = useState(isVisible);

  if (!showPreview) {
    return (
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 min-h-96">
        <EyeOff className="w-8 h-8 text-on-surface-variant" />
        <p className="text-on-surface-variant font-medium">Preview Hidden</p>
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition-colors"
        >
          <Eye className="w-4 h-4" />
          Show Preview
        </button>
      </div>
    );
  }

  const renderPreview = () => {
    // Create a mock data context for preview rendering
    const previewContext = {
      hero: data,
      content: data,
      items: data,
      projects: data,
      quote: data?.quote || data,
      author: data?.author,
    };

    switch (sectionType) {
      case "hero":
        return <Hero />;
      case "about":
        return <About />;
      case "expertise":
        return <Expertise />;
      case "techstack":
        return <TechStack />;
      case "projects":
        return <ProjectsGallery />;
      case "testimonials":
        return <Testimonials />;
      default:
        return (
          <div className="p-8 text-on-surface-variant">
            No preview available for this section
          </div>
        );
    }
  };

  const currentDevice = DEVICE_SIZES[deviceSize];
  const CurrentIcon = currentDevice.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-on-surface/5 border border-border rounded-2xl overflow-hidden"
    >
      {/* Preview Header Controls */}
      <div className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-primary" />
          <span className="font-semibold text-on-surface">Live Preview</span>
        </div>

        {/* Device Size Selector */}
        <div className="flex items-center gap-2 bg-on-surface/10 rounded-lg p-1">
          {Object.entries(DEVICE_SIZES).map(([key, { label, icon: Icon }]) => (
            <button
              key={key}
              onClick={() => setDeviceSize(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-colors duration-200 ${
                deviceSize === key
                  ? "bg-primary text-white"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              title={label}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Hide Preview Button */}
        <button
          onClick={() => setShowPreview(false)}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-on-surface/10 rounded-lg transition-colors"
          title="Hide preview"
        >
          <EyeOff className="w-4 h-4" />
          <span className="hidden sm:inline">Hide</span>
        </button>
      </div>

      {/* Preview Container */}
      <div className="bg-background p-6 overflow-x-auto">
        <div
          className="mx-auto bg-background rounded-xl border border-border overflow-hidden shadow-xl transition-all duration-300"
          style={{
            width: `${currentDevice.width}px`,
          }}
        >
          {/* Device Frame */}
          <div className="bg-background">
            <div className="overflow-hidden">{renderPreview()}</div>
          </div>
        </div>
      </div>

      {/* Preview Info */}
      <div className="bg-surface border-t border-border px-6 py-3 flex items-center justify-between text-xs">
        <span className="text-on-surface-variant">
          Viewing at {currentDevice.width}px ({currentDevice.label})
        </span>
        <span className="text-on-surface-variant font-medium">
          Updates in real-time as you edit
        </span>
      </div>
    </motion.div>
  );
};
