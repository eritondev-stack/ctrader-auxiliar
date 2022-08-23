// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { dbSqlite } from "../../../database/sqlite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const bdSelect = await dbSqlite("TB_SCHEDULE_ALERTS").select("*");
      console.log(bdSelect);
      res.status(200).json(bdSelect);
    } catch (e) {
      res.status(401).json({
        error: e,
      });
    }
  } else if (req.method === "POST") {
    try {
      const _bdSelect = await dbSqlite("TB_SCHEDULE_ALERTS").insert(req.body)
      //console.log('Passei por aqui')
      res.status(200).json(_bdSelect);
    } catch (e) {
      res.status(401).json({
        error: e,
      });
    }
  } else {
    res.status(401).json({
      error: "error",
    });
  }
}
