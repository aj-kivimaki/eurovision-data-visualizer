import express from "express";

const router = express.Router();
import countries from "./countries";

export default (): express.Router => {
  countries(router);

  return router;
};
