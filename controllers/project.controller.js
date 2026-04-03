import { Project } from "../models/project.model.js";

export const createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    userId: req.user.id
  });

  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find().populate("userId");
  res.json(projects);
};