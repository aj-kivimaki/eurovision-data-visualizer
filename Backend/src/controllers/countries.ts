import express from "express";

import { getEurovisionData } from "db/eurodata";

export const getAllEurovisionData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = await getEurovisionData();
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};
