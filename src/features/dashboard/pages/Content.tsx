import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Monitor } from "lucide-react";
import type {
  AboutContent,
  Expertise,
  FocusItem,
  PortfolioData,
  ProjectGalleryItem,
  TechDomain,
  Testimonial,
} from "@/shared/types";
import { PremiumButton } from "../components/PremiumButton";
import { usePortfolioContent } from "@/features/portfolio/hooks/usePortfolioContent";
import {
  AboutSection,
  ExpertiseTechSection,
  MappingSection,
  NavigationSection,
  ProjectsSection,
  SectionSwitcher,
  SiteIdentitySection,
  TestimonialsSection,
} from "../components/Content";
import { PageHeader } from "../components/common";
import {
  dashboardContainerVariants,
  dashboardItemVariants,
} from "../constants/animationVariants";

type SaveState = "saved" | "saving" | "error";
type ContentSectionId =
  | "identity"
  | "navigation"
  | "projects"
  | "about"
  | "expertise"
  | "testimonials"
  | "mapping";

export const Content: React.FC = () => {
  const { data, save, reset } = usePortfolioContent();
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [activeSection, setActiveSection] =
    useState<ContentSectionId>("identity");

  const sourceSnapshot = useMemo(() => JSON.stringify(data), [data]);
  const draftSnapshot = useMemo(() => JSON.stringify(draft), [draft]);

  useEffect(() => {
    setDraft(data);
  }, [sourceSnapshot, data]);

  useEffect(() => {
    if (draftSnapshot === sourceSnapshot) {
      setSaveState("saved");
      return;
    }

    setSaveState("saving");
    const timer = window.setTimeout(() => {
      try {
        save(draft);
        setSaveState("saved");
      } catch {
        setSaveState("error");
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [draftSnapshot, sourceSnapshot, draft, save]);

  const updateHeroField = (
    field: keyof PortfolioData["hero"],
    value: string,
  ) => {
    setDraft((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        [field]: value,
      },
    }));
  };

  const updateAboutField = (field: keyof AboutContent, value: string) => {
    setDraft((previous) => ({
      ...previous,
      about: {
        ...previous.about,
        [field]: value,
      },
    }));
  };

  const updateFocusItem = (
    index: number,
    field: keyof FocusItem,
    value: string,
  ) => {
    setDraft((previous) => {
      const focusItems = [...(previous.about.focusItems || [])];
      focusItems[index] = {
        ...focusItems[index],
        [field]: value,
      };

      return {
        ...previous,
        about: {
          ...previous.about,
          focusItems,
        },
      };
    });
  };

  const addFocusItem = () => {
    setDraft((previous) => ({
      ...previous,
      about: {
        ...previous.about,
        focusItems: [
          ...(previous.about.focusItems || []),
          {
            title: "New Focus",
            description: "Describe this focus area",
          },
        ],
      },
    }));
  };

  const removeFocusItem = (index: number) => {
    setDraft((previous) => ({
      ...previous,
      about: {
        ...previous.about,
        focusItems: (previous.about.focusItems || []).filter(
          (_, itemIndex) => itemIndex !== index,
        ),
      },
    }));
  };

  const updateNavigation = (
    index: number,
    field: "label" | "href" | "isRoute",
    value: string | boolean,
  ) => {
    setDraft((previous) => {
      const navigation = [...(previous.hero.navigation || [])];
      navigation[index] = {
        ...navigation[index],
        [field]: value,
      };

      return {
        ...previous,
        hero: {
          ...previous.hero,
          navigation,
        },
      };
    });
  };

  const moveNavigation = (index: number, direction: -1 | 1) => {
    setDraft((previous) => {
      const navigation = [...(previous.hero.navigation || [])];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= navigation.length) {
        return previous;
      }

      const current = navigation[index];
      navigation[index] = navigation[targetIndex];
      navigation[targetIndex] = current;

      return {
        ...previous,
        hero: {
          ...previous.hero,
          navigation,
        },
      };
    });
  };

  const addNavigation = () => {
    setDraft((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        navigation: [
          ...(previous.hero.navigation || []),
          {
            label: "New Link",
            href: "#section",
            isRoute: false,
          },
        ],
      },
    }));
  };

  const removeNavigation = (index: number) => {
    setDraft((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        navigation: (previous.hero.navigation || []).filter(
          (_, navIndex) => navIndex !== index,
        ),
      },
    }));
  };

  const updateProject = (
    index: number,
    field: keyof ProjectGalleryItem,
    value: string,
  ) => {
    setDraft((previous) => {
      const projects = [...previous.projects];
      projects[index] = {
        ...projects[index],
        [field]: value,
      };

      return {
        ...previous,
        projects,
      };
    });
  };

  const addProject = () => {
    setDraft((previous) => ({
      ...previous,
      projects: [
        ...previous.projects,
        {
          img: "https://picsum.photos/seed/new-project/800/600",
          category: "New Category",
          title: "New Project",
          desc: "Project description",
          liveUrl: "#",
          status: "Draft",
        },
      ],
    }));
  };

  const removeProject = (index: number) => {
    setDraft((previous) => ({
      ...previous,
      projects: previous.projects.filter(
        (_, projectIndex) => projectIndex !== index,
      ),
    }));
  };

  const updateExpertise = (
    index: number,
    field: keyof Expertise,
    value: string,
  ) => {
    setDraft((previous) => {
      const expertise = [...previous.expertise];
      expertise[index] = {
        ...expertise[index],
        [field]: value,
      };

      return {
        ...previous,
        expertise,
      };
    });
  };

  const addExpertise = () => {
    setDraft((previous) => ({
      ...previous,
      expertise: [
        ...previous.expertise,
        {
          title: "New Expertise",
          category: "Web",
          description: "Describe this capability",
        },
      ],
    }));
  };

  const removeExpertise = (index: number) => {
    setDraft((previous) => ({
      ...previous,
      expertise: previous.expertise.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const updateTechDomain = (
    index: number,
    field: keyof TechDomain,
    value: string,
  ) => {
    setDraft((previous) => {
      const techStack = [...previous.techStack];
      techStack[index] = {
        ...techStack[index],
        [field]:
          field === "items"
            ? value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : value,
      };

      return {
        ...previous,
        techStack,
      };
    });
  };

  const addTechDomain = () => {
    setDraft((previous) => ({
      ...previous,
      techStack: [
        ...previous.techStack,
        {
          category: "New Domain",
          items: ["Skill"],
        },
      ],
    }));
  };

  const removeTechDomain = (index: number) => {
    setDraft((previous) => ({
      ...previous,
      techStack: previous.techStack.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: string,
  ) => {
    setDraft((previous) => {
      const testimonials = [...previous.testimonials];
      testimonials[index] = {
        ...testimonials[index],
        [field]: value,
      };

      return {
        ...previous,
        testimonials,
      };
    });
  };

  const addTestimonial = () => {
    setDraft((previous) => ({
      ...previous,
      testimonials: [
        ...previous.testimonials,
        {
          quote: "Write a testimonial",
          author: "Author Name",
          company: "Company",
        },
      ],
    }));
  };

  const removeTestimonial = (index: number) => {
    setDraft((previous) => ({
      ...previous,
      testimonials: previous.testimonials.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const saveMessage =
    saveState === "saving"
      ? "SYNCING CONTENT..."
      : saveState === "error"
        ? "SAVE FAILED"
        : "LIVE CONTENT READY";

  const sections = useMemo(
    () => [
      { id: "identity", label: "Site Identity" },
      {
        id: "navigation",
        label: "Navigation",
        count: (draft.hero.navigation || []).length,
      },
      { id: "projects", label: "Projects", count: draft.projects.length },
      {
        id: "about",
        label: "About",
        count: (draft.about.focusItems || []).length,
      },
      {
        id: "expertise",
        label: "Expertise + Tech",
        count: draft.expertise.length + draft.techStack.length,
      },
      {
        id: "testimonials",
        label: "Testimonials",
        count: draft.testimonials.length,
      },
      { id: "mapping", label: "Field Mapping" },
    ],
    [draft],
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "identity":
        return (
          <SiteIdentitySection
            hero={draft.hero}
            onUpdateHero={updateHeroField}
          />
        );
      case "navigation":
        return (
          <NavigationSection
            navigation={draft.hero.navigation}
            onUpdate={updateNavigation}
            onMove={moveNavigation}
            onAdd={addNavigation}
            onRemove={removeNavigation}
          />
        );
      case "projects":
        return (
          <ProjectsSection
            projects={draft.projects}
            onUpdateProject={updateProject}
            onAddProject={addProject}
            onRemoveProject={removeProject}
          />
        );
      case "about":
        return (
          <AboutSection
            about={draft.about}
            onUpdateAbout={updateAboutField}
            onUpdateFocusItem={updateFocusItem}
            onAddFocusItem={addFocusItem}
            onRemoveFocusItem={removeFocusItem}
          />
        );
      case "expertise":
        return (
          <ExpertiseTechSection
            expertise={draft.expertise}
            techStack={draft.techStack}
            onUpdateExpertise={updateExpertise}
            onAddExpertise={addExpertise}
            onRemoveExpertise={removeExpertise}
            onUpdateTechDomain={updateTechDomain}
            onAddTechDomain={addTechDomain}
            onRemoveTechDomain={removeTechDomain}
          />
        );
      case "testimonials":
        return (
          <TestimonialsSection
            testimonials={draft.testimonials}
            onUpdateTestimonial={updateTestimonial}
            onAddTestimonial={addTestimonial}
            onRemoveTestimonial={removeTestimonial}
          />
        );
      case "mapping":
        return <MappingSection draft={draft} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={dashboardContainerVariants}
      initial={false}
      animate="visible"
      className="space-y-14"
    >
      <motion.div variants={dashboardItemVariants}>
        <PageHeader
          title={
            <>
              WEBSITE CONTENT <br />
              ARCHITECTURE
            </>
          }
          subtitle={
            <>
              DEPLOYMENT:{" "}
              <span className="text-accent-primary">{saveMessage}</span>
            </>
          }
          actions={
            <>
              <PremiumButton
                variant="outline"
                icon={Monitor}
                type="button"
                onClick={() => {
                  window.open("/", "_blank");
                }}
              >
                PREVIEW LIVE
              </PremiumButton>
              <PremiumButton
                variant="primary"
                icon={Check}
                type="button"
                onClick={() => {
                  save(draft);
                  setSaveState("saved");
                }}
              >
                PUBLISH SYNC
              </PremiumButton>
              <PremiumButton
                variant="secondary"
                icon={ChevronRight}
                type="button"
                onClick={() => {
                  reset();
                  setSaveState("saved");
                }}
              >
                RESET
              </PremiumButton>
            </>
          }
        />
      </motion.div>

      <motion.div variants={dashboardItemVariants}>
        <SectionSwitcher
          sections={sections}
          activeSection={activeSection}
          onChange={(sectionId) =>
            setActiveSection(sectionId as ContentSectionId)
          }
        />
      </motion.div>

      <motion.div variants={dashboardItemVariants} className="pt-1">
        {renderActiveSection()}
      </motion.div>
    </motion.div>
  );
};
