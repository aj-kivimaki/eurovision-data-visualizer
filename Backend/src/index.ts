import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import EurovisionModel from "./db/eurodata";

require("dotenv").config(); // Load environment variables from .env file

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const router = express.Router();

server.listen(8080, () => {
  console.log("Server is running on port http://localhost:8080/");
});

mongoose.Promise = global.Promise; // Use Node.js global Promise library

mongoose.connect(MONGO_URL);

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

app.get("/eurovision", async (req, res) => {
  try {
    const data = await EurovisionModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
