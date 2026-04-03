import express from "express";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import investmentRoutes from "./routes/investment.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import adminRoutes from "./routes/admin.routes.js";


const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

export default app;