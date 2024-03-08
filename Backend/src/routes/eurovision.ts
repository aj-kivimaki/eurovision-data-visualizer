import express, { Request, Response } from "express";
import EurovisionModel, { EurovisionData } from "../models/EurovisionModel";

export const eurovisionRouter = express.Router();

eurovisionRouter.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

eurovisionRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { to_country, year } = req.query;
    const query: { [key: string]: any } = {};

    if (to_country) query.to_country = to_country as string;
    if (year) query.year = parseInt(year as string, 10);

    const data: EurovisionData[] = await EurovisionModel.find(query);

    if (data.length === 0) {
      return res.status(404).json({
        message: "No Eurovision data found matching the provided queries.",
      });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
