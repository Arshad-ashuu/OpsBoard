import { Request, Response } from "express";
import prisma from "../config/db";

export const listEmails = async (_: Request, res: Response) => {
  const emails = await prisma.alertEmail.findMany();
  res.json(emails);
};

export const addEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const saved = await prisma.alertEmail.create({ data: { email } });
  res.json(saved);
};

export const removeEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.alertEmail.delete({ where: { id } });
  res.json({ ok: true });
};
