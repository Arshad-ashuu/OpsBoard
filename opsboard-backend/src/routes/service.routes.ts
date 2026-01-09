import { Router } from "express";
import {
  registerService,
  listServices
} from "../controllers/service.controller.ts";

const router = Router();

// POST /services/register
router.post("/register", registerService);

// GET /services
router.get("/", listServices);

export default router;
