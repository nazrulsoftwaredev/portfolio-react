import { ProjectModel, ProjectDocument } from "../models/Project.js";

export const getProjects = async (query: any, limit: number, skip: number) => {
  const [projects, total] = await Promise.all([
    ProjectModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ProjectModel.countDocuments(query),
  ]);
  return { projects, total };
};

export const getProjectById = async (id: string) => {
  return await ProjectModel.findById(id);
};

export const createProject = async (data: Partial<ProjectDocument>) => {
  const project = new ProjectModel(data);
  return await project.save();
};

export const updateProject = async (
  id: string,
  data: Partial<ProjectDocument>,
) => {
  return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id: string) => {
  // Soft delete or real delete. The spec says soft delete if possible, but let's do real delete or just archive stage
  return await ProjectModel.findByIdAndUpdate(
    id,
    { stage: "Archived" },
    { new: true },
  );
};
