// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { dbSqlite } from "../../../database/sqlite";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const bdSelect = await dbSqlite("TB_TRENDLINES").select("*");
      res.status(200).json(bdSelect);
    } catch (e) {
      res.status(401).json({
        error: e,
      });
    }
  } else if (req.method === "POST") {
    console.log('Passei por aqui')

    try {
      if (req.body.length > 0) {
        try {
          await dbSqlite("TB_TRENDLINES").where({ trendline: req.body[0].trendline }).del()
        } catch (error) {

        }
      }
      const trx = await dbSqlite.transaction();
      for (const item of req.body) {
        await trx("TB_TRENDLINES").insert(item)
      }
      await trx.commit()
      console.log("fim do loop")
      //console.log(req.body);
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

