import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";
import { Investment } from "../models/investment.model.js";

// get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// get all projects
export const getAllProjects = async (req, res) => {
  const projects = await Project.find().populate("userId");
  res.json(projects);
};

// delete project
export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json({ message: "Project deleted" });
};

// get all investments
export const getAllInvestments = async (req, res) => {
  const investments = await Investment.find()
    .populate("userId")
    .populate("projectId");

  res.json(investments);
};