import { type Request,type Response } from "express";
import prisma from "../config/db.ts";

export const dashboardSummary = async (_: Request, res: Response) => {
  const total = await prisma.service.count();
  const up = await prisma.service.count({ where: { status: "UP" } });
  const down = await prisma.service.count({ where: { status: "DOWN" } });

  res.json({
    totalServices: total,
    up,
    down,
    checkedAt: new Date()
  });
};

export const listDashboardServices = async (req: Request, res: Response) => {
  const env = req.query.env as string | undefined;

  const services = await prisma.service.findMany({
    where: env ? { environment: env } : {},
    orderBy: { lastCheckedAt: "desc" }
  });

  res.json(services);
};
