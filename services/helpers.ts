import axios from 'axios';
import { ITrendLines } from '../model';

const http = axios.create({
    baseURL: process.env.ENDPOINT,
  });

const getTrendlines = async (): Promise<ITrendLines[]> => {
const data = await http.get("/api/trendlines")
return data.data
}
const setStopLoss = async (data1: any): Promise<ITrendLines[]> => {
const data = await http.post("/api/stoploss", data1)
return data.data
}

const getSymbols = async () => {
const data = await http.get("/api/symbols")
return data.data
}
const getAlerts = async () => {
  const data = await http.get("/api/alerts")
  return data.data
  }

export { getSymbols, getTrendlines, setStopLoss  }