import { Router } from "express";
import { createProject, getProjects } from "../controllers/project.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/", createProject);
router.get("/", getProjects);

export default router;