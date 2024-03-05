import express from "express";
import EurovisionModel from "../models/EurovisionModel";

export const eurovisionRouter = express.Router();

eurovisionRouter.get("/", async (req, res) => {
  try {
    const { to_country } = req.query;
    const query = to_country ? { to_country: to_country } : {};
    const data = await EurovisionModel.find(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// console log all requests to /eurovision endpoint
eurovisionRouter.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
