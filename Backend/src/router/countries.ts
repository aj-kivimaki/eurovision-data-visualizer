import express from "express";

import { getAllEurovisionData } from "controllers/countries";

export default (router: express.Router) => {
  router.get("/eurovision", getAllEurovisionData);
};
