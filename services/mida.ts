const access = {
    clientId: "3369_kGf0PTNhOrFR3myRVJ3U4vcNXsXPv6dKljqstauXfkxYabyvbd",
    clientSecret: "pH80pT5BQhedjuXU7KJmwd4nsIEXOHwE8QHdsJndE9RFEgxl4f",
    accessToken: "oa4zLjCpgAuW_Y6sORowPJSpuE2xqBFxsE3S-MJ0bfE",
    cTraderBrokerAccountId: "22250731",
};

import { login, Mida } from "@reiryoku/mida";
import { CTraderPlugin } from "@reiryoku/mida-ctrader";
import { format } from "date-fns";
import { dbSqlite } from "../database/sqlite";
import { ISymbols } from "../model";

Mida.use(new CTraderPlugin())

var allPairs: {
    symbol: string;
    price: number;
    digits?: number;
    description?: string;
    img_first?: string
    img_second?: string
}[] = []

interface IAllPairs {
    symbol: string;
    price: number;
    digits?: number;
    description?: string;
    img_first?: string
    img_second?: string
}[]

async function startDatabaseCtrader() {
    try {
        const bdSelect = await dbSqlite<IAllPairs>('TB_SYMBOLS').select("*")
        for (const item of bdSelect) {
            allPairs.push(item)
        }
        global.SocketServer.emit('ON_MT5', allPairs)
    } catch (err) {
        console.log(err)
    }
}
async function loginAccount() {
    if (global.AccountMida === undefined) {
        const myAccount = await login("cTrader", access);
        global.AccountMida = myAccount
    }
}

async function getAllSymbols() {
    try {
        await loginAccount()
        const symbols = await dbSqlite<ISymbols>('TB_SYMBOLS').select("*")

        const onePart = await symbols.filter((_array, index) => {
            return index < 50
        })

        const twoPart = await symbols.filter((_array, index) => {
            return index >= 50 && index < 100
        })

        const treePart = await symbols.filter((_array, index) => {
            return index >= 100 && index < 150
        })

        const data: { price: number, symbol: string }[] = []

        for (const item of onePart) {
            let result;
            try {
                result = await global.AccountMida.getSymbolBid(item.symbol)
            } catch (error) {
                result = -1
            }
            data.push({
                symbol: item.symbol,
                price: result
            })
        }
        await later(1100)
        //console.log(new Date())
        for (const item of twoPart) {
            let result;
            try {
                result = await global.AccountMida.getSymbolBid(item.symbol)
            } catch (error) {
                result = -1
            }
            data.push({
                symbol: item.symbol,
                price: result
            })
        }
        await later(1100)
        //console.log(new Date())
        for (const item of treePart) {
            let result
            try {
                result = await global.AccountMida.getSymbolBid(item.symbol)
            } catch (error) {
                result = -1
            }
            data.push({
                symbol: item.symbol,
                price: result
            })
        }
        await later(1100)
        //console.log(new Date())
        for (const item of data) {
            //console.log(item.price)
            global.SocketServer.emit(item.symbol, Number(String(item.price).replace('d', '')))
        }

        for (const item of data) {
            handlePositionStopLossTrendLines(item.price, item.symbol).then().catch()
        }
        //console.log(Number(String(item.price).replace('d', '')))


        //observableAlertV2(symbol, price).then(() => { }).catch((_err) => { console.log(_err) })
        await getAllSymbols()

        /* 
        for (const item of data) {
            const objIndex = allPairs.findIndex((obj => obj.symbol === item.symbol));
            allPairs[objIndex].price = item.price
        }

        console.log("Total Symbols: " + allPairs.length)
        global.SocketServer.emit("CTRADER", allPairs) */

    } catch (error) {
        console.log('Aconteceu algum erro' + error.message)
        await getAllSymbols()
        throw new Error("Acounteceu algum erro na promessa");
    }

}

async function handlePositionStopLossTrendLines(_priceReal: number, symbol: string) {

    const dateCurrentCtrader = await (await global.AccountMida.getDate()).subtractHours(3)
    //console.log(new Date(dateCurrentCtrader.iso))
    const newDate = (`${format(new Date(dateCurrentCtrader.iso), 'yyyy')}-${format(new Date(dateCurrentCtrader.iso), 'MM')}-${format(new Date(dateCurrentCtrader.iso), 'dd')}T${dateCurrentCtrader.hours}:00:00`)

    //console.log('Outro date: ' + newDate)

    const orders = await global.AccountMida.getOpenPositions()
    for (const item of orders) {
        const id = item.id
        const stopLossTrendLine: { symbol: string, trendline: string, id: number }[] = await dbSqlite("TB_POSITIONS_STOPLOSS_TRENDLINES").where({ symbol: symbol, id: id }).select('*')
        if (stopLossTrendLine.length > 0) {
            const priceStopLossTrend = await dbSqlite("TB_TRENDLINES").where({ trendline: stopLossTrendLine[0].trendline, hour: newDate }).select('*')
            if (priceStopLossTrend.length > 0) {
                const stopLoss = Number(priceStopLossTrend[0].price)
                const takeProfit = Number(priceStopLossTrend[0].take_profit)
                try {

                    if (item.stopLoss.toNumber() === stopLoss && item.takeProfit.toNumber() === takeProfit) {
                        console.log('Fazer nada')
                    } else {
                        await item.changeProtection({
                            stopLoss: stopLoss,
                            takeProfit: takeProfit
                        })
                    }

                } catch (e) {
                    console.log(e.message)
                }
            }
        }

    }


}

async function handleOpenPosition() {
    setInterval(async () => {
        const orders = await AccountMida.getOpenPositions()
        let ondersSerialize = []

        for (const item of orders) {
            const profit = await item.getUnrealizedGrossProfit()
            const commission = await item.getUnrealizedCommission()
            const swap = await item.getUnrealizedSwap()
            ondersSerialize.push({
                id: item.id,
                direction: item.direction,
                symbol: item.symbol,
                profit: profit.toNumber() + commission.toNumber() + swap.toNumber()
            })
        }
        //console.log(ondersSerialize)
        global.SocketServer.emit('OPEN_POSITIONS', ondersSerialize)
    }, 1000)
}


async function later(delay: number): Promise<void> {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

export { loginAccount, getAllSymbols, startDatabaseCtrader, handleOpenPosition }






