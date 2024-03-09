import express, { Request, Response } from "express";
import EurovisionModel, { EurovisionData } from "../models/EurovisionModel";
import logger from "../utils/logger";

export const eurovisionRouter = express.Router();

eurovisionRouter.use((req: Request, res: Response, next) => {
  // Log all requests to the console using the morgan middleware and the logger
  logger.info(`${req.method} ${req.url}`);
  next();
});

eurovisionRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { to_country, year, from_year, to_year } = req.query;
    const query: { [key: string]: any } = {};

    if (to_country) query.to_country = to_country as string;

    if (from_year && to_year) {
      query.year = {
        $gte: parseInt(from_year as string),
        $lte: parseInt(to_year as string),
      };
    } else if (year) {
      query.year = parseInt(year as string, 10);
    }

    const data: EurovisionData[] = await EurovisionModel.find(query);

    if (data.length === 0) {
      return res.status(404).json({
        message: "No Eurovision data found matching the provided queries.",
      });
    }
    res.json(data);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
