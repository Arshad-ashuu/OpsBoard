import { type Request, type Response } from "express";
import prisma from "../config/db.ts"

// POST /services/register
export const registerService = async (req: Request, res: Response) => {
  try {
    const { name, environment, url } = req.body;

    // basic validation
    if (!name || !environment || !url) {
      return res.status(400).json({
        message: "name, environment and url are required"
      });
    }

    const service = await prisma.service.create({
      data: {
        name,
        environment,
        url
      }
    });

    return res.status(201).json(service);
  } catch (error) {
    console.error("Register service error:", error);
    return res.status(500).json({
      message: "Failed to register service"
    });
  }
};

// GET /services
export const listServices = async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json(services);
  } catch (error) {
    console.error("List services error:", error);
    return res.status(500).json({
      message: "Failed to fetch services"
    });
  }
};
