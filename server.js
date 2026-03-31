require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const investmentRoutes = require("./routes/investment.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
connectDB();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
