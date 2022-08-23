import React, { useEffect, useState } from "react";
import { getTrendlines, setStopLoss } from "../../services/helpers";
import Sidebar from "../../components/sidebar";
import { ITrendLines } from "../../model";
import { format } from 'date-fns'
import socketIOClient, { Socket } from "socket.io-client";

var socketGlobal: Socket = socketIOClient(process.env.ENDPOINT as string, {
  transports: ["websocket"],
});

const Trendlines = () => {
  const [trendline, setTrendline] = useState<ITrendLines[]>([])
  const [openPositions, setOpenPositions] = useState<any[]>([]) 
  const [valueTakeProfit, setValueTakeProfit] = useState<string[]>([])

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getTrendlines()
      console.log(response)
      let newTrendLines: ITrendLines[] = []


      const map = [...new Set(response.map(item => item.trendline))]

      for (let index = 0; index < map.length; index++) {
        const itemAlocar = response.filter((item2) => item2.trendline === map[index])[0]
        newTrendLines.push(itemAlocar)
      }
      setTrendline(newTrendLines)
    }
    socketGlobal.on('OPEN_POSITIONS', observablePositions)

    fetchMyAPI()
  }, [])


  useEffect(() => {
    return () => {
      console.log('Component desmontado')
      socketGlobal.removeListener('OPEN_POSITIONS')
    }
  }, [])

  const observablePositions = (data: any) => {
    setOpenPositions(data)
  }

  return (
    <>
      <Sidebar>

        <div style={{
          maxHeight: "600px",
          maxWidth: "720px",
        }} className="overflow-auto p-2 m-5">
          <div className="bg-white p-5 shadow-md">
            <table>
              <thead>
                <th>id</th>
                <th>Symbol</th>
                <th className="w-20">Profit</th>
                <th>select option loss</th>
              </thead>
              <tbody>
                {openPositions.map((item) => {
                  return (

                    <tr>
                      <td className="w-32 text-center">{item.id}</td>
                      <td className="w-32 text-center">{item.symbol}</td>
                      <td className={(item.profit < 0 ? 'text-red-600' : 'text-green-600') + " w-20 text-center"}>$: {item.profit.toFixed(2)}</td>
                      <td className="text-center">
                        <select onChange={async (e) => {
                          const obj = e.target.value.split(';')
                          try {
                            await setStopLoss({
                              trendline: obj[0],
                              id: obj[1],
                              symbol: obj[2]
                            })
                          } catch (error) {
                            console.log(error.message)
                          }
                        }}>
                          <option defaultValue={`none;${item.id};${item.symbol}`} value={`none;${item.id};${item.symbol}`}>
                            none
                          </option>
                          {
                            trendline.filter((item2) => item2.symbol === item.symbol).map((l) => {
                              return (
                                <option value={`${l.trendline};${item.id};${item.symbol}`}>{l.trendline}</option>
                              )
                            })
                          }
                        </select>
                      </td>
                    </tr>

                  )
                })}
              </tbody>
            </table>

          </div>

          <div className="bg-white p-5 shadow-md mt-2">
            <table>
              <thead>
                <th className="border">Symbol</th>
                <th className="border">Trendline</th>
                {/*             <th className="border">lots</th>         
            <th className="border">price</th>
            <th className="border">hour</th>
            <th className="border">digits</th> */}
              </thead>
              <tbody>
                {trendline.map((item) => {
                  return (
                    <tr>
                      <td className="border">{item.symbol}</td>
                      <td className="border w-80 text-center">{item.trendline}</td>
                      {/*                   <td className="border">{item.lots}</td>
                  <td className="border">{item.price.toFixed(item.digits)}</td>
                  <td className="border">{ format(new Date(item.hour), 'dd/MM/yy hh:mm')}</td>
                  <td className="border">{item.digits}</td> */}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Trendlines;
