import axios from "axios";


// Coinmarketcap api Instance
export const cmcInstance = axios.create({
    baseURL: process.env.COINMARKETCAP_API_URL,
});


export const cmcProInstance = axios.create({
    baseURL: process.env.COINMARKETCAP_PRO_API_URL,
    headers: { "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_PRO_API_KEY },
});
