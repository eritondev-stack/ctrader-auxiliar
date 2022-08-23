// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const msg = req.query.text ? req.query.text : ''
    if(global.Whatsapp){
      try{
        const data = await  Whatsapp.sendMessage('5511960655281@c.us', msg as string)
        res.status(200).json(data)
      }catch(e){
        res.status(401).json({
          error: 'error connect whatsapp'
        })
      }
    
     
    }else{
      res.status(501).json({
        error: 'Whatsapp not connected'
      })
    } 
    
}
