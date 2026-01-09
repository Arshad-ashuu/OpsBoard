import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.ts";
import serviceRoutes from "./routes/service.routes.ts";
import dashboardRoutes from "./routes/dashboard.routes.ts";
import alertEmailRoutes from "./routes/alertEmail.routes";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // 🔥 THIS LINE FIXES IT
  }

  next();
});

app.use(express.json());
app.use("/alerts/emails", alertEmailRoutes);
app.use("/health", healthRoutes);
app.use("/services", serviceRoutes);
app.use("/dashboard", dashboardRoutes);

export default app;
