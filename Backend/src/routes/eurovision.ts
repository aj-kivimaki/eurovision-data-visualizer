import express, { Request, Response } from "express";
import EurovisionModel, { EurovisionData } from "../models/EurovisionModel";
import logger from "../utils/logger";

export const eurovisionRouter = express.Router(); // Create a new router

eurovisionRouter.use((req: Request, res: Response, next) => {
  // Log all requests to the console using the morgan middleware and the logger
  logger.info(`${req.method} ${req.url}`);
  next();
});

eurovisionRouter.get("/", async (req: Request, res: Response) => {
  // Get all Eurovision data
  try {
    const { to_country, year, from_year, to_year } = req.query; // Destructure the query parameters
    const query: { [key: string]: any } = {}; // Create an empty object to store the query

    if (to_country) query.to_country = to_country as string; // If the to_country query parameter is provided, add it to the query object

    if (from_year && to_year) {
      // If both from_year and to_year query parameters are provided, add them to the query object
      query.year = {
        // Use the $gte and $lte operators to find all Eurovision data between the from_year and to_year
        $gte: parseInt(from_year as string), // Convert the from_year and to_year query parameters to integers
        $lte: parseInt(to_year as string), // Convert the from_year and to_year query parameters to integers
      };
    } else if (year) {
      // If the year query parameter is provided, add it to the query object
      query.year = parseInt(year as string, 10); // Convert the year query parameter to an integer
    }

    const data: EurovisionData[] = await EurovisionModel.find(query); // Find all Eurovision data matching the query

    if (data.length === 0) {
      // If no Eurovision data is found matching the query, return a 404 Not Found response
      return res.status(404).json({
        message: "No Eurovision data found matching the provided queries.",
      });
    }
    res.json(data);
  } catch (error) {
    // If an error occurs, log the error and return a 500 Internal Server Error response
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
