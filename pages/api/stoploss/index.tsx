// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { dbSqlite } from "../../../database/sqlite";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const bdSelect = await dbSqlite("TB_POSITIONS_STOPLOSS_TRENDLINES").select("*");
      res.status(200).json(bdSelect);
    } catch (e) {
      res.status(401).json({
        error: e,
      });
    }
  } else if (req.method === "POST") {
    console.log(req.body)
    try {

      try {
        await dbSqlite("TB_POSITIONS_STOPLOSS_TRENDLINES").where({ id: req.body.id }).del()
      } catch (error) {
      }
      if (req.body.trendline === 'none') {
        await dbSqlite("TB_POSITIONS_STOPLOSS_TRENDLINES").where({ id: req.body.id }).del()
      } else {
        await dbSqlite("TB_POSITIONS_STOPLOSS_TRENDLINES").insert(req.body)
      }
      res.status(200).json({ status: 'Ok' });
    } catch (e) {
      console.log(e.message)
      res.status(401).json({
        error: e,
      });
    }
  } else if (req.method === "DELETE") {
    console.log(req.query)
    try {

      await dbSqlite("TB_TRENDLINES").where({ trendline: req.query.name }).del()

      res.status(200).json({ status: 'Ok' });
    } catch (e) {
      console.log(e.message)
      res.status(401).json({
        error: e,
      });
    }
  }

  else {
    res.status(401).json({
      error: "error",
    });
  }
}

