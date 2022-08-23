// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    global.SocketServer.emit("MT5", req.body)
    try {

      res.status(200).json({ status: "Ok" })

    } catch (e) {
      res.status(401).json({
        error: 'error'
      })
    }
  } else if (req.method === "GET") {
    try {
      const json: string[] = JSON.parse(req.query.data as string)
      const convert = json.map((el) => {
        const obj = el.split(";")
        return {
          symbol: obj[0],
          price: Number(obj[1]),
          digits: Number(obj[2])
        }
      })
      global.SocketServer.emit('MT5_SOCKET', convert)
      res.status(200).json({ status: "Ok" })

    } catch (e) {
      console.log(e.message)
      res.status(401).json({
        error: 'error'
      })
    }
  } else {
    res.status(401).json({
      error: 'error'
    })
  }
}
