// constans (params, urls, css classes, ...)

import { currencies } from "./utils/currencies";

export const API_URL_SOCKET = "wss://push.coinmarketcap.com/ws";
export const API_URL_GOOGLE = "https://www.googleapis.com/customsearch/v1";

export const socketParamsA = (ids: number[]) => {
    return {
        method: "RSUBSCRIPTION",
        params: ["main-site@crypto_price_15s@{}@normal", ids.join(",")],
    };
};

export const socketParamsB = (ids: number[]) => {
    return {
        method: "RSUBSCRIPTION",
        params: ["main-site@crypto_price_5s@{}@normal", ids.join(",")],
    };
};

export const socketDetailA = (ccurrency: number) => {
    return {
        method: "RSUBSCRIPTION",
        params: ["main-site@crypto_price_15s@{}@detail", String(ccurrency)],
    };
};

export const socketDetailB = (ccurrency: number) => {
    return {
        method: "RSUBSCRIPTION",
        params: ["main-site@crypto_price_15s@{}@detail", String(ccurrency)],
    };
};

export const currencyImageUrl = (anyCurrency: number, size) => {
    return `https://s2.coinmarketcap.com/static/img/coins/${size}x${size}/${anyCurrency}.png`;
};

export const imageSearch = (query: string) => {
    return `${API_URL_GOOGLE}?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_API_CONTEXT_KEY}&q=${query}&searchType=image`;
};

export const aux = [
    "ath",
    "atl",
    "high24h",
    "low24h",
    "num_market_pairs",
    "cmc_rank",
    "date_added",
    "max_supply",
    "circulating_supply",
    "total_supply",
    "volume_7d",
    "volume_30d",
    "self_reported_circulating_supply",
    "self_reported_market_cap",
];

export const defaultCurrency = currencies[0];
export const oneMonth = 2629746000;
export const oneDay = 24 * 60 * 60 * 1000;

export const activeButtonClx =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 border border-blue-700 rounded";
export const buttonClx =
    "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded";

export const blurData =
    "data:image/svg+xml;base64,CiAgICA8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDggNSc+CiAgICAgIDxmaWx0ZXIgaWQ9J2InIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0nc1JHQic+CiAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMScgLz4KICAgICAgPC9maWx0ZXI+CgogICAgICA8aW1hZ2UgcHJlc2VydmVBc3BlY3RSYXRpbz0nbm9uZScgZmlsdGVyPSd1cmwoI2IpJyB4PScwJyB5PScwJyBoZWlnaHQ9JzEwMCUnIHdpZHRoPScxMDAlJyAKICAgICAgaHJlZj0nZGF0YTppbWFnZS9hdmlmO2Jhc2U2NCwvOWovMndCREFBZ0dCZ2NHQlFnSEJ3Y0pDUWdLREJRTkRBc0xEQmtTRXc4VUhSb2ZIaDBhSEJ3Z0pDNG5JQ0lzSXh3Y0tEY3BMREF4TkRRMEh5YzVQVGd5UEM0ek5ETC8yd0JEQVFrSkNRd0xEQmdORFJneUlSd2hNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpML3dBQVJDQUFMQUJBREFTSUFBaEVCQXhFQi84UUFGZ0FCQVFFQUFBQUFBQUFBQUFBQUFBQUFCZ01GLzhRQUpoQUFBUU1EQXdJSEFBQUFBQUFBQUFBQUFnRURCQUFGRVFZU0lTSXhFekl6UVdHQnNmL0VBQlVCQVFFQUFBQUFBQUFBQUFBQUFBQUFBQU1FLzhRQUdoRUFBZ0lEQUFBQUFBQUFBQUFBQUFBQUFRTUFBaEVTVWYvYUFBd0RBUUFDRVFNUkFEOEFscU9VellyVEJnVzlsMHJnWWtTdW42ZTdzTzNudlFwKzRQWjJTNUxiNWtYV1lwakhIdGo1L0tjTk1OUzdoR2VrRDRyamFFb2tTcXVPblAzeldmcWFGRkNJOCtNZHRIY2VkQjVvV2tCdUJLMFVBcnQyZi8vWicgLz4KICAgIDwvc3ZnPgogIA==";
