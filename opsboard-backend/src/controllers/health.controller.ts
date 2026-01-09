import { type Request, type Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    service: "OpsBoard",
    runtime: "bun + typescript",
    timestamp: new Date().toISOString()
  });
};
