import { Router } from "express";
import {
  dashboardSummary,
  listDashboardServices
} from "../controllers/dashboard.controller.ts";

const router = Router();

router.get("/summary", dashboardSummary);
router.get("/services", listDashboardServices);

export default router;
