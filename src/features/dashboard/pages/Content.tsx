import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Button } from "@/components/ui";
import { usePortfolioContent } from "@/features/portfolio/hooks/usePortfolioContent";
import {
  AboutSection,
  ExpertiseTechSection,
  NavigationSection,
  ProjectsSection,
  SectionSwitcher,
  SiteIdentitySection,
  TestimonialsSection,
} from "../components/Content";
import { PageHeader } from "../components/common";

type SaveState = "saved" | "saving" | "error";
type ContentSectionId =
  | "identity"
  | "navigation"
  | "projects"
  | "about"
  | "expertise"
  | "testimonials";

export const Content: React.FC = () => {
  const { data, save, reset } = usePortfolioContent();
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [isDirty, setIsDirty] = useState(false);
  const [activeSection, setActiveSection] =
    useState<ContentSectionId>("identity");

  const updateDraft = useCallback(
    (updater: (previous: PortfolioData) => PortfolioData) => {
      setDraft((previous) => updater(previous));
      setIsDirty(true);
    },
    [],
  );

  useEffect(() => {
    setDraft(data);
    setSaveState("saved");
    setIsDirty(false);
  }, [data]);

  useEffect(() => {
    if (!isDirty) {
      setSaveState("saved");
      return;
    }

    setSaveState("saving");
    const timer = window.setTimeout(() => {
      try {
        save(draft);
        setSaveState("saved");
        setIsDirty(false);
      } catch {
        setSaveState("error");
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [draft, isDirty, save]);

  const updateHeroField = (
    field: keyof PortfolioData["hero"],
    value: string,
  ) => {
    updateDraft((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        [field]: value,
      },
    }));
  };

  const updateAboutField = (field: keyof AboutContent, value: string) => {
    updateDraft((previous) => ({
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
    updateDraft((previous) => {
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => {
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
    updateDraft((previous) => {
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => {
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => {
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => {
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => {
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
    updateDraft((previous) => ({
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
    updateDraft((previous) => ({
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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-14">
      <div>
        <PageHeader
          className="gap-6"
          title={
            <>
              Website content <br />
              architecture
            </>
          }
          titleClassName="text-3xl md:text-4xl"
          subtitle={
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {saveMessage}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                Content ops
              </span>
            </div>
          }
          actions={
            <>
              <Button
                variant="outline"
                className="gap-2"
                type="button"
                onClick={() => {
                  window.open("/", "_blank");
                }}
              >
                <Monitor className="w-4 h-4" />
                Preview Live
              </Button>
              <Button
                className="gap-2"
                type="button"
                onClick={() => {
                  save(draft);
                  setSaveState("saved");
                  setIsDirty(false);
                }}
              >
                <Check className="w-4 h-4" />
                Publish Sync
              </Button>
              <Button
                variant="secondary"
                className="gap-2"
                type="button"
                onClick={() => {
                  reset();
                  setSaveState("saved");
                  setIsDirty(false);
                }}
              >
                <ChevronRight className="w-4 h-4" />
                Reset
              </Button>
            </>
          }
        />
      </div>

      <div>
        <SectionSwitcher
          sections={sections}
          activeSection={activeSection}
          onChange={(sectionId) =>
            setActiveSection(sectionId as ContentSectionId)
          }
        />
      </div>

      <div className="pt-1">{renderActiveSection()}</div>
    </div>
  );
};
