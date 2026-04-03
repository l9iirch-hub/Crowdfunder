import { Router } from "express";
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";
import { Investment } from "../models/investment.model.js";

const router = Router();

router.use(protect, authorizeRoles("admin"));

// liste de tous les investisseurs
router.get("/investors", async (req, res) => {
  const investors = await User.find({ role: "investor" });
  res.json(investors);
});

// liste de tous les owners
router.get("/owners", async (req, res) => {
  const owners = await User.find({ role: "owner" });
  res.json(owners);
});

// portefeuille d'un investisseur
router.get("/investor/:id", async (req, res) => {
  const investments = await Investment.find({
    investorId: req.params.id,
  }).populate("projectId");
  res.json(investments);
});

// portefeuille d'un owner
router.get("/owner/:id", async (req, res) => {
  const projects = await Project.find({ owner: req.params.id }).populate(
    "investments",
  );
  res.json(projects);
});

export default router;
