import { Router } from "express";
import { listEmails, addEmail, removeEmail } from "../controllers/alertEmail.controller";

const router = Router();

router.get("/", listEmails);
router.post("/", addEmail);
router.delete("/:id", removeEmail);

export default router;
