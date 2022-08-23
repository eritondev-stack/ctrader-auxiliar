import React, { useEffect, useState } from "react";
import Card from "../../components/card/index";
import { getSymbols } from "../../services/helpers";
import { countries } from "../../mock/countries";
import InputMask from 'react-input-mask'

const dashboard: React.FC = () => {
  var pares: any[] = []
 const [symbols, setSymbols] = useState<
    {
      id: number;
      symbol: string;
      price: number;
      digits: number;
      description: string;
      img_first: string;
      img_second: string;
    }[]
  >([]);
  const [opa, setOpa] = useState<any[]>([]);

useEffect(() => {
console.log(symbols)
},[symbols])

  useEffect(() => {
    getSymbols()
      .then((data) => {  
        pares = data
        setSymbols(data); 
      })
      .catch((e) => console.log(e));

    const map = countries.map((el) => {
      return {
        ...el,
        img: `https://countryflagsapi.com/svg/${String(
          el.code
        ).toLowerCase()}`,
      };
    });

    setOpa(map);
  },[])


  return (
    <>
      <div style={{
        maxHeight: "600px",
        maxWidth: "220px"
      }} className="flex flex-col overflow-auto p-2 m-5 bg-white shadow-sm hidden">
        <div className="flex flex-row items-center cursor-pointer">
          <div className="bg-gray-300" style={{
            width: '25.14px',
            height: '16px'
          }}>

          </div>
          <div className="ml-2">

            <InputMask
              onChange={(e) => console.log(e.target.value)}
            >
              {(props) => <input  {...props} className="w-36 px-2 bg-gray-100 rounded-md focus:outline-1 focus:border focus:outline-none border placeholder-gray-600 focus:placeholder-gray-500" placeholder="enter" />}
            </InputMask>
          </div>
        </div>
        {opa.map((el) => {
          return (
            <div className="flex flex-row items-center cursor-pointer">
              <div className="bg-gray-300" style={{
                width: '25.14px',
                height: '16px'
              }}>
                <img className="h-4" src={el.img} alt="" />
              </div>
              <div className="ml-2">{el.dial_code}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          maxHeight: "920px",
        }}
        className="rounded-md flex-1 backdrop-blur-sm bg-white/30 ml-2 mt-2 p-5 overflow-y-auto"
      >
         <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {symbols.map((item) => {
            return (
              <>
                <Card
                  digits={item.digits}
                  symbol={item.symbol}
                  img_first={item.img_first}
                  price={item.price.toFixed(item.digits)}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default dashboard;
