import { Router } from "express";
import { invest } from "../controllers/investment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protect, invest);

export default router;