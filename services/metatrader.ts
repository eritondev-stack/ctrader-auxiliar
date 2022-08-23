import { IAlerts, ISymbols } from "model";
import { dbSqlite } from '../database/sqlite'
import socketIOClient, { Socket } from "socket.io-client";
import { ListItem } from "@mui/material";



var socketGlobal: Socket = socketIOClient(process.env.ENDPOINT as string, {
    transports: ["websocket"],
});


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

const handleSymbolsMt5 = () => {
    socketGlobal.on('MT5_SOCKET', (data: { symbol: string; price: number; digits: number }[]) => {
        try {

            data.forEach(fe => {
                const { price, symbol } = fe

                observableAlertV2(symbol, price).then(() => { }).catch((_err) => { console.log(_err) })
                global.SocketServer.emit(symbol, {
                    ...allPairs.filter((el) => el.symbol === symbol)[0],
                    price: price,
                })
            });
        } catch (error) {
        }
    })
}

async function startDatabase() {
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

function triggerAlertV2(currentPrice: number, alert: IAlerts) {

    if (alert.direction === "up") {
        if (currentPrice >= alert.price) {
            Whatsapp.sendMessage('5511960655281@c.us', `${alert.symbol} - ${alert.message}`).then(() => { }).catch((_err) => { })
            dbSqlite("TB_SCHEDULE_ALERTS").update({ active: false }).where({ id: alert.id }).then(() => { }).catch((_err) => { })
            console.log(alert.symbol + ": Alert disprate")
        }
    } else if (alert.direction === "down") {
        if (currentPrice <= alert.price) {
            Whatsapp.sendMessage('5511960655281@c.us', `${alert.symbol} - ${alert.message}`).then(() => { }).catch((_err) => { })
            dbSqlite("TB_SCHEDULE_ALERTS").update({ active: false }).where({ id: alert.id }).then(() => { }).catch((_err) => { })
            console.log(alert.symbol + ": Alert disprate")
        }
    } else {

    }
}

async function observableAlertV2(_symbolProp: string, _priceProp: number) {

    const alerts = await dbSqlite<IAlerts>('TB_SCHEDULE_ALERTS')
        .where({ active: true, symbol: _symbolProp })
        .select("*")

    if (alerts.length > 0) {
        alerts.forEach(element => {
            triggerAlertV2(_priceProp, element)
        });
    }
}

export { startDatabase, handleSymbolsMt5 }
