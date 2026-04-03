import { Router } from "express";
import {
  getAllUsers,
  getAllProjects,
  deleteProject,
  getAllInvestments
} from "../controllers/admin.controller.js";

import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect, adminOnly);

router.get("/users", getAllUsers);
router.get("/projects", getAllProjects);
router.delete("/projects/:id", deleteProject);
router.get("/investments", getAllInvestments);

export default router;