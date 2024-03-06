import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectToDatabase } from "./config/database";
import { eurovisionRouter } from "./routes/eurovision";
import morgan from "morgan";

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors()); // Enable All CORS Requests
app.use(compression()); // Compress all routes and responses
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(bodyParser.json()); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(morgan(":method :url :status :response-time ms")); // Logging HTTP requests to the console

app.use("/eurovision", eurovisionRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Eurovision API 🎤 A typescript project for React23s");
});

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on port http://localhost:8080/");
});

connectToDatabase(MONGO_URL);
