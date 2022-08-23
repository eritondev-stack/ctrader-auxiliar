import axios from 'axios'

const http = axios.create({
    baseURL: process.env.ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    }  
})

const insertAlert = async (_data: any) => {
    const resp = await http.post("/api/alert",_data)
    return resp
}

export { insertAlert }
